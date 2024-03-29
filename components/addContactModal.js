import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import { useRouter } from "next/router";
import { useRef, useState } from "react";
import { firebaseDB } from "../firebase.config";

export default function AddContactModal({
  showModal,
  closeModal,
  currentUser,
}) {
  const emailContact = useRef("");
  const firstMessage = useRef("");
  const [emailMessageWarning, setemailMessageWarning] = useState(false);
  const [warningFirstMessage, setFirstMessageWarning] = useState(false);
  const currentCollection = collection(firebaseDB, "chat");
  const router = useRouter();
  const [sendMessageLoading, setSendMessageLoading] = useState(false);

  if (!showModal) return;

  const checkValidationInput = () => {
    // Check email is legit or not!
    const emailRegex =
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

    // Check email validation!
    setemailMessageWarning(false);
    setFirstMessageWarning(false);

    if (!emailRegex.test(emailContact.current.value)) {
      setemailMessageWarning(true);
      return;
    }

    // Check first Message can't be empty!
    if (firstMessage.current.value == "") {
      setFirstMessageWarning(true);
      return;
    }

    return true;
  };

  const sendFirstMessage = async () => {
    // First Check Validation Form!
    const validationOne = checkValidationInput();

    validationOne && (setSendMessageLoading(true));

    // Creaete Document and return the id!
    const createNewDocument = await addDoc(currentCollection, {
      created_date: serverTimestamp(),
      last_message: firstMessage.current.value,
      owner: [emailContact.current.value, currentUser.email],
      type: "private",
    });

    const createNewCollection = await addDoc(
      collection(firebaseDB, `chat/${createNewDocument.id}/messages`),
      {
        alias: currentUser.displayName,
        email: currentUser.email,
        text: firstMessage.current.value,
        timestamp: serverTimestamp(),
      }
    );

    // Close the Modal Add Contact!
    closeModal();

    // Then Redirect it to new Chat
    router.replace(`/chat/${createNewDocument.id}`);
  };

  return (
    <div className="fixed inset-0 backdrop-blur-sm flex justify-center items-center">
      <div className="relative w-full h-full max-w-2xl md:h-auto">
        <div className="relative bg-white rounded-lg shadow dark:bg-gray-700">
          <div className="flex items-start justify-between p-4 border-b rounded-t dark:border-gray-600">
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
              Add Contacts!
            </h3>
            <button
              type="button"
              onClick={() => closeModal()}
              className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-gray-600 dark:hover:text-white"
            >
              <svg
                className="w-5 h-5"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fillRule="evenodd"
                  d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                  clipRule="evenodd"
                ></path>
              </svg>
            </button>
          </div>
          <div className="p-6 space-y-6">
            <form class="space-y-6" action="#">
              <div>
                <label
                  for="email"
                  class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Email contact !
                </label>
                <input
                  type="email"
                  name="email"
                  id="email"
                  class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                  placeholder="email@yours.com"
                  ref={emailContact}
                  required
                />
                <div
                  class="text-red-500 text-sm font-bold"
                  style={{ display: emailMessageWarning ? "block" : "none" }}
                >
                  <p>Email is not valid!</p>
                </div>
              </div>
              <div>
                <label
                  for="email"
                  class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Message
                </label>
                <input
                  type="text"
                  name="message"
                  id="message"
                  class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                  placeholder="Your first message to her/him!"
                  ref={firstMessage}
                  required
                />
                <div
                  class="text-red-500 text-sm font-bold"
                  style={{ display: warningFirstMessage ? "block" : "none" }}
                >
                  <p>First Message Cannot Be Empty!</p>
                </div>
              </div>
            </form>
          </div>
          <div className="flex items-center p-6 space-x-2 border-t border-gray-200 rounded-b dark:border-gray-600">
            <button
              type="button"
              onClick={() => sendFirstMessage()}
              disabled={sendMessageLoading}
              className="text-white bg-green-400 hover:bg-green-800 focus:ring-4 focus:outline-none focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800"
            >
              {sendMessageLoading && (
                <svg
                  aria-hidden="true"
                  role="status"
                  class="inline w-4 h-4 mr-2 text-white animate-spin"
                  viewBox="0 0 100 101"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                    fill="#E5E7EB"
                  />
                  <path
                    d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                    fill="currentColor"
                  />
                </svg>
              )}
              {
                sendMessageLoading ? 'Loading...' : 'Send Messages!'
              }
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

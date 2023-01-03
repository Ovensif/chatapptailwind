import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import { useRouter } from "next/router";
import { useRef, useState } from "react";
import { firebaseDB } from "../firebase.config";

export default function AddContactModal({ showModal, closeModal, currentUser }) {
  const emailContact = useRef("");
  const firstMessage = useRef("");
  const [emailMessageWarning, setemailMessageWarning] = useState(false);
  const [warningFirstMessage, setFirstMessageWarning] = useState(false);
  const currentCollection = collection(firebaseDB, 'chat');
  const router = useRouter();

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
  };

  const sendFirstMessage = async () => {

    // First Check Validation Form!
    checkValidationInput();

    // Creaete Document and return the id!
    const createNewDocument = await addDoc(currentCollection, {
      created_date : serverTimestamp(),
      last_message : firstMessage.current.value,
      owner : [
        emailContact.current.value,
        currentUser.email
      ],
      type : "private"
    });

    const createNewCollection = await addDoc(collection(firebaseDB, `chat/${createNewDocument.id}/messages`), {
      alias: currentUser.displayName,
      email: currentUser.email,
      text: firstMessage.current.value,
      timestamp: serverTimestamp(),
    });

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
              className="text-white bg-green-400 hover:bg-green-800 focus:ring-4 focus:outline-none focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800"
            >
              Send Message
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

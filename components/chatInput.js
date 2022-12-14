import { addDoc, collection, doc, serverTimestamp, updateDoc } from "firebase/firestore";
import { firebaseDB } from "../firebase.config";
import { useRef } from "react";
import { useRouter } from "next/router";

export default function ChatInput(props) {
  // Get paramter id!
  const router = useRouter(); 

  // Set up the Messages
  const messages = useRef(null);

  // Select current collection base on parameter id!
  const database = collection(
    firebaseDB,
    `chat/${router.query?.id}/messages`
  );

  const user = props.user

  const sendMessage = async () => {
    // Get Message from input!
    let message = messages.current.value;
    
    // Set Parent Doc!
    const parentDoc = doc(firebaseDB, 'chat', router?.query.id)

    const createMessage = await addDoc(database, {
      alias: user.displayName,
      email: user.email,
      text: message,
      timestamp: serverTimestamp(),
    });

    messages.current.value = "";

    const updateLastMessage = await updateDoc(parentDoc, {last_message : message})
  };

  const onEnter = async (event) => {
    if (event.key === "Enter") {
      sendMessage();
    }
  };

  return (
    <div className="flex items-center justify-between w-full p-3 border-t border-gray-300">
      <button>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="w-6 h-6 text-gray-500"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
          />
        </svg>
      </button>
      <input
        type="text"
        placeholder="Message"
        className="block w-full py-2 pl-4 mx-3 bg-gray-100 rounded-full outline-none focus:text-gray-700"
        name="message"
        ref={messages}
        required
        onKeyPress={onEnter}
      />
      <button onClick={sendMessage} type="button">
        <svg
          className="w-5 h-5 text-gray-500 origin-center transform rotate-90"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 20 20"
          fill="currentColor"
        >
          <path d="M10.894 2.553a1 1 0 00-1.788 0l-7 14a1 1 0 001.169 1.409l5-1.429A1 1 0 009 15.571V11a1 1 0 112 0v4.571a1 1 0 00.725.962l5 1.428a1 1 0 001.17-1.408l-7-14z" />
        </svg>
      </button>
    </div>
  );
}

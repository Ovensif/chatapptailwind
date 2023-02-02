import Image from "next/image";
import { firebaseDB, auth } from "../firebase.config";
import { collection, limit, orderBy, query, doc } from "firebase/firestore";
import {
  useCollectionData,
  useDocumentData,
} from "react-firebase-hooks/firestore";
import { useAuthState } from "react-firebase-hooks/auth";
import LoadingSpinner from "./loadingSpinner";
import { useRouter } from "next/router";
import { showOppositeEmail } from "../utils/library";
import { signOut } from "firebase/auth";
import { useState, useRef, useEffect } from "react";
import AddContactModal from "./addContactModal";
import { Portal } from "react-portal";


const MessageList = (props) => {
  let messages = props.messages;

  if (props.user?.email == props.messages?.email) {
    return (
      <li className="flex justify-end">
        <div className="relative max-w-xl px-4 py-2 text-gray-700 bg-gray-100 rounded shadow">
          <span className="block">{messages.text}</span>
        </div>
      </li>
    );
  } else {
    return (
      <li className="flex justify-start">
        <div className="relative pr-2">
          <Image
            className="object-cover w-10 h-10 rounded-full"
            src="/assets/img/theater.png"
            alt=""
            width={40}
            height={40}
          />
        </div>
        <div className="relative">
          <div className="bg-yellow-100 text-yellow-800 text-sm font-semibold px-2.5 py-0.5 rounded dark:bg-yellow-200 dark:text-yellow-900">
            <span>{messages.alias}</span>
          </div>
          <div className="mt-1">
            <span className="block">{messages.text}</span>
          </div>
        </div>
      </li>
    );
  }
};

export default function ChatMessage() {
  // Get paramter id!
  const router = useRouter();
  let currentProfile = "";
  const chatWindowRef = useRef(null);

  // Auto Scrool Bottom
  const scrollToBottom = () => {
    chatWindowRef.current.scrollTop = chatWindowRef.current.scrollHeight;
  };

  // Query Message on current Parameter ID
  const queryMessage = query(
    collection(firebaseDB, `chat/${router.query?.id}/messages`),
    orderBy("timestamp"),
    limit(25)
  );

  const [user] = useAuthState(auth);
  const [messages, loading] = useCollectionData(queryMessage);
  const [snapshotCurrentDocument, loadingCurrentDocument] = useDocumentData(
    doc(firebaseDB, "chat", `${router.query?.id}`)
  );
  const [isOpen, setIsOpen] = useState(false);

  // Check if LoadingCurrentDocument is already over or not!
  if (!loadingCurrentDocument) {
    currentProfile =
      snapshotCurrentDocument?.type == "private"
        ? showOppositeEmail({
            currentUser: user,
            owner: snapshotCurrentDocument,
          })
        : snapshotCurrentDocument?.owner;
  }

  useEffect(scrollToBottom);

  return (
    <div>
      {/* Header Profile */}
      <div className="relative flex items-center justify-between border-b border-gray-300">
        <div className="relative flex p-3">
          <Image
            className="object-cover w-10 h-10 rounded-full"
            src="/assets/img/world.png"
            alt=""
            width={40}
            height={40}
          />
          <span className="block ml-2 font-bold text-gray-600">
            {currentProfile}
          </span>
        </div>
        <div className="relative">
          <button
            type="button"
            onClick={() => setIsOpen(true)}
            className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
          >
            Add
          </button>
          <button
            type="button"
            className="focus:outline-none text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900"
            onClick={() => signOut(auth)}
          >
            Exit
          </button>
        </div>
      </div>

      {/* Message List */}
      <div className="overflow-hidden">
        <div
          ref={chatWindowRef}
          className="relative w-full p-6 overflow-y-auto h-[40rem]"
        >
          <ul className="space-y-2">
            {loading ?? <LoadingSpinner />}
            {messages?.map((messages) => (
              <MessageList
                key={Math.random()}
                user={user}
                messages={messages}
              />
            ))}
          </ul>
        </div>
      </div>

      {/* React Portal For Modal */}
      <Portal>
        <AddContactModal
          showModal={isOpen}
          currentUser={user}
          closeModal={() => setIsOpen(false)}
        />
      </Portal>
    </div>
  );
}

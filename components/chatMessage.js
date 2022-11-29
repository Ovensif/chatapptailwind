import Image from "next/image";
import { firebaseDB, auth } from "../firebase.config";
import { collection, limit, orderBy, query, where } from "firebase/firestore";
import { useCollectionData } from "react-firebase-hooks/firestore";
import { useAuthState } from "react-firebase-hooks/auth";
import LoadingSpinner from "./loadingSpinner";
import { useRouter } from "next/router";

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

  // Query Message on current Parameter ID
  const queryMessage = query(
    collection(firebaseDB, `chat/${router.query?.id}/messages`),
    orderBy("timestamp"), limit(25)
  );
  const [user] = useAuthState(auth);
  const [messages, loading] = useCollectionData(queryMessage);

  return (
    <div className="relative w-full p-6 overflow-y-auto h-[40rem]">
      <ul className="space-y-2">
        {loading ?? <LoadingSpinner />}
        {messages?.map((messages) => (
          <MessageList key={Math.random()} user={user} messages={messages} />
        ))}
      </ul>
    </div>
  );
}

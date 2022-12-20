import Image from "next/image";
import { showOppositeEmail } from "../utils/library";
import Link from "next/link";

export default function ChatPersonalRoom(props) {
  let currentUser = showOppositeEmail({
    currentUser: props.data.currentUser,
    owner: props.data.personalChat,
  });
  let lastMessage = props.data.personalChat.last_message;
  let idChat = props.data.idChat;

  return (
    <Link href={`/chat/${idChat}`}>
      <li>
        <div className="flex items-center px-3 py-2 text-sm transition duration-150 ease-in-out border-b border-gray-300 cursor-pointer hover:bg-gray-100 focus:outline-none">
          <Image
            className="object-cover w-10 h-10 rounded-full"
            src="/assets/img/theater.png"
            alt=""
            width={40}
            height={40}
          />
          <div className="w-full pb-2">
            <div className="flex justify-between">
              <span className="block ml-2 font-semibold text-gray-600">
                {currentUser}
              </span>
            </div>
            <span className="block ml-2 text-sm text-gray-600">
              {lastMessage}
            </span>
          </div>
        </div>
      </li>
    </Link>
  );
}

import Image from "next/image";
import Link from "next/link";

export default function ChatPublicRoom(props) {
  let idChat = props.data.idChat;
  let lastMessage = props.data.publicChat.last_message;

  return (
    <Link key={idChat} href={`/chat/${idChat}`}>
      <li>
        <div className="flex items-center px-3 py-2 text-sm transition duration-150 ease-in-out border-b border-gray-300 cursor-pointer hover:bg-gray-100 focus:outline-none">
          <Image
            className="object-cover w-10 h-10 rounded-full"
            src="/assets/img/world.png"
            alt=""
            width={40}
            height={40}
          />
          <div className="w-full pb-2">
            <div className="flex justify-between">
              <span className="block ml-2 font-semibold text-gray-600">
                Public Room
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

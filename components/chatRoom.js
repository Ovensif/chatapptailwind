import ChatMessage from "./chatMessage";
import ChatPublicRoom from "./chatPublicRoom";
import ChatHeader from "./chatHeader";
import ChatInput from "./chatInput";
import ChatHeaderSidebar from "./chatHeaderSidebar";

export default function ChatRoom() {
  return (
    <div className="container mx-auto pt-4">
      <div className="min-w-full border rounded lg:grid lg:grid-cols-3">
        <div className="border-r border-gray-300 lg:col-span-1">

          <ChatHeaderSidebar />

          <ul className="overflow-auto h-[32rem]">
            <h2 className="my-2 mb-2 ml-2 text-lg text-gray-600">Chats</h2>
            <ChatPublicRoom />
          </ul>

        </div>
        <div className="hidden lg:col-span-2 lg:block">
          <div className="w-full">

            <ChatHeader />

            <ChatMessage />

            <ChatInput />

          </div>
        </div>
      </div>
    </div>
  );
}

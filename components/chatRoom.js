import ChatMessage from "./chatMessage";
import ChatPublicRoom from "./chatPublicRoom";
import ChatInput from "./chatInput";
import ChatHeaderSidebar from "./chatHeaderSidebar";
import { collection, where, query } from "firebase/firestore";
import { firebaseDB } from "../firebase.config";
import { useCollection } from "react-firebase-hooks/firestore";
import ChatPersonalRoom from "./chatPersonalRoom";

export default function ChatRoom(props) {
  let user = props.user;
  // Select all collection that related to current email
  const [snapshotPersonalChat] = useCollection(
    query(
      collection(firebaseDB, "chat"),
      where("owner", "array-contains", `${user?.email}`)
    )
  );
  
  const [snapshotPublicChat] = useCollection(
    query(collection(firebaseDB, "chat"), where("type", "==", `public`))
  );

  return (
    <div className="container mx-auto pt-4">
      <div className="min-w-full border rounded lg:grid lg:grid-cols-3">
        <div className="border-r border-gray-300 lg:col-span-1">

          <ul className="overflow-auto h-[32rem]">
            <h2 className="my-2 mb-2 ml-2 text-lg text-gray-600">Chats</h2>
            {
              // Print all Public chat
              snapshotPublicChat?.docs.map((val) => (
                <ChatPublicRoom
                  data={{
                    publicChat: val?.data(),
                    idChat: val.id,
                  }}
                  key={val.id}
                />
              ))
            }

            {
              // Print all available chat in Personal chat!
              snapshotPersonalChat?.docs.map((val) => (
                <ChatPersonalRoom
                  data={{
                    personalChat: val?.data(),
                    currentUser: user,
                    idChat: val.id,
                  }}
                  key={val.id}
                />
              ))
            }
          </ul>
        </div>
        <div className="hidden lg:col-span-2 lg:block">
          <div className="w-full">

            <ChatMessage />

            <ChatInput user={user} />
          </div>
        </div>
      </div>
    </div>
  );
}

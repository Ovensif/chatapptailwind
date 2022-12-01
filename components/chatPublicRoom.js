import { collection, query, where } from "firebase/firestore";
import Image from "next/image";
import { useCollectionData } from "react-firebase-hooks/firestore";
import { firebaseDB } from "../firebase.config";

export default function ChatPublicRoom() {

  const selectCollection = collection(firebaseDB, 'chat');
  const queryLastMessage = query(selectCollection, where('owner', "==", 'public_room'))
  const [values] = useCollectionData(queryLastMessage);

  return (  
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
          <span className="block ml-2 text-sm text-gray-600">{values?.map((values) => values.last_message)}</span>
        </div>
      </div>
    </li>
  );
}

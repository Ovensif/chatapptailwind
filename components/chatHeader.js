import Image from "next/image";

export default function ChatHeader() {
  return (
    <div className="relative flex items-center p-3 border-b border-gray-300">
      <Image
        className="object-cover w-10 h-10 rounded-full"
        src="/assets/img/world.png"
        alt=""
        width={40}
        height={40}
      />
      <span className="block ml-2 font-bold text-gray-600">Public Room</span>
    </div>
  );
}

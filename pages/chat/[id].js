import ChatRoom from "../../components/chatRoom";
import { auth } from "../../firebase.config";
import { useAuthState } from "react-firebase-hooks/auth";
import LoadingSpinner from "../../components/loadingSpinner";
import { useRouter } from "next/router";

export default function Chat() {

  const [user, loading] = useAuthState(auth);
  const router = useRouter()

  if(!user && !loading){
    router.push('/')
  }

  if(loading){
    return <LoadingSpinner />
  }

  return <ChatRoom user={user} />;

}

import ChatRoom from "../../components/chatRoom";
import { auth } from "../../firebase.config";
import { useAuthState } from "react-firebase-hooks/auth";
import LoadingSpinner from "../../components/loadingSpinner";
import { useDocument} from "react-firebase-hooks/firestore";
import { firebaseDB } from "../../firebase.config";
import { doc } from "firebase/firestore";
import { useRouter } from "next/router";

export default function Chat(req, res) {

  const [user, loading] = useAuthState(auth);
  const router = useRouter();
  const [snapshotCurrentDocument, snapshotCurrentDocumentLoading] = useDocument(
    doc(firebaseDB, "chat", `${router.query?.id}`)
  );
  
  // Checking if document exist or not!
  !snapshotCurrentDocument?.exists() && !snapshotCurrentDocumentLoading && (router.push('/chat/NQ2prTGrDb50XoQizOrp'))

  // Check If User Not Authenticated!
  if(!user && !loading){
    router.push('/')
  }

  if(loading){
    return <LoadingSpinner />
  }

  return <ChatRoom user={user} />;

}

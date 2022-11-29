import SigninPage from "../components/signin";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../firebase.config";
import { useRouter } from "next/router";

export default function Home() {
  const [user] = useAuthState(auth);
  const router = useRouter();

  // If Login then redirect it to public room automaticlly
  if (user) {
    router.replace(`/chat/NQ2prTGrDb50XoQizOrp`);
  } 

  return <SigninPage />;
}

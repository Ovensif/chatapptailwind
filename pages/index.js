import Head from "next/head";
import Image from "next/image";
import styles from "../styles/Home.module.css";
import ChatRoom from "../components/chatRoom";
import SigninPage from "../components/signin";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../firebase.config";

export default function Home() {
  const [user, loading, error] = useAuthState(auth);

  if (user) {
    return <ChatRoom />;
  } else {
    return <SigninPage />;
  }
}

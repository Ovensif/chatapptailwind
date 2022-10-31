import { useSignInWithGoogle } from 'react-firebase-hooks/auth';
import { auth } from '../firebase.config';

export default function SignIn(){

  const [ signInWithGoogle ] = useSignInWithGoogle(auth);

  return (
    <div className="flex items-center justify-center h-screen">
      <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full" onClick={() => signInWithGoogle()}>
        Signin Google
      </button>
    </div>
  );
};

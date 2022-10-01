import React, { FC, ReactNode, useEffect, useState } from 'react';

import { useRouter } from 'next/router';

import { firebaseAuth } from '@/config/firebase';
import {
  GoogleAuthProvider,
  onAuthStateChanged,
  signInWithPopup,
} from '@firebase/auth';
import { FirebaseError } from '@firebase/util';

export enum Routes {
  Home = `/`,
}

const provider = new GoogleAuthProvider();

const loginWithGoogle = async (): Promise<void> => {
  try {
    const result = await signInWithPopup(firebaseAuth, provider);
    // This gives you a Google Access Token. You can use it to access the Google API.
    const credential = GoogleAuthProvider.credentialFromResult(result);
    const token = credential?.accessToken;
    // The signed-in user info.
    const user = result.user;

    // ...
    console.log({ token, user });
  } catch (error) {
    // Handle Errors here.
    const errorCode = (error as FirebaseError).code;
    const errorMessage = (error as FirebaseError).message;
    // The email of the user's account used.
    const email = (error as FirebaseError).customData?.email;
    // The AuthCredential type that was used.
    const credential = GoogleAuthProvider.credentialFromError(
      error as FirebaseError
    );

    console.log({
      errorCode,
      errorMessage,
      email,
      credential,
    });
    // ...
  }
};

const AuthWrapper: FC<{ children: ReactNode }> = ({ children }) => {
  const router = useRouter();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    onAuthStateChanged(firebaseAuth, (user) => {
      if (user) {
        // User is signed in, see docs for a list of available properties
        // https://firebase.google.com/docs/reference/js/firebase.User
        const uid = user.uid;

        console.log(`yes: ${uid}`);

        setLoading(false);
      } else {
        console.log('not');

        loginWithGoogle().finally(() => setLoading(false));
      }
    });
  }, []);

  if (router.pathname === Routes.Home) {
    if (loading) return <h1>Loading</h1>;

    return (
      <>
        {children}

        <h1>Autenticado</h1>
      </>
    );
  } else {
    return <>{children}</>;
  }
};

export default AuthWrapper;

import React, { FC, ReactNode, useEffect, useState } from 'react';
import { toast } from 'react-toastify';

import { useRouter } from 'next/router';

import { Box, Button } from '@mui/material';

import Loading from '@/components/loading';
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
    await signInWithPopup(firebaseAuth, provider);
  } catch (error) {
    const { code, message } = error as FirebaseError;

    toast.error(`[${code}]: ${message}`);
  }
};

const AuthWrapper: FC<{ children: ReactNode }> = ({ children }) => {
  const router = useRouter();
  const [authenticated, setAuthenticated] = useState(true);
  const [loading, setLoading] = useState(true);

  const signIn = (): void => {
    loginWithGoogle().finally(() => setLoading(false));
  };

  useEffect(() => {
    onAuthStateChanged(firebaseAuth, (user) => {
      setAuthenticated(!!user);
      setLoading(false);
    });
  }, []);

  if (loading) return <Loading />;

  if (!authenticated)
    return (
      <Box display="flex" justifyContent="center" alignItems="center" flex={1}>
        <Button onClick={signIn}>Logar com o Google</Button>
      </Box>
    );

  if (router.pathname === Routes.Home) {
    return <>{children}</>;
  } else {
    return <>{children}</>;
  }
};

export default AuthWrapper;

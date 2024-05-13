import { FirebaseAuthTypes } from '@react-native-firebase/auth';
import React from 'react';

export interface UserContextProps {
  user: FirebaseAuthTypes.UserCredential['user'];
  setUser: React.Dispatch<React.SetStateAction<undefined>>;
}
const AuthContext = React.createContext({} as UserContextProps);

export default AuthContext;

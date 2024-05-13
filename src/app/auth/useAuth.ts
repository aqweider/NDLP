import { useContext } from 'react';

import AuthContext from '@/src/app/auth/context';

export const useAuth = () => {
  const { user } = useContext(AuthContext);

  return { user };
};

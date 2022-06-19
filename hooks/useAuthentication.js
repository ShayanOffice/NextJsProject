import { useSelector } from 'react-redux';
import { useRouter } from 'next/router';
import { useEffect } from 'react';

export default function useAuthentication() {
  const userSlice = useSelector((state) => state.userReducer);
  const userProfile = userSlice.currentUser;
  const authTokens = userSlice.auth;

  const CheckLoggedIn = () => userProfile.Id && userProfile.Id != '';

  const router = useRouter();
  useEffect(() => {
    !CheckLoggedIn() && router.push('/Login');
  }, [router.basePath]);

  return { CheckLoggedIn, userProfile, authTokens };
}

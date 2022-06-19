import Link from 'next/link';
import { useEffect } from 'react';
import { useRouter } from 'next/router';
import { useSelector } from 'react-redux';

export default function index() {
  const router = useRouter();
  const currentUser = useSelector((state) => state.userReducer.currentUser);
  useEffect(() => {
    if (currentUser.Id !== '') {
      if (currentUser.UserLevelId <= 2) router.push('/BaseInfo');
      else router.push('/Computers');
    } else router.push('/Login');
  }, []);

  return <div>index</div>;
}

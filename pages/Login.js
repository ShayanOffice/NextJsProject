import { useEffect, useRef, useState } from 'react';
import { useRouter } from 'next/router';
import {
  SamaApi,
  useLoginUserMutation,
  useLogoutUserMutation,
} from '../app/samaRTKapi';
import { useSelector, useDispatch } from 'react-redux';
import { login, logout } from '../app/userSlice';
import toast from 'react-hot-toast';
import Validator from '../components/Validator';

export default function Login() {
  const auth = useSelector((state) => state.userReducer.auth);
  const currentUser = useSelector((state) => state.userReducer.currentUser);
  const dispatch = useDispatch();
  const router = useRouter();
  const [submitOnce, setSubmitOnce] = useState(false);
  const [id, setId] = useState('0310773814'); //0005933565  //0019545134
  const [password, setPassword] = useState('0310773814'); //0005933565 //123456
  const [loginUser] = useLoginUserMutation();
  const [getProfile, getProfileResult] = SamaApi.useLazyGetUserProfileQuery();
  var validations = [];

  const [logoutUser] = useLogoutUserMutation();

  const logOut = async () => {
    try {
      await logoutUser({
        token: auth.refreshToken,
      });
      dispatch(logout());
      // router.push('/');
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    validations = [];
    currentUser.id != '' && logOut();
  }, []);

  return (
    <div dir='rtl' className='flex items-center justify-center w-full h-[70vh]'>
      <div className='flex flex-col items-center justify-center w-full min-h-[40rem]'>
        {/* <img src='/images/SamaLogo.svg'/> */}
        <span
          style={{ width: '15rem' }}
          className='z-10 flex flex-col items-center justify-center p-4 mb-4 bg-[#ffffff55] rounded-full shadow-2xl ring-2 ring-slate-800'
        >
          <div
            style={{
              backgroundImage: `url(${'/images/SamaLogo.svg'})`,
              backgroundSize: 'contain',
              backgroundPosition: 'center',
              backgroundRepeat: 'no-repeat',
              width: '100%',
              minWidth: '10rem',
              minHeight: '10rem',
              height: '100%',
            }}
          ></div>
          <span className='mb-4'>سامانه متمرکز آمار</span>
        </span>
        <Validator show={submitOnce} validations={validations}>
          <form
            onSubmit={async (e) => {
              e.preventDefault();
              setSubmitOnce((prev) => !prev && true);
              if (validations.length == 0) {
                try {
                  var res = await loginUser({
                    Id: id,
                    Password: password,
                    TheUser: id,
                    Summary: '',
                    Agent: window.navigator.userAgent,
                  }).unwrap();
                  dispatch(login(res));
                  router.push('/');
                  toast.success(`ورود به سیستم موفقیت آمیز بود.`);
                } catch (err) {
                  console.error(err);
                  toast.error(`نام کاربری یا رمز عبور اشتباه است.`);
                }
              }
            }}
            className='w-2/3 max-w-2xl px-8 pt-6 pb-8 mb-4 bg-white rounded shadow-2xl h-fit '
          >
            <div className='mb-4'>
              <label
                className='block mb-2 text-sm font-bold text-gray-700'
                htmlFor='username'
              >
                نام کاربری
              </label>
              <input
                className='w-full px-3 py-2 leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline'
                id='username'
                type='text'
                placeholder='نام کاربری'
                value={id}
                rules={['required']}
                onChange={(e) => {
                  setId(e.target.value);
                }}
                onDoubleClick={(e) => {
                  setPassword(e.target.value);
                }}
              />
            </div>
            <div className='mb-6'>
              <label
                className='block mb-2 text-sm font-bold text-gray-700'
                htmlFor='password'
              >
                رمز عبور
              </label>
              <input
                className='w-full px-3 py-2 mb-3 leading-tight text-gray-700 border border-red-500 rounded shadow appearance-none focus:outline-none focus:shadow-outline'
                id='password'
                type='password'
                placeholder='******'
                value={password}
                rules={['required']}
                onChange={(e) => {
                  setPassword(e.target.value);
                }}
              />
            </div>
            <div className='flex items-center justify-between'>
              <button
                className='px-4 py-2 font-bold text-white bg-blue-500 rounded hover:bg-blue-700 focus:outline-none focus:shadow-outline'
                type='submit'
              >
                ورود
              </button>
              {/* <a
                className='inline-block text-sm font-bold text-blue-500 align-baseline hover:text-blue-800'
                href='/ChangePassword'
              >
                بازنشانی کلمه عبور
              </a> */}
            </div>
          </form>
        </Validator>
      </div>
    </div>
  );
}

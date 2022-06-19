import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { useSelector } from 'react-redux';
import { useChngUsrPswrdMutation } from '../app/samaRTKapi';
import Validator from '../components/Validator';

export default function ChangePassword() {
  const [validate, setValidate] = useState(false);
  const [XPassword] = useChngUsrPswrdMutation();
  const userProfile = useSelector((state) => state.userReducer.currentUser);

  const [oldPass, setOldPass] = useState('');
  const [newPass, setNewPass] = useState('');
  const [rePass, setRePass] = useState('');

  const router = useRouter();
  var validations = [];

  useEffect(() => {
    validations = [];
  }, []);

  const checkIsValid = () => {
    for (let i = 0; i < validations.length; i++) {
      const validation = validations[i];
      if (validation == false) return false;
    }
    return true;
  };

  return (
    <div style={{ width: '100%' }}>
      <Validator show={validate} validations={validations}>
        <form className='px-8 pt-6 pb-8 mb-4 bg-white rounded shadow-md'>
          <div className='mb-4'>
            <label
              className='block mb-2 text-sm font-bold text-gray-700'
              htmlFor='passOld'
            >
              رمز عبور قبلی
            </label>
            <input
              type='password'
              id='passOld'
              placeholder='رمز عبور قبلی'
              className='max-w-xs border-gray-300 rounded-lg shadow-sm focus:border-indigo-500 focus:ring-indigo-200'
              onChange={(event) => setOldPass(event.target.value)}
            />
          </div>
          <div className='mb-6'>
            <label
              className='block mb-2 text-sm font-bold text-gray-700'
              htmlFor='passNew'
            >
              رمز عبور جدید
            </label>
            <input
              type='password'
              id='passNew'
              placeholder='******************'
              className='max-w-xs border-gray-300 rounded-lg shadow-sm focus:border-indigo-500 focus:ring-indigo-200'
              onChange={(event) => setNewPass(event.target.value)}
            />
            <p className='text-xs italic text-blue-500'>
              رمز عبور مطمئن انتخاب کنید
            </p>
          </div>
          <div className='mb-6'>
            <label
              className='block mb-2 text-sm font-bold text-gray-700'
              htmlFor='passRepeat'
            >
              تکرار رمز عبور جدید
            </label>
            <input
              type='password'
              id='passRepeat'
              placeholder='******************'
              className='max-w-xs border-gray-300 rounded-lg shadow-sm focus:border-indigo-500 focus:ring-indigo-200'
              onChange={(event) => setRePass(event.target.value)}
            />
            <p className='text-xs italic text-orange-300'>
              رمز عبور مطمئن انتخاب کنید
            </p>
          </div>
          <div className='flex flex-row justify-evenly'>
            <button
              className='w-32 px-4 py-2 font-bold text-white bg-blue-500 rounded hover:bg-blue-700 focus:outline-none focus:shadow-outline'
              type='button'
              onClick={async () => {
                if (checkIsValid()) {
                  if (newPass != rePass)
                    toast.error(`رمز و تکرار آن همسان نیست`);
                  else {
                    try {
                      const body = {
                        Id: userProfile.Id,
                        Summary: 'تغییر رمز عبور',
                        Agent: window.navigator.userAgent,
                        Password: newPass,
                        OldPassword: oldPass,
                      };
                      await XPassword(body).unwrap();
                      toast.success(`رمز عبور تغییر یافت`);
                    } catch (err) {
                      toast.error(`اشکال: ${err}`);
                      console.log(err);
                    }
                  }
                } else setValidate(true);
              }}
            >
              تغییر رمز عبور
            </button>
            <button
              onClick={() => router.back()}
              className='px-4 py-2 font-bold text-white bg-gray-300 rounded w-28 hover:bg-blue-700 focus:outline-none focus:shadow-outline'
              type='button'
            >
              بازگشت
            </button>
          </div>
        </form>
      </Validator>
    </div>
  );
}

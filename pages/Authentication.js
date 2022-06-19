import Link from 'next/link';
import { useRouter } from 'next/router';
import { useDispatch, useSelector } from 'react-redux';
import { useLogoutUserMutation } from '../app/samaRTKapi';
import { logout } from '../app/userSlice';

/* icons from https://www.svgrepo.com/vectors/  */

export default function BaseInfo() {
  const dispatch = useDispatch();
  const router = useRouter();
  const userProfile = useSelector((state) => state.userReducer.currentUser);
  const auth = useSelector((state) => state.userReducer.auth);
  const [logoutUser] = useLogoutUserMutation();

  return (
    <div className='flex items-center justify-center w-full h-screen'>
      <div className='grid w-2/4 h-screen grid-cols-2 place-content-center '>
        {userProfile.UserLevelId < 3 && (
          <Link href='/Register'>
            <div /* ثبت کاربر */
              key={1}
              className='flex items-center justify-center p-2 m-4 text-center transition-all border-2 rounded-sm cursor-pointer border-sky-500 hover:bg-blue-400 min-h-[14rem]'
            >
              <a>
                <img
                  className='w-24 h-24 rounded-sx'
                  src='/images/Register.svg'
                  alt=''
                />
                <span className='text-sm font-medium text-gray-900 w-25'>
                  ثبت کاربر
                </span>
              </a>
            </div>
          </Link>
        )}
        {userProfile.Id == '' && (
          <Link href='/Login'>
            <div /* ورود */
              key={2}
              className='flex items-center justify-center p-2 m-4 text-center transition-all border-2 rounded-sm cursor-pointer hover:bg-blue-400 border-sky-500  min-h-[14rem]'
            >
              <a>
                <img
                  className='w-24 h-24 rounded-sx'
                  src='/images/Login.svg'
                  alt=''
                />
                <span className='text-sm font-medium text-gray-900 w-25'>
                  ورود
                </span>
              </a>
            </div>
          </Link>
        )}
        {userProfile.UserLevelId < 4 && (
          <Link href='/ChangePassword'>
            <div /* تغییر رمز عبور */
              key={3}
              className='flex items-center justify-center p-2 m-4 text-center transition-all border-2 rounded-sm cursor-pointer hover:bg-blue-400 border-sky-500  min-h-[14rem]'
            >
              <a>
                <img
                  className='w-24 h-24 rounded-sx'
                  src='/images/ChangePassword.svg'
                  alt=''
                />
                <span className='text-sm font-medium text-gray-900 w-25'>
                  تغییر رمز عبور
                </span>
              </a>
            </div>
          </Link>
        )}
        {userProfile.Id != '' && (
          <button
            onClick={async () => {
              try {
                console.warn(auth);
                await logoutUser({
                  token: auth.refreshToken,
                  // TheUser: userProfile.Id,
                  // Summary: '',
                  // Agent: window.navigator.userAgent,
                });
                dispatch(logout());
                router.push('/');
              } catch (err) {
                console.error(err);
              }
            }}
          >
            <div /* خروج از سامانه */
              className='flex items-center justify-center p-2 m-4 text-center transition-all border-2 rounded-sm cursor-pointer hover:bg-blue-400 border-sky-500  min-h-[14rem]'
            >
              <a>
                <img
                  className='w-24 h-24 rounded-sx'
                  src='/images/Logout.svg'
                  alt=''
                />
                <span className='text-sm font-medium text-gray-900 w-25'>
                  خروج
                </span>
              </a>
            </div>
          </button>
        )}
      </div>
    </div>
  );
}

/*
 SELECT t.TABLE_NAME 
FROM INFORMATION_SCHEMA.TABLES t
WHERE t.TABLE_TYPE = 'BASE TABLE'
and t.TABLE_NAME not like 'Tbl%'

or

SELECT t.name FROM Sys.Tables t
WHERE t.NAME not like 'Tbl%'

or

SELECT s.name
FROM sysobjects s
WHERE s.xtype = 'U'
and s.name not like 'Tbl%'

Below is a list of other object types as well:

AF: Aggregate function (CLR)
C: CHECK constraint
D: Default or DEFAULT constraint
F: FOREIGN KEY constraint
L: Log
FN: Scalar function
FS: Assembly (CLR) scalar-function
FT: Assembly (CLR) table-valued function
IF: In-lined table-function
IT: Internal table
P: Stored procedure
PC: Assembly (CLR) stored-procedure
PK: PRIMARY KEY constraint (type is K)
RF: Replication filter stored procedure
S: System table
SN: Synonym
SQ: Service queue
TA: Assembly (CLR) DML trigger
TF: Table function
TR: SQL DML Trigger
TT: Table type
U: User table
UQ: UNIQUE constraint (type is K)
V: View
X: Extended stored procedure

*/

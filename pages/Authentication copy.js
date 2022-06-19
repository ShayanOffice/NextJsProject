import Link from 'next/link';
import { useRouter } from 'next/router';
import { useDispatch, useSelector } from 'react-redux';
import { useLogoutUserMutation } from '../app/samaRTKapi';
import { logout } from '../app/userSlice';

/* icons from https://www.svgrepo.com/vectors/  */
const BasicInfo = [
  {
    name: 'ثبت کاربر',
    Icon: '/images/Register.svg',
    link: '/Register',
  },
  {
    name: 'ورود',
    Icon: '/images/Login.svg',
    link: '/Login',
  },
  {
    name: 'تغییر رمز عبور',
    Icon: '/images/ChangePassword.svg',
    link: '/ChangePassword',
  },
  // {
  //   name: 'خروج',
  //   Icon: '/images/Logout.svg',
  //   link: '/Logout',
  // },
];
// console.table(BasicInfo);
export default function BaseInfo() {
  const dispatch = useDispatch();
  const router = useRouter();
  const userProfile = useSelector((state) => state.userReducer.currentUser);
  const auth = useSelector((state) => state.userReducer.auth);
  const [logoutUser] = useLogoutUserMutation();

  return (
    // <div className='flex items-center justify-center w-full h-screen'>
    <div className='grid w-full h-screen grid-cols-2 place-content-center'>
      {BasicInfo.map(({ name, Icon, link }, ix) => (
        <div
          key={ix}
          className='flex items-center justify-center p-2 m-4 text-center rounded-md'
        >
          <Link href={link}>
            <a>
              <img className='w-24 h-24 rounded-sx' src={Icon} alt='' />
              <span className='text-sm font-medium text-gray-900 w-25'>
                {name}
              </span>
            </a>
          </Link>
        </div>
      ))}
      <div className='flex items-center justify-center p-2 m-4 text-center rounded-md'>
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
              router.push('/Logout');
            } catch (err) {
              console.error(err);
            }
          }}
        >
          <a>
            <img
              className='w-24 h-24 rounded-sx'
              src='/images/Logout.svg'
              alt=''
            />
            <span className='text-sm font-medium text-gray-900 w-25'>خروج</span>
          </a>
        </button>
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

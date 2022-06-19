import Link from 'next/link';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faCircleInfo,
  faCircleNotch,
  faClipboardList,
  faComputer,
  faKey,
  faMobile,
  faPhone,
  faPrint,
  faTv,
  faUserGroup,
} from '@fortawesome/free-solid-svg-icons';
import { useRouter } from 'next/router';
import { Toaster } from 'react-hot-toast';
import { useSelector } from 'react-redux';
import LoadingIndicator from './LoadingIndicator';
import { useEffect } from 'react';
import useAuthentication from '../hooks/useAuthentication';
export default function Layout({ children }) {
  const userProfile = useSelector((state) => state.userReducer);
  const sysStatus = useSelector((state) => state.systemReducer.status);
  const router = useRouter();
  const SideItemLiStyles = {
    width: '11vh',
    height: '10vh',
    maxWidth: '5.5rem',
    maxHeight: '5rem',
    transition: 'all .08s',
  };
  const SideIconStyles = `transition-all mx-2 h-1/2 sm:h-4/6 `;
  const SideItemLiClassNames = `mb-4 cursor-pointer flex flex-col items-center justify-center w-full h-full hover:opacity-100 py-2 sm:py-3 text-center text-[#606070] hover:text-blue-500`;
  const authInfo = useAuthentication();

  return (
    <div>
      <LoadingIndicator show={sysStatus.isLoading} />
      <Toaster />
      <main className='relative flex'>
        {userProfile.currentUser.Id && userProfile.currentUser.Id != '' && (
          <sidebar className='fixed right-0 w-[4rem] sm:w-[6rem] md:w-[7rem]  h-screen bg-[#e4ecff] z-10 border-l-2 border-blue-500 shadow-2xl flex flex-col items-center justify-between'>
            <div
              style={{
                backgroundImage: `url(/images/SamaLogo.svg)`,
                backgroundSize: 'contain',
                backgroundPosition: 'center',
                backgroundRepeat: 'no-repeat',
                width: '90%',
                height: '100%',
                maxHeight: '5rem',
              }}
              className={`flex mt-4 flex-col items-center justify-center rounded 
            transition-all ease-in-out`}
            />
            <ul className='flex flex-col items-center justify-center w-full h-full px-4 overflow-hidden text-center'>
              <Link href='/Computers'>
                <li
                  title='اطلاعات سخت افزار'
                  style={{
                    ...SideItemLiStyles,
                  }}
                  className={SideItemLiClassNames}
                >
                  <FontAwesomeIcon
                    icon={faComputer}
                    className={
                      SideIconStyles +
                      `${
                        router.asPath === '/Computers' &&
                        ' text-blue-500 opacity-100  h-4/6'
                      }`
                    }
                  />
                  <span
                    className={`font-bold text-xs leading-5 ${
                      router.asPath === '/Computers' &&
                      ' text-blue-500 opacity-100'
                    }`}
                  >
                    سیستم ها
                  </span>
                </li>
              </Link>
              <Link href='/Monitors'>
                <li
                  title='مانیتورهای تحت پوشش'
                  style={{
                    ...SideItemLiStyles,
                  }}
                  className={SideItemLiClassNames}
                >
                  <FontAwesomeIcon
                    icon={faTv}
                    className={
                      SideIconStyles +
                      `${
                        router.asPath === '/Monitors' &&
                        ' text-blue-500 opacity-100  h-4/6'
                      }`
                    }
                  />
                  <span
                    className={`font-bold text-xs leading-8 ${
                      router.asPath === '/Monitors' &&
                      ' text-blue-500 opacity-100'
                    }`}
                  >
                    مانیتورها
                  </span>
                </li>
              </Link>
              <Link href='/Printers'>
                <li
                  title='چاپگرهای تحت پوشش'
                  style={{
                    ...SideItemLiStyles,
                  }}
                  className={SideItemLiClassNames}
                >
                  <FontAwesomeIcon
                    icon={faPrint}
                    className={
                      SideIconStyles +
                      `${
                        router.asPath === '/Printers' &&
                        ' text-blue-500 opacity-100  h-4/6'
                      }`
                    }
                  />
                  <span
                    className={`font-bold text-xs leading-8 ${
                      router.asPath === '/Printers' &&
                      ' text-blue-500 opacity-100'
                    }`}
                  >
                    چاپگرها
                  </span>
                </li>
              </Link>
              <Link href='/Scanners'>
                <li
                  title='اسکنرهای تحت پوشش'
                  style={{
                    ...SideItemLiStyles,
                  }}
                  className={SideItemLiClassNames}
                >
                  <FontAwesomeIcon
                    icon={faMobile}
                    className={
                      SideIconStyles +
                      `${
                        router.asPath === '/Scanners' &&
                        ' text-blue-500 opacity-100  h-4/6'
                      }`
                    }
                  />
                  <span
                    className={`font-bold text-xs leading-8 ${
                      router.asPath === '/Scanners' &&
                      ' text-blue-500 opacity-100'
                    }`}
                  >
                    اسکنر ها
                  </span>
                </li>
              </Link>
              <Link href='/Telephones'>
                <li
                  title='تلفن های تحت پوشش'
                  style={{
                    ...SideItemLiStyles,
                  }}
                  className={SideItemLiClassNames}
                >
                  <FontAwesomeIcon
                    icon={faPhone}
                    className={
                      SideIconStyles +
                      `${
                        router.asPath === '/Telephones' &&
                        ' text-blue-500 opacity-100  h-4/6'
                      }`
                    }
                  />
                  <span
                    className={`font-bold text-xs leading-8 ${
                      router.asPath === '/Telephones' &&
                      ' text-blue-500 opacity-100'
                    }`}
                  >
                    تلفن ها
                  </span>
                </li>
              </Link>
            </ul>
            <Link href='/Users'>
              <li
                title='کاربران'
                style={{
                  ...SideItemLiStyles,
                }}
                className={SideItemLiClassNames}
              >
                <FontAwesomeIcon
                  icon={faUserGroup}
                  className={
                    SideIconStyles +
                    `${
                      router.asPath === '/Users' &&
                      ' text-blue-500 opacity-100 h-4/6'
                    }`
                  }
                />
                <span
                  className={`font-bold text-xs leading-8 ${
                    router.asPath === '/Users' && ' text-blue-500 opacity-100'
                  }`}
                >
                  کاربران
                </span>
              </li>
            </Link>
          </sidebar>
        )}
        <div
          style={{ height: 'calc(100% - 3.5rem)' }}
          className='relative flex flex-col w-[calc(100%-4rem)] sm:w-[calc(100%-6rem)] md:w-[calc(100%-7rem)] items-center justify-center h-full opacity-100'
        >
          {userProfile.currentUser.Id && userProfile.currentUser.Id != '' && (
            <nav
              dir='rtl'
              className='sticky z-10 top-0 right-0 h-[3.5rem] w-full bg-[#f2f7f9] shadow-lg flex justify-between items-center text-center px-4 '
            >
              <right
                dir='rtl'
                className='flex items-center justify-start w-full overflow-hidden'
              >
                <Link href='/LogReport'>
                  <li
                    title='گزارش ها'
                    className={
                      'flex justify-start items-center opacity-80 hover:scale-105 hover:opacity-100 cursor-pointer '
                    }
                  >
                    <span
                      className={`font-bold text-xs leading-8 flex items-center ${
                        router.asPath === '/LogReport' &&
                        ' text-blue-500 opacity-100'
                      }`}
                    >
                      <FontAwesomeIcon
                        icon={faClipboardList}
                        className='h-5 mx-2 cursor-pointer opacity-80 '
                      />
                      <span className='hidden md:inline-block'>تاریخچه</span>
                    </span>
                  </li>
                </Link>
                {userProfile.currentUser.UserLevelId <= 2 && (
                  <Link href='/BaseInfo'>
                    <li
                      title='ثبت وتغییرات اطلاعات پایه'
                      className={
                        'flex justify-start items-center opacity-80 hover:scale-105 hover:opacity-100 cursor-pointer '
                      }
                    >
                      <span
                        className={`font-bold text-xs leading-8 flex items-center w-full ${
                          router.asPath === '/BaseInfo' &&
                          ' text-blue-500 opacity-100'
                        }`}
                      >
                        <FontAwesomeIcon
                          icon={faCircleInfo}
                          className='h-5 mx-2 cursor-pointer opacity-80 '
                        />
                        <span className='hidden md:inline-block '>
                          اطلاعات پایه
                        </span>
                      </span>
                    </li>
                  </Link>
                )}
              </right>
              {/* <span className='w-full text-base sm:text-lg md:text-2xl text-slate-800'>
                {sysStatus.title}
              </span> */}
              <left className='flex items-baseline justify-end w-full'>
                <Link href='/Authentication'>
                  <span className='cursor-pointer'>
                    <span className='hidden md:inline-block'>
                      {userProfile.auth.accessToken &&
                      userProfile.auth.accessToken != ''
                        ? `${userProfile.currentUser.Name} . ${userProfile.currentUser.Family}`
                        : 'جهت کار با سیستم وارد شوید'}
                    </span>
                    <FontAwesomeIcon icon={faKey} className='h-5 mx-4' />
                  </span>
                </Link>
              </left>
            </nav>
          )}

          <content className='w-full px-2'>{children}</content>
        </div>
      </main>
    </div>
  );
}

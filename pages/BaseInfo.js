import Link from 'next/link';
import { useSelector } from 'react-redux';

/* icons from https://www.svgrepo.com/vectors/  */

const BasicInfo = [
  { name: 'پردازنده', Icon: '/images/Cpu.svg', BaseLink: '/LovCpu' },
  {
    name: 'واحد  ها',
    Icon: '/images/Departments.svg',
    BaseLink: '/LovDepartments',
  },
  { name: 'هارد دیسک ها', Icon: '/images/Hdd.svg', BaseLink: '/LovStorage' },
  { name: 'لپ تاپ ها', Icon: '/images/Laptop.svg', BaseLink: '/LovLaptop' },
  { name: 'مانیتور ها', Icon: '/images/Monitor.svg', BaseLink: '/LovMonitors' },
  {
    name: 'مادر برد ها',
    Icon: '/images/Motherboard.svg',
    BaseLink: '/LovMotherboard',
  },
  {
    name: 'ارتباط های شبکه ای',
    Icon: '/images/Domain.svg',
    BaseLink: '/LovConnections',
  },
  { name: 'سیستم عامل ها', Icon: '/images/Os.svg', BaseLink: '/LovOs' },
  { name: ' سامانه ها', Icon: '/images/Systems.svg', BaseLink: '/LovApps' },
  {
    name: ' نرم افزار ها',
    Icon: '/images/Softwares.svg',
    BaseLink: '/LovSoftwares',
  },
  { name: 'استان ها', Icon: '/images/Provinces.svg', BaseLink: '/LovProvince' },
  {
    name: 'منبع تغذیه ها',
    Icon: '/images/PowerSupply.svg',
    BaseLink: '/LovPowerSupply',
  },
  { name: 'چاپگر ها', Icon: '/images/Printer.svg', BaseLink: '/LovPrinter' },
  { name: 'حافظه ها', Icon: '/images/Ram.svg', BaseLink: '/LovMemories' },
  { name: 'اسکنر ها', Icon: '/images/Scanner.svg', BaseLink: '/LovScanner' },
  { name: 'تلفن ها', Icon: '/images/Telphone.svg', BaseLink: '/LovTelephones' },
  // { name: 'مدیریت کاربران', Icon: '/images/Users.svg', BaseLink: '/Users' },
  {
    name: 'سطوح کاربری',
    Icon: '/images/AccessLevel.svg',
    BaseLink: '/LovUserLevel',
  },
];
// console.table(BasicInfo);
export default function BaseInfo() {
  const userProfile = useSelector((state) => state.userReducer.currentUser);
  return (
    <div
      style={{ height: '100%' }}
      className='grid w-3/4 grid-cols-2 mx-auto my-auto text-center sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 place-content-center'
    >
      {BasicInfo.map(
        ({ name, Icon, BaseLink }, ix) =>
          (userProfile.UserLevelId == 1 ||
            (userProfile.UserLevelId != 1 && BaseLink != '/LovUserLevel')) && (
            <Link href={BaseLink}>
              <div
                key={ix}
                className='transition-all flex flex-col items-center justify-center p-2 m-4 text-center rounded-sm bg-[#aaeeff11] hover:bg-blue-400 border-2 border-sky-500 cursor-pointer'
              >
                <img
                  className='object-contain object-center w-24 h-32 text-center rounded-sx'
                  src={Icon}
                  alt=''
                />
                <span className='text-sm font-medium text-center text-gray-900'>
                  {name}
                </span>
              </div>
            </Link>
          )
      )}
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

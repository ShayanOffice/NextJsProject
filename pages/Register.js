import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import {
  useGetLOVDepartmentsQuery,
  useGetLOVUserLevelsQuery,
  useGetProvincesQuery,
  useGetUsersQuery,
} from '../app/samaRTKapi';
import PrepareForm from '../components/PrepareForm';

export default function Register() {
  const router = useRouter();
  const [list, setList] = useState({
    Id: -1,
    Password: '',
    UserLevelId: -1,
    ProvinceId: -1, // this is a helping filter to limit the user list based on province
    DepartmentId: -1, // this is a helping filter to limit the user list based on department
  });
  const { data: AllUsers } = useGetUsersQuery();
  const [userList, setUserList] = useState(AllUsers);

  useEffect(() => {
    setUserList(
      AllUsers?.filter(
        (usr) =>
          usr.Provinces.Id === list.ProvinceId &&
          usr.LOVDepartments?.Id === list.DepartmentId
      )
    );
  }, [list.ProvinceId, list.DepartmentId]);

  // const [dataItems, setDataItems] = useState([
  //   { Id: '',
  //     Name: 'اشکال ارتباطی',
  //     Family: 'اشکال ارتباطی',
  //     PhoneNumber: '',
  //     Provinces: { Id: 0, Province: '', },
  //     LOVDepartments: {  Id: 0,  Department: '',  },
  //     LOVUserLevels: {  Id: 0,  Title: '', },
  //   },

  const { data: PrvList } = useGetProvincesQuery();
  const { data: DeptList } = useGetLOVDepartmentsQuery();
  const { data: ULvlList } = useGetLOVUserLevelsQuery();

  const colDefs = [
    // {
    //   headerName: 'لغو مجوز کاربری',
    //   field: 'dismiss',
    // },
    {
      headerName: 'استان',
      field: 'Province',
      type: 'select',
      choises: PrvList,
      optionValue: 'Id',
      optionTitle: ['Province'],
      optionSource: 'ProvinceId',
    },
    {
      headerName: 'واحد سازمانی',
      field: 'Department',
      type: 'select',
      choises: DeptList,
      optionValue: 'Id',
      optionTitle: ['Department'],
      optionSource: 'DepartmentId',
    },
    {
      headerName: 'کاربر',
      field: 'Id',
      type: 'select',
      choises: userList,
      optionValue: 'Id',
      optionTitle: ['Name', 'Family', ',Id:'],
      optionSource: 'Id',
    },
    {
      headerName: 'سطح کاربری',
      field: 'UserLevelId',
      type: 'select',
      choises: ULvlList,
      optionValue: 'Id',
      optionTitle: ['Title'],
      optionSource: 'UserLevelId',
    },
    {
      headerName: 'رمز عبور',
      field: 'password',
      type: 'text',
      isPassword: true,
    },
    {
      headerName: 'تکرار رمز عبور',
      field: 'rePassword',
      type: 'text',
      isPassword: true,
    },
  ];

  return (
    <div className='flex flex-col items-center justify-center w-full h-screen'>
      <PrepareForm
        colDef={colDefs}
        selectedRow={list}
        setSelectedRow={setList}
        actionName='ثبت سطح دسترسی'
        setShowDialog={true}
      />
    </div>
  );
}

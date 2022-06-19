import React from 'react';
import { LovForm } from '../components/PopupFormSearch';
import {
  useAddDepartmentMutation,
  useEdtDepartmentMutation,
  useGetLOVDepartmentsQuery,
  useRmvDepartmentMutation,
} from '../app/samaRTKapi';
import { useSelector } from 'react-redux';

export default function LOVDepartments() {
  const { data: List } = useGetLOVDepartmentsQuery();
  const [insert] = useAddDepartmentMutation();
  const [edit] = useEdtDepartmentMutation();
  const [remove] = useRmvDepartmentMutation();
  const userProfile = useSelector((state) => state.userReducer.currentUser);

  const colDefs = [
    { 
      headerName: 'واحد سرویس گیرنده',
       field: 'Department', type: 'text' 
    },
    userProfile.UserLevelId != 3 && {
      headerName: 'حذف',
      className: 'w-16',
      field: 'hazf',
    },
    userProfile.UserLevelId != 3 && {
      headerName: 'ویرایش',
      className: 'w-16',
      field: 'edit',
    },
  ];

  const handleUsersRowData = (qry) =>
    !qry ? [] : qry.map((row, ix) => ({ ...row, ix: ix }));

  const formTitle = 'واحد های سرویس گیرنده';
  const addDialogTitle = 'افزودن واحد سازمانی جدید';
  const addActionName = 'افزودن';
  const edtDialogTitle = 'ویرایش واحد سازمانی';
  const edtActionName = 'ذخیره';
  const rmvDialogTitle = `Departmentحذف واحد سازمانی`;
  const rmvActionName = 'حذف';

  return (
    <LovForm
          formTitle={formTitle}
      addActionName={addActionName}
      addDialogTitle={userProfile.UserLevelId != 3 && addDialogTitle}
      insert={insert}
      edtActionName={edtActionName}
      edtDialogTitle={edtDialogTitle}
      edit={edit}
      rmvActionName={rmvActionName}
      rmvDialogTitle={rmvDialogTitle}
      remove={remove}
      List={handleUsersRowData(List)}
      colDefs={colDefs}
      search={['Department']}
    />
  );
}

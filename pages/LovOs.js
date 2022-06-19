import React from 'react';
import { LovForm } from '../components/PopupFormSearch';
import {
  useAddOSMutation,
  useEdtOSMutation,
  useGetLOVOSesQuery,
  useRmvOSMutation,
} from '../app/samaRTKapi';
import { useSelector } from 'react-redux';

export default function LovMotherboard() {
  const { data: List } = useGetLOVOSesQuery();
  const [insert] = useAddOSMutation();
  const [edit] = useEdtOSMutation();
  const [remove] = useRmvOSMutation();
  const userProfile = useSelector((state) => state.userReducer.currentUser);

  const colDefs = [
    { headerName: 'سیستم عامل', field: 'Specs', type: 'text' },
    userProfile.UserLevelId != 3 && {
      headerName: 'حذف',
      className: 'w-16',
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

  const formTitle = 'سیستم عامل های منصوبه';
  const addDialogTitle = 'افزودن سیستم عامل جدید';
  const addActionName = 'افزودن';
  const edtDialogTitle = 'ویرایش سیستم عامل';
  const edtActionName = 'ذخیره';
  const rmvDialogTitle = `Specsحذف سیستم عامل`;
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
      search={['Specs']}
    />
  );
}

import React from 'react';
import { LovForm } from '../components/PopupFormSearch';
import {
  useAddAppMutation,
  useEdtAppMutation,
  useGetLOVAppsQuery,
  useRmvAppMutation,
} from '../app/samaRTKapi';
import { useSelector } from 'react-redux';

export default function LovMotherboard() {
  const { data: List } = useGetLOVAppsQuery();
  const [insert] = useAddAppMutation();
  const [edit] = useEdtAppMutation();
  const [remove] = useRmvAppMutation();
  const userProfile = useSelector((state) => state.userReducer.currentUser);

  const colDefs = [
    { headerName: 'عنوان سامانه', field: 'Name', type: 'text' },
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

  const formTitle = 'سامانه های در جریان استفاده';
  const addDialogTitle = 'افزودن سامانه جدید';
  const addActionName = 'افزودن';
  const edtDialogTitle = 'ویرایش سامانه';
  const edtActionName = 'ذخیره';
  const rmvDialogTitle = `Nameحذف سامانه`;
  const rmvActionName = 'حذف';

  return (
    <LovForm
      addActionName={addActionName}
      addDialogTitle={userProfile.UserLevelId != 3 && addDialogTitle}
      insert={insert}
      edtActionName={edtActionName}
      edtDialogTitle={edtDialogTitle}
      edit={edit}
      formTitle={formTitle}
      rmvActionName={rmvActionName}
      rmvDialogTitle={rmvDialogTitle}
      remove={remove}
      List={handleUsersRowData(List)}
      colDefs={colDefs}
      search={['Name']}
    />
  );
}

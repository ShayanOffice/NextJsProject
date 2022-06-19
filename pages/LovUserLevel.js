import React from 'react';
import { LovForm } from '../components/PopupForm';
import {
  useAddUserLevelMutation,
  useEdtUserLevelMutation,
  useGetLOVUserLevelsQuery,
  useGetUserProfileQuery,
  useRmvUserLevelMutation,
} from '../app/samaRTKapi';
import { useSelector } from 'react-redux';

export default function LovUserLevel() {
  const { data: List } = useGetLOVUserLevelsQuery();
  const [insert] = useAddUserLevelMutation();
  const [edit] = useEdtUserLevelMutation();
  const [remove] = useRmvUserLevelMutation();
  const userProfile = useSelector((state) => state.userReducer.currentUser);
  const colDefs = [
    { headerName: 'سطح کاربری', field: 'Title', type: 'text' },
    { headerName: 'حذف', className: 'w-16', className: 'w-16', field: 'hazf' },
    { headerName: 'ویرایش', className: 'w-16', field: 'edit' },
  ];

  const handleUsersRowData = (qry) =>
    !qry ? [] : qry.map((row, ix) => ({ ...row, ix: ix }));

  const formTitle = ' معرفی سطوح کاربری';
  const addDialogTitle = 'افزودن سطح کاربری جدید';
  const addActionName = 'افزودن';
  const edtDialogTitle = 'ویرایش سطح کاربری';
  const edtActionName = 'ذخیره';
  const rmvDialogTitle = `Titleحذف سطح کاربری`;
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
    />
  );
}

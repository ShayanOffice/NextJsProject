import React from 'react';
import { LovForm } from '../components/PopupFormSearch';
import {
  useAddConnectionMutation,
  useEdtConnectionMutation,
  useGetLOVConnectionsQuery,
  useRmvConnectionMutation,
} from '../app/samaRTKapi';
import { useSelector } from 'react-redux';

export default function LovMotherboard() {
  const { data: List } = useGetLOVConnectionsQuery();
  const [insert] = useAddConnectionMutation();
  const [edit] = useEdtConnectionMutation();
  const [remove] = useRmvConnectionMutation();
  const userProfile = useSelector((state) => state.userReducer.currentUser);

  const colDefs = [
    { headerName: 'نوع شبکه', field: 'Type', type: 'text' },
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

  const formTitle = 'انواع شبکه های در خدمت';
  const addDialogTitle = 'افزودن شبکه جدید';
  const addActionName = 'ذخیره';
  const edtDialogTitle = 'ویرایش شبکه';
  const edtActionName = 'ذخیره';
  const rmvDialogTitle = `Typeحذف شبکه`;
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
      search={['Type']}
    />
  );
}

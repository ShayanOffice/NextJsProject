import React from 'react';
import { LovForm } from '../components/PopupFormSearch';
import {
  useAddMemoryMutation,
  useEdtMemoryMutation,
  useGetLOVMemoriesQuery,
  useRmvMemoryMutation,
} from '../app/samaRTKapi';
import PopupForm from '../components/PopupForm';
import { useSelector } from 'react-redux';

export default function LovMemories() {
  const { data: List } = useGetLOVMemoriesQuery();
  const [insert] = useAddMemoryMutation();
  const [edit] = useEdtMemoryMutation();
  const [remove] = useRmvMemoryMutation();
  const userProfile = useSelector((state) => state.userReducer.currentUser);

  const colDefs = [
    {
      headerName: 'ظرفیت',
      field: 'Capacity',
      type: 'text',
      className: 'font-sans cursor-default',
    },
    { headerName: 'نوع', field: 'Type', type: 'text', className: 'font-sans' },
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

  const formTitle = ' انواع حافظه های در جریان استفاده';
  const addDialogTitle = 'افزودن حافظه جدید';
  const addActionName = 'افزودن';
  const edtDialogTitle = 'ویرایش حافظه';
  const edtActionName = 'ذخیره';
  const rmvDialogTitle = `Typeحذف حافظه`;
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
      search={['Capacity', 'Type']}
    />
  );
}

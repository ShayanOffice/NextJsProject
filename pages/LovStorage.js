import React from 'react';
import { LovForm } from '../components/PopupFormSearch';
import {
  useAddStorageMutation,
  useEdtStorageMutation,
  useGetLOVStoragesQuery,
  useRmvStorageMutation,
} from '../app/samaRTKapi';
import { useSelector } from 'react-redux';

export default function LovStorage() {
  const { data: List } = useGetLOVStoragesQuery();
  const [insert] = useAddStorageMutation();
  const [edit] = useEdtStorageMutation();
  const [remove] = useRmvStorageMutation();
  const userProfile = useSelector((state) => state.userReducer.currentUser);

  const colDefs = [
    { headerName: 'نوع', field: 'Type', type: 'text' },
    { headerName: 'مشخصات', field: 'Specs', type: 'text' },
    { headerName: 'حذف', className: 'w-16', className: 'w-16', field: 'hazf' },
    { headerName: 'ویرایش', className: 'w-16', field: 'edit' },
  ];

  const handleUsersRowData = (qry) =>
    !qry ? [] : qry.map((row, ix) => ({ ...row, ix: ix }));

  const formTitle = 'انواع هارد دیسک های منصوبه';
  const addDialogTitle = 'افزودن هارد دیسک';
  const addActionName = 'افزودن';
  const edtDialogTitle = 'ویرایش هارد دیسک';
  const edtActionName = 'ذخیره';
  const rmvDialogTitle = `Typeحذف هارد دیسک`;
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
      search={['Type', 'Specs']}
    />
  );
}

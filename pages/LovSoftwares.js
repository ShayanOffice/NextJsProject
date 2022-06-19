import React from 'react';
import { LovForm } from '../components/PopupFormSearch';
import {
  useAddSoftwareMutation,
  useEdtSoftwareMutation,
  useGetLOVSoftwaresQuery,
  useRmvSoftwareMutation,
} from '../app/samaRTKapi';
import { useSelector } from 'react-redux';

export default function LovMotherboard() {
  const { data: List } = useGetLOVSoftwaresQuery();
  const [insert] = useAddSoftwareMutation();
  const [edit] = useEdtSoftwareMutation();
  const [remove] = useRmvSoftwareMutation();
  const userProfile = useSelector((state) => state.userReducer.currentUser);

  const colDefs = [
    { headerName: 'نرم افزار', field: 'Specs', type: 'text' },
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

  const formTitle = 'نرم افزارهای قابل نصب';
  const addDialogTitle = 'افزودن نرم افزار جدید';
  const addActionName = 'افزودن';
  const edtDialogTitle = 'ویرایش نرم افزار';
  const edtActionName = 'ذخیره';
  const rmvDialogTitle = `Specsحذف نرم افزار`;
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

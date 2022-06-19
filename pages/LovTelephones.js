import React from 'react';
import { LovForm } from '../components/PopupFormSearch';
import {
  useAddLOVTelephoneMutation,
  useEdtLOVTelephoneMutation,
  useGetLOVTelephonesQuery,
  useRmvLOVTelephoneMutation,
} from '../app/samaRTKapi';
import { useSelector } from 'react-redux';

export default function LovTelephones() {
  const { data: List } = useGetLOVTelephonesQuery();
  const [insert] = useAddLOVTelephoneMutation();
  const [edit] = useEdtLOVTelephoneMutation();
  const [remove] = useRmvLOVTelephoneMutation();
  const userProfile = useSelector((state) => state.userReducer.currentUser);

  const colDefs = [
    { headerName: 'مدل', field: 'Model', type: 'text' },
    { headerName: 'خصیصه ها', field: 'Specs', type: 'text' },
    { headerName: 'حذف', className: 'w-16', className: 'w-16', field: 'hazf' },
    { headerName: 'ویرایش', className: 'w-16', field: 'edit' },
  ];
  const handleUsersRowData = (qry) =>
    !qry ? [] : qry.map((row, ix) => ({ ...row, ix: ix }));

  const formTitle = 'انواع تلفن های در جریان استفاده';
  const addDialogTitle = 'افزودن تلفن جدید';
  const addActionName = 'افزودن';
  const edtDialogTitle = 'ویرایش تلفن';
  const edtActionName = 'ذخیره';
  const rmvDialogTitle = `Modelحذف تلفن`;
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

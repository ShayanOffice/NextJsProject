import React from 'react';
import { LovForm } from '../components/PopupFormSearch';
import {
  useAddLOVPrinterMutation,
  useEdtLOVPrinterMutation,
  useGetLOVPrintersQuery,
  useRmvLOVPrinterMutation,
} from '../app/samaRTKapi';
import { useSelector } from 'react-redux';

export default function LovPrinter() {
  const { data: List } = useGetLOVPrintersQuery();
  const [insert] = useAddLOVPrinterMutation();
  const [edit] = useEdtLOVPrinterMutation();
  const [remove] = useRmvLOVPrinterMutation();
  const userProfile = useSelector((state) => state.userReducer.currentUser);

  const colDefs = [
    { headerName: 'نام', field: 'Name', type: 'text' },
    { headerName: 'مدل', field: 'Model', type: 'text' },
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

  const formTitle = ' انواع چاپگرهای در جریان استفاده';
  const addDialogTitle = 'افزودن چاپگر جدید';
  const addActionName = 'افزودن';
  const edtDialogTitle = 'ویرایش چاپگر';
  const edtActionName = 'ذخیره';
  const rmvDialogTitle = `Modelحذف چاپگر`;
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
      search={['Model', 'Name']}
    />
  );
}

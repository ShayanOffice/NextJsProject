import React from 'react';
import { LovForm } from '../components/PopupFormSearch';
import {
  useAddLOVScannerMutation,
  useEdtLOVScannerMutation,
  useGetLOVScannersQuery,
  useRmvLOVScannerMutation,
} from '../app/samaRTKapi';
import { useSelector } from 'react-redux';

export default function LovScanner() {
  const { data: List } = useGetLOVScannersQuery();
  const [insert] = useAddLOVScannerMutation();
  const [edit] = useEdtLOVScannerMutation();
  const [remove] = useRmvLOVScannerMutation();
  const userProfile = useSelector((state) => state.userReducer.currentUser);

  const colDefs = [
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

  const formTitle = 'انواع اسکنرهای در جریان استفاده';
  const addDialogTitle = 'افزودن اسکنر جدید';
  const addActionName = 'افزودن';
  const edtDialogTitle = 'ویرایش اسکنر';
  const edtActionName = 'ذخیره';
  const rmvDialogTitle = `Modelحذف اسکنر`;
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
      search={['Model']}
    />
  );
}

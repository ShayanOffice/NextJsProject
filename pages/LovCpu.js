import React from 'react';
import { LovForm } from '../components/PopupFormSearch';
import {
  useAddCPUMutation,
  useEdtCPUMutation,
  useGetLOVCPUsQuery,
  useRmvCPUMutation,
} from '../app/samaRTKapi';
import { useSelector } from 'react-redux';

export default function LovCpu() {
  const { data: List } = useGetLOVCPUsQuery();
  const [insert] = useAddCPUMutation();
  const [edit] = useEdtCPUMutation();
  const [remove] = useRmvCPUMutation();
  const userProfile = useSelector((state) => state.userReducer.currentUser);

  const colDefs = [
    { headerName: 'مدل', field: 'Model', type: 'text' },
    { headerName: 'سرعت', field: 'Clock', type: 'text' },
    { headerName: 'ظرفیت کش', field: 'Cache', type: 'text' },
    { headerName: 'خصیصه ها', field: 'Specs', type: 'text' },
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

  const formTitle = 'انواع پردازنده';
  const addDialogTitle = 'افزودن پردازنده جدید';
  const addActionName = 'افزودن';
  const edtDialogTitle = 'ویرایش پردازنده';
  const edtActionName = 'ذخیره';
  const rmvDialogTitle = `Modelحذف پردازنده`;
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
      search={['Model', 'Clock', 'Cache', 'Specs']}
    />
  );
}

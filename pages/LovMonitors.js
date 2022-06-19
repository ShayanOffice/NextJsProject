import React from 'react';
import { LovForm } from '../components/PopupFormSearch';
import {
  useAddLOVMonitorMutation,
  useEdtLOVMonitorMutation,
  useGetLOVMonitorsQuery,
  useRmvLOVMonitorMutation,
} from '../app/samaRTKapi';
import { useSelector } from 'react-redux';

export default function LovMonitors() {
  const { data: List } = useGetLOVMonitorsQuery();
  const [insert] = useAddLOVMonitorMutation();
  const [edit] = useEdtLOVMonitorMutation();
  const [remove] = useRmvLOVMonitorMutation();
  const userProfile = useSelector((state) => state.userReducer.currentUser);

  const colDefs = [
    { headerName: 'مدل', field: 'Model', type: 'text' },
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

  const formTitle = 'انواع مدل مانیتورها';
  const addDialogTitle = 'افزودن مدل مانیتور جدید';
  const addActionName = 'افزودن';
  const edtDialogTitle = 'ویرایش مدل مانیتور';
  const edtActionName = 'ذخیره';
  const rmvDialogTitle = `Modelحذف مدل مانیتور`;
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
      search={['Model', 'Specs']}
    />
  );
}

import React from 'react';
import { LovForm } from '../components/PopupFormSearch';
import {
  useAddPowerMutation,
  useEdtPowerMutation,
  useGetLOVPowersQuery,
  useRmvPowerMutation,
} from '../app/samaRTKapi';
import { useSelector } from 'react-redux';

export default function LovPowerSupply() {
  const { data: List } = useGetLOVPowersQuery();
  const [insert] = useAddPowerMutation();
  const [edit] = useEdtPowerMutation();
  const [remove] = useRmvPowerMutation();
  const userProfile = useSelector((state) => state.userReducer.currentUser);

  const colDefs = [
    { headerName: 'مدل', field: 'Model', type: 'text' },
    { headerName: 'شماره سریال', field: 'SerialNum', type: 'text' },
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

  const formTitle = ' انواع منابع تغذیه منصوبه';
  const addDialogTitle = 'افزودن منبع تغذیه جدید';
  const addActionName = 'افزودن';
  const edtDialogTitle = 'ویرایش منبع تغذیه';
  const edtActionName = 'ذخیره';
  const rmvDialogTitle = `Modelحذف منبع تغذیه`;
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
      search={['Model', 'SerialNum', 'Specs']}
    />
  );
}

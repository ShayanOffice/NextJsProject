import React from 'react';
import { LovForm } from '../components/PopupFormSearch';
import {
  useAddLaptopMutation,
  useEdtLaptopMutation,
  useGetLOVLaptopsQuery,
  useRmvLaptopMutation,
} from '../app/samaRTKapi';
import { useSelector } from 'react-redux';

export default function LovLaptop() {
  const { data: List } = useGetLOVLaptopsQuery();
  const [insert] = useAddLaptopMutation();
  const [edit] = useEdtLaptopMutation();
  const [remove] = useRmvLaptopMutation();
  const userProfile = useSelector((state) => state.userReducer.currentUser);

  const colDefs = [
    { headerName: 'مدل', field: 'Model', type: 'text' },
    { headerName: 'مشخصات', field: 'Specs', type: 'text' },
    userProfile.UserLevelId != 3 && {
      headerName: 'حذف',
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

  const formTitle = 'انواع لپ تاپ های در خدمت';
  const addDialogTitle = 'افزودن لپ تاپ جدید';
  const addActionName = 'افزودن';
  const edtDialogTitle = 'ویرایش نوع لپ تاپ';
  const edtActionName = 'ذخیره';
  const rmvDialogTitle = `Modelعودت لپ تاپ`;
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

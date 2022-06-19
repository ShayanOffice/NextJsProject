import React from 'react';
import { LovForm } from '../components/PopupFormSearch';
import {
  useAddProvinceMutation,
  useEdtProvinceMutation,
  useGetProvincesQuery,
  useRmvProvinceMutation,
} from '../app/samaRTKapi';
import { useSelector } from 'react-redux';

export default function LovProvince() {
  const { data: List } = useGetProvincesQuery();
  const [insert] = useAddProvinceMutation();
  const [edit] = useEdtProvinceMutation();
  const [remove] = useRmvProvinceMutation();
  const userProfile = useSelector((state) => state.userReducer.currentUser);

  const colDefs = [
    { headerName: 'نام استان', field: 'Province', type: 'text' },
    userProfile.UserLevelId != 3 && {
      headerName: 'حذف',
      field: 'hazf',
      className: 'w-16',
    },
    userProfile.UserLevelId != 3 && {
      headerName: 'ویرایش',
      className: 'w-16',
      field: 'edit',
    },
  ];
  const handleUsersRowData = (qry) =>
    !qry ? [] : qry.map((row, ix) => ({ ...row, ix: ix }));

  const formTitle = ' استان های تحت پوشش';
  const addDialogTitle = 'افزودن استان جدید';
  const addActionName = 'افزودن';
  const edtDialogTitle = 'ویرایش استان';
  const edtActionName = 'ذخیره';
  const rmvDialogTitle = `Provinceحذف استان`;
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
      search={['Province']}
    />
  );
}

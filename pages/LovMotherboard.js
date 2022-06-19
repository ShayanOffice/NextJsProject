import React from 'react';
import { LovForm } from '../components/PopupFormSearch';
import {
  useAddMotherbordMutation,
  useEdtMotherbordMutation,
  useGetLOVMotherBoardsQuery,
  useRmvMotherbordMutation,
} from '../app/samaRTKapi';
import { useSelector } from 'react-redux';

export default function LovMotherboard() {
  const { data: List } = useGetLOVMotherBoardsQuery();
  const [insert] = useAddMotherbordMutation();
  const [edit] = useEdtMotherbordMutation();
  const [remove] = useRmvMotherbordMutation();
  const userProfile = useSelector((state) => state.userReducer.currentUser);

  const colDefs = [
    { headerName: 'مدل', field: 'Model', type: 'text', rules: ['required'] },
    { headerName: 'مشخصات', field: 'Specs', type: 'text' },
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

  const formTitle = ' انواع مادربورد منصوبه';
  const addDialogTitle = 'افزودن مادربورد جدید';
  const addActionName = 'افزودن';
  const edtDialogTitle = 'ویرایش مادربورد';
  const edtActionName = 'ذخیره';
  const rmvDialogTitle = `Modelحذف مادربورد`;
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

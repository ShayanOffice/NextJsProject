import React, { useEffect, useState } from 'react';
import { LovForm } from '../components/PopupFormSearch';
import {
  SamaApi,
  useRegisterMutation,
  useEdtUserMutation,
  useGetLOVDepartmentsQuery,
  useGetLOVUserLevelsQuery,
  useGetProvincesQuery,
  useGetUsersQuery,
  useRmvUserMutation,
  usePostNewFilterMutation,
  useCleanFilterMutation,
  useClearSortMutation,
  usePostSortMutation,
  useGetAllUsersQuery,
} from '../app/samaRTKapi';
import { useDispatch, useSelector } from 'react-redux';
import { setIsLoading, setTitle } from '../app/systemSlice';
import { CSVComponent } from '../components/CSVComponent';

export default function Users() {
  const [getUsersReq, { data: Response, isLoading }] =
    SamaApi.useLazyGetUsersQuery();
  const [pageNum, setPageNum] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(11);

  const dispatch = useDispatch();
  const { data: getAllRecords } = useGetAllUsersQuery();
  const [insert] = useRegisterMutation();
  const [edit] = useEdtUserMutation();
  const [postNewFilter] = usePostNewFilterMutation();

  const [postSort] = usePostSortMutation();
  const [remove] = useRmvUserMutation();
  const { data: departmentList } = useGetLOVDepartmentsQuery();
  const { data: userLevelList } = useGetLOVUserLevelsQuery();
  const { data: provinceList } = useGetProvincesQuery();
  const userProfile = useSelector((state) => state.userReducer.currentUser);
  const [cleanFilters] = useCleanFilterMutation(); // جهت پاک کردن فیلتر

  const [clearSortings] = useClearSortMutation(); // جهت پاک کردن مرتب سازی

  useEffect(() => {
    dispatch(setTitle(formTitle));
    cleanFilters();
    clearSortings();
  }, []);

  useEffect(() => {
    if (isLoading) dispatch(setIsLoading(true));
    else dispatch(setIsLoading(false));
  }, [isLoading]);

  useEffect(() => {
    getUsersReq({ itemsPerPage, pageNum });
  }, [itemsPerPage, pageNum]);

  const colDefs = [
    { headerName: 'کد ملی', field: 'Id', type: 'text', rules: ['required'] },
    { headerName: 'نام', mobileHeader: true, field: 'Name', type: 'text' },
    {
      headerName: 'نام فامیل',
      mobileHeader: true,
      field: 'Family',
      type: 'text',
    },
    userProfile.UserLevelId == 1 && {
      headerName: 'استان',
      field: 'Provinces.Province',

      type: 'select',
      choises: provinceList,
      optionTitle: ['Province'],
      optionSource: 'Provinces.Id',
      rules: ['required'],
    },
    {
      headerName: 'واحد سازمانی',
      field: 'LOVDepartments.Department',
      type: 'select',
      choises: departmentList,
      optionTitle: ['Department'],
      optionSource: 'LOVDepartments.Id',
      rules: ['required'],
    },
    {
      headerName: 'سطح کاربری',
      field: 'LOVUserLevels.Title',
      type: 'select',
      choises: userLevelList,
      optionTitle: ['Title'],
      optionSource: 'LOVUserLevels.Id',
      rules: ['required'],
    },
    { headerName: 'شماره تلفن', field: 'PhoneNumber', type: 'text' },
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

  const handleUsersRowData = (qry) => {
    if (!qry) return [];
    let rowdata = [{}];
    userProfile.UserLevelId != 1 /* اعمال فیلتر بر غیر کاربران ارشد */
      ? (rowdata = qry.filter((row) => {
          return (
            userProfile.ProvinceId ==
              row.Provinces
                .Id /* لحاظ کاربرانیکه هم استان با کاربر متصل باشند */ &&
            userProfile.UserLevelId <
              row.LOVUserLevels
                .Id /* حذف کاربرانی که سطح بیشتر از کاربر متصل داشته باشند */
          );
        }))
      : (rowdata = qry);

    rowdata = rowdata.map((row, ix) => ({
      ...row,
      ix: ix,
      'Provinces.Province': row.Provinces.Province,
      'LOVDepartments.Department': row.LOVDepartments?.Department,
      'LOVUserLevels.Title': row.LOVUserLevels.Title,
    }));
    return rowdata;
  };

  const formTitle = 'مدیریت کاربران';
  const addDialogTitle = 'افزودن کاربر جدید';
  const addActionName = 'افزودن';
  const edtDialogTitle = 'ویرایش کاربر';
  const edtActionName = 'ذخیره';
  const rmvDialogTitle = `Familyحذف کاربر`;
  const rmvActionName = 'حذف';
  return (
    <div>
      <LovForm
        formTitle={formTitle}
        getAllRecords={getAllRecords}
        DataHandler={handleUsersRowData}
        addActionName={addActionName}
        addDialogTitle={addDialogTitle}
        colDefs={colDefs}
        edtActionName={edtActionName}
        edtDialogTitle={edtDialogTitle}
        edit={edit}
        filter={postNewFilter}
        filterIdentity='Users'
        insert={insert}
        insertingTemplate={{ Provinces: { Id: userProfile.ProvinceId } }}
        List={handleUsersRowData(Response?.items)}
        ItemsCount={Response?.itemsCount}
        pageCount={Response?.pageCount}
        itemsPerPage={itemsPerPage}
        remove={remove}
        rmvActionName={rmvActionName}
        rmvDialogTitle={rmvDialogTitle}
        setPageNum={setPageNum}
        sortingReq={postSort}
        search={[
          'Id',
          'Name',
          'Family',
          'Provinces.Province',
          'LOVUserLevels.Title',
          'Department',
          'PhoneNumber',
        ]}
      />
    </div>
  );
}

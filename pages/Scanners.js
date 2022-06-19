import React, { useEffect, useState } from 'react';
import { LovForm } from '../components/PopupFormSearch';
import {
  SamaApi,
  useAddScannerMutation,
  useCleanFilterMutation,
  useEdtScannerMutation,
  useGetScannersQuery,
  useRmvScannerMutation,
  useGetLOVScannersQuery,
  useGetProvincesQuery,
  useGetLOVDepartmentsQuery,
  useGetAllUsersQuery,
  usePostNewFilterMutation,
  useClearSortMutation,
  usePostSortMutation,
  useGetAllScannersMutation,
} from '../app/samaRTKapi';
import { useDispatch, useSelector } from 'react-redux';
import { setIsLoading, setTitle } from '../app/systemSlice';
import { CSVComponent } from '../components/CSVComponent';

export default function Scanners() {
  const [getScannersReq, { data: Response, isLoading }] =
    SamaApi.useLazyGetScannersQuery();
  const [pageNum, setPageNum] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(11);

  const dispatch = useDispatch();
  const [getAllRecords] = useGetAllScannersMutation();
  const [insert] = useAddScannerMutation();
  const [edit] = useEdtScannerMutation();
  const [postNewFilter] = usePostNewFilterMutation();

  const [postSort] = usePostSortMutation();
  const [remove] = useRmvScannerMutation();

  const { data: DeptList } = useGetLOVDepartmentsQuery();
  const { data: scnnrList } = useGetLOVScannersQuery();
  const { data: UserList } = useGetAllUsersQuery();
  const { data: PrvList } = useGetProvincesQuery();
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
    getScannersReq({ itemsPerPage, pageNum });
  }, [itemsPerPage, pageNum]);

  const colDefs = [
    {
      headerName: 'مدل',
      field: 'LOVScanners.Model',
      type: 'select',
      choises: scnnrList,
      optionTitle: ['مدلModel: '],
      optionSource: 'LOVScanners.Id' /* Id does not exsit in query */,
      rules: ['required'],
    },
    { headerName: 'کد اموال', field: 'PropertyCode', type: 'text' },
    userProfile.UserLevelId == 1 && {
      headerName: 'در استان',
      field: 'Provinces.Province',
      type: 'select',
      choises: PrvList,
      optionTitle: ['Province'],
      optionSource: 'Provinces.Id' /* Id does not exsit in query */,
      rules: ['required'],
    },
    {
      headerName: 'نام',
      field: 'Users.Name',
      mobileHeader: true,
      type: 'text',
    },
    {
      headerName: 'نام فامیل',
      field: 'Users.Family',
      mobileHeader: true,
      type: 'select',
      choises:
        userProfile.UserLevelId != 1
          ? UserList?.filter(
              (row) => userProfile.ProvinceId == row.Provinces.Id
            )
          : UserList,
      optionTitle: ['Name', 'Family'],
      optionSource: 'Users.Id',
      rules: ['required'],
    },
    {
      headerName: 'محل استفاده',
      field: 'LOVDepartments.Department',
      type: 'select',
      choises: DeptList,
      optionTitle: ['Department'],
      optionSource: 'LOVDepartments.Id' /* Id does not exsit in query */,
      rules: ['required'],
    },
    {
      headerName: 'حذف',
      className: 'w-16',
      field: 'hazf',
      nonFilterable: true,
    },
    {
      headerName: 'ویرایش',
      className: 'w-16',
      field: 'edit',
      nonFilterable: true,
    },
  ];

  const handleRowData = (qry) => {
    if (!qry) return [];
    let rowdata = [{}];
    userProfile.UserLevelId != 1 /* i.e. level is either 2 or 3 */
      ? (rowdata = qry.filter((row) => {
          var UProvince = UserList?.filter(
            (user) => userProfile.ProvinceId == user.Provinces.Id
          );
          var isInSelfPrv = false;
          for (let i = 0; i < UProvince?.length; i++) {
            const user = UProvince[i];
            if (row.Users?.Id == user.Id) {
              isInSelfPrv = true;
              break;
            }
          }
          return isInSelfPrv; /* leave only those users with the same province as login user */
        }))
      : (rowdata = qry);

    rowdata = rowdata.map((row, ix) => ({
      ...row,
      ix: ix,
      'LOVScanners.Model': row.LOVScanners.Model && row.LOVScanners.Model,
      'LOVDepartments.Department': row.LOVDepartments?.Department,
      'Users.Id': row.Users && row.Users.Id,
      'Users.Name': row.Users?.Name,
      'Users.Family': row.Users?.Family,
      'Provinces.Province': row.Provinces?.Province,
    }));
    return rowdata;
  };

  const formTitle = ' اسکنر های تحویلی';
  const addDialogTitle = 'تحویل اسکنر جدید';
  const addActionName = 'تحویل';
  const edtDialogTitle = 'ویرایش اسکنر';
  const edtActionName = 'ذخیره';
  const rmvDialogTitle = `PropertyCodeعودت اسکنر بشماره اموال `;
  const rmvActionName = 'عودت';

  return (
    <div>

      <LovForm
        formTitle={formTitle}
        getAllRecords={getAllRecords}
        DataHandler={handleRowData}
        addActionName={addActionName}
        addDialogTitle={addDialogTitle}
        colDefs={colDefs}
        edtActionName={edtActionName}
        edtDialogTitle={edtDialogTitle}
        edit={edit}
        filter={postNewFilter}
        filterIdentity='Scanners'
        insert={insert}
        insertingTemplate={{ Provinces: { Id: userProfile.ProvinceId } }}
        List={handleRowData(Response?.items)}
        ItemsCount={Response?.itemsCount}
        pageCount={Response?.pageCount}
        itemsPerPage={itemsPerPage}
        remove={remove}
        rmvActionName={rmvActionName}
        rmvDialogTitle={rmvDialogTitle}
        setPageNum={setPageNum}
        sortingReq={postSort}
        search={[
          'LOVDepartments.Department',
          'Users.Id',
          'Users.Name',
          'Users.Family',
          'Province',
          'PropertyCode',
          'Model',
        ]}
      />
    </div>
  );
}

import React, { useEffect, useState } from 'react';
import { LovForm } from '../components/PopupFormSearch';
import {
  SamaApi,
  useAddMonitorMutation,
  useCleanFilterMutation, // برای اعمال فیلتر از سمت back-end //
  useEdtMonitorMutation,
  useGetLOVDepartmentsQuery,
  useGetLOVMonitorsQuery,
  useGetProvincesQuery,
  useGetAllUsersQuery,
  usePostNewFilterMutation,
  useRmvMonitorMutation,
  useClearSortMutation,
  usePostSortMutation,
  useGetAllMonitorsMutation,
} from '../app/samaRTKapi';
import { useDispatch, useSelector } from 'react-redux';
import { setIsLoading, setTitle } from '../app/systemSlice';
import { CSVComponent } from '../components/CSVComponent';

export default function Monitors() {
  const [getMonitorsReq, { data: Response, isLoading }] =
    SamaApi.useLazyGetMonitorsQuery();
  const [pageNum, setPageNum] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(11);

  const dispatch = useDispatch();
  const [getAllRecords] = useGetAllMonitorsMutation();
  const [insert] = useAddMonitorMutation();
  const [edit] = useEdtMonitorMutation();
  const [remove] = useRmvMonitorMutation();
  const [postNewFilter] = usePostNewFilterMutation();

  const [postSort] = usePostSortMutation();

  const { data: DeptList } = useGetLOVDepartmentsQuery();
  const { data: MonList } = useGetLOVMonitorsQuery();
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
    getMonitorsReq({ itemsPerPage, pageNum });
  }, [itemsPerPage, pageNum]);

  const colDefs = [
    {
      headerName: 'مدل',
      field: 'LOVMonitors.Model',
      type: 'select',
      choises: MonList,
      optionTitle: ['مدلModel: ', ' مشخصاتSpec:'],
      optionSource: 'LOVMonitors.Id',
      className: 'font-sans',
      rules: ['required'],
    },
    { headerName: 'کد اموال', field: 'PropertyCode', type: 'text' },
    {
      headerName: 'نام',
      field: 'Users.Name',
      mobileHeader: true,
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
      headerName: 'محل استفاده',
      field: 'LOVDepartments.Department',
      mobileHeader: true,
      type: 'select',
      choises: DeptList,
      optionTitle: ['Department'],
      optionSource: 'LOVDepartments.Id' /* Id does not exsit in query */,
      rules: ['required'],
    },
    {
      headerName: 'عودت',
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
          var UProvince = UserList?.items?.filter(
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
      'LOVMonitors.Model': row.LOVMonitors?.Model,
      'LOVDepartments.Department': row.LOVDepartments?.Department,
      'Users.Id': row.Users?.Id,
      'Users.Name': row.Users?.Name,
      'Users.Family': row.Users?.Family,
      'Provinces.Province': row.Provinces?.Province,
    }));
    return rowdata;
  };

  const formTitle = ' مانیتور های تحویلی';
  const addDialogTitle = 'افزودن مانیتور جدید';
  const addActionName = 'افزودن';
  const edtDialogTitle = 'ویرایش مانیتور';
  const edtActionName = 'ذخیره';
  const rmvDialogTitle = `Modelعودت مانیتور`;
  const rmvActionName = 'عودت';

  return (
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
      filterIdentity='Monitors'
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
        'MoLOVMonitors.Model',
        'Users.Id',
        'Users.Family',
        'Users.Name',
        'Provinces.Province',
        'LOVDepartments.Department',
        'PropertyCode',
      ]}
    />
  );
}

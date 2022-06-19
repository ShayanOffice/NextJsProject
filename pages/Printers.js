import React, { useEffect, useState } from 'react';
import { LovForm } from '../components/PopupFormSearch';
import {
  SamaApi,
  useAddPrinterMutation,
  useCleanFilterMutation, // برای اعمال فیلتر از سمت back-end //
  
  useEdtPrinterMutation,
  useGetPrintersQuery,
  useRmvPrinterMutation,
  useGetLOVPrintersQuery,
  useGetProvincesQuery,
  useGetLOVDepartmentsQuery,
  useGetAllUsersQuery,
  usePostNewFilterMutation,
  
  useClearSortMutation,
  usePostSortMutation,
  useGetAllPrintersMutation,
} from '../app/samaRTKapi';
import { useDispatch, useSelector } from 'react-redux';
import { setIsLoading, setTitle } from '../app/systemSlice';
import { CSVComponent } from '../components/CSVComponent';

export default function Printers() {
  const [getPrintersReq, { data: Response, isLoading }] =
    SamaApi.useLazyGetPrintersQuery();
  const [pageNum, setPageNum] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(11);
  const dispatch = useDispatch();
  const [getAllRecords] = useGetAllPrintersMutation();
  const [insert] = useAddPrinterMutation();
  const [edit] = useEdtPrinterMutation();
  const [postNewFilter] = usePostNewFilterMutation();
  
  const [postSort] = usePostSortMutation();
  const [remove] = useRmvPrinterMutation();

  const { data: DptList } = useGetLOVDepartmentsQuery();
  const { data: PrnList } = useGetLOVPrintersQuery();
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
    getPrintersReq({ itemsPerPage, pageNum });
  }, [itemsPerPage, pageNum]);

  const colDefs = [
    {
      headerName: 'مدل',
      field: 'LOVPrinters.Model',
      type: 'select',
      choises: PrnList,
      optionTitle: ['مدلModel: ', ' Name:'],
      optionSource: 'LOVPrinters.Id',
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
          ? UserList?.items?.filter(
              (row) => userProfile.ProvinceId == row.Provinces.Id
            )
          : UserList?.items,
      optionTitle: ['Name', 'Family'],
      optionSource: 'Users.Id',
      rules: ['required'],
    },
    {
      headerName: 'با کد ملی',
      field: 'Users.Id',
      type: 'Text',
      rules: ['required'],
    },
    userProfile.UserLevelId == 1 && {
      headerName: 'در استان',
      field: 'Provinces.Province',
      type: 'select',
      choises: PrvList,
      optionTitle: ['Province'],
      optionSource: 'Provinces.Id',
      rules: ['required'],
    },
    {
      headerName: 'محل استفاده',
      field: 'LOVDepartments.Department',
      type: 'select',
      choises: DptList,
      optionTitle: ['Department'],
      optionSource: 'LOVDepartments.Id',
      rules: ['required'],
    },
    {
      headerName: 'حذف',
      className: 'w-16',
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
      'LOVPrinters.Model': row.LOVPrinters && row.LOVPrinters.Model,
      'LOVDepartments.Department':
        row.LOVDepartments && row.LOVDepartments.Department,
      'Users.Id': row.Users && row.Users.Id,
      'Users.Name': row.Users && row.Users.Name,
      'Users.Family': row.Users && row.Users.Family,
      'Provinces.Province': row.Provinces?.Province,
    }));
    return rowdata;
  };

  const formTitle = ' چاپگر های تحویلی';
  const addDialogTitle = 'افزودن چاپگر جدید';
  const addActionName = 'افزودن';
  const edtDialogTitle = 'ویرایش چاپگر';
  const edtActionName = 'ذخیره';
  const rmvDialogTitle = `Modelحذف چاپگر`;
  const rmvActionName = 'حذف';

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
        filterIdentity='Printers'
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
          'Provinces.Province',
          'PropertyCode',
          'LOVPrinters.Model',
        ]}
      />
    </div>
  );
}

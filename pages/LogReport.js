import React, { useEffect, useState } from 'react';
import moment from 'jalali-moment';
import { LovForm } from '../components/PopupFormSearch';
import {
  SamaApi,
  useCleanFilterMutation,
  useGetLogQuery,
  usePostNewFilterMutation,
  useClearSortMutation,
  usePostSortMutation,
  useGetAllLogMutation,
} from '../app/samaRTKapi';
import { useDispatch } from 'react-redux';
import { setIsLoading } from '../app/systemSlice';
import { CSVComponent } from '../components/CSVComponent';

export default function LogReport() {
  const [getLogsReq, { data: Response, isLoading }] =
    SamaApi.useLazyGetLogQuery();
  const [pageNum, setPageNum] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(16);

  const dispatch = useDispatch();
  const [getAllRecords] = useGetAllLogMutation();
  const [postNewFilter] = usePostNewFilterMutation();

  const [postSort] = usePostSortMutation();
  const [cleanFilters] = useCleanFilterMutation(); // جهت پاک کردن فیلتر

  const [clearSortings] = useClearSortMutation(); // جهت پاک کردن مرتب سازی

  useEffect(() => {
    cleanFilters();
    clearSortings();
  }, []);

  useEffect(() => {
    if (isLoading) dispatch(setIsLoading(true));
    else dispatch(setIsLoading(false));
  }, [isLoading]);

  useEffect(() => {
    getLogsReq({ itemsPerPage, pageNum });
  }, [itemsPerPage, pageNum]);

  const colDefs = [
    {
      headerName: 'زمان',
      mobileHeader: true,
      field: 'LogTime',
      nonFilterable: true,
    },
    { headerName: 'خلاصه عملیات', field: 'Summary' },
    { headerName: 'منشاء عمل', field: 'Module' },
    {
      headerName: 'عمل انجام شده',
      mobileHeader: true,
      field: 'LOVOperations.Operation',
    },
    { headerName: 'نام مجری', field: 'Users.Name' },
    { headerName: 'نام فامیل مجری', mobileHeader: true, field: 'Users.Family' },
  ];

  const handleUsersRowData = (qry) => {
    if (!qry) return [];
    const rowdata = qry.map((row, ix) => ({
      ...row,
      ix: ix,
      'LOVOperations.Operation': row.LOVOperations.Operation,
      'Users.Name': row.Users?.Name,
      'Users.Family': row.Users?.Family,
      LogTime: moment(row.LogDateTime, 'YYYY-M-D HH:mm:ss')
        .locale('fa')
        .format('(HH:mm:ss)YYYY/M/D'),
    }));
    return rowdata;
  };
  const formTitle = ' تاریخچه فعالیتهای سامانه سما';
  return (
    <div>
      <LovForm
        formTitle={formTitle}
        getAllRecords={getAllRecords}
        DataHandler={handleUsersRowData}
        List={handleUsersRowData(Response?.items)}
        ItemsCount={Response?.itemsCount}
        colDefs={colDefs}
        filter={postNewFilter}
        filterIdentity='Logs'
        pageCount={Response?.pageCount}
        itemsPerPage={itemsPerPage}
        setPageNum={setPageNum}
        sortingReq={postSort}
        search={[
          'Operation',
          'Users.Name',
          'Users.Family',
          'Module',
          'Summary',
          'LogDateTime',
        ]}
      />
    </div>
  );
}

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import SamaButton from '../components/SamaButton';
import PopupWrapper from '../components/PopupWrapper';
import { RespTab } from '../components/RespTab';
import axios from 'axios';

export default function LogReport() {
  const url = process.env.SqlUrl + 'api/'; /* defined in nwxt.config.js */

  async function getList(items) {
    axios({
      method: 'get',
      url: `${url}${items}`,
      headers: {},
    })
      .then((response) => {
        setDataItems(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }

  const [inEditMode, SetInEditMode] = useState(false);
  const [showInsertDialog, setShowInsertDialog] =
    useState(false); /* to control the dialog box as pop up, initially off */
  const [id, SetId] = useState(0);
  const [type, SetType] = useState('');
  const [lOVOperationsId, SetLOVOperationsId] = useState('');
  const [lOVResults, SetLOVResults] = useState('');
  const [userId, SetUserId] = useState('');
  const [summary, SetSummary] = useState('');
  const [comment, SetComment] = useState('');
  const [logDateTime, SetLogDateTime] = useState('');
  const [ip, SetIp] = useState('');
  const [agent, SetAgent] = useState('');
  const [provinceId, SetProvinceId] = useState('');
  const [lOVDepartmentsId, SetLOVDepartmentsId] = useState('');
  const [dataItems, setDataItems] = useState([
    {
      Id: 0,
      LOVOperationsId: 1,
      LOVResults: 1,
      UserId: '0005933565',
      Summary: '',
      Comment: '',
      LogDateTime: '4/12/2022 10:18:21.6570000 AM',
      Ip: '',
      Agent: '',
      ProvinceId: 33,
      LOVDepartmentsId: 2,
    },
  ]);

  const router = useRouter();

  const colDefs = [
    {
      headerName: 'عمل انجام شده',
      field: 'LOVOperationsId',
      mobileHeader: true,
      
    },
    {
      headerName: 'خلاصه عملیات',
      field: 'Summary',
      mobileHeader: true,
      
    },
    {
      headerName: 'توضبحات',
      field: 'Comment',
      
    },
    {
      headerName: 'نتبجه',
      field: 'LOVResults',
      
    },
    {
      headerName: 'از طریق ابزار',
      field: 'Agent',
      
    },
    {
      headerName: 'زمان',
      field: 'LogDateTime',
      
    },
    { headerName: 'آی پی', field: 'Ip', className: 'border border-slate-900' },
    {
      headerName: 'نام',
      field: 'FullName',
      
    },
    {
      headerName: 'استان',
      field: 'ProvinceId',
      
    },
    {
      headerName: 'واحد دریافت خدمت',
      field: 'LOVDepartmentsId',
      
    },
  ];

  const handleUsersRowData = (qry) => {
    if (!qry.data) return [];
    const rowdata = qry.map((row) => ({
      ...row,
      edit: (
        <div
          className='flex items-center justify-center border-none cursor-pointer bg-none'
          onClick={() => {
            SetInEditMode(true);
            SetId(row['Id']);
            SetModel(row['Type']);
          }}
        >
          <img className='editImg' alt='' src='/images/edit.svg' width='30px' />
        </div>
      ),
    }));
    return rowdata;
  };

  useEffect(() => {
    getList('lov/scanners');
  }, []);

  return (
    <div dir='rtl' className='w-full'>
      <div style={{ direction: 'rtl' }}>
        <h1 className='font-extrabold text-blue-700 '>مدیریت لاگ</h1>
      </div>
      <div className='grid grid-cols-4 shrink-0'>
        <PopupWrapper
          showDialog={showInsertDialog}
          setShowDialog={setShowInsertDialog}
          DialogTitle='تیپ اسکنر'
        >
          <h1 className='text-2xl'>نوع اسکنر</h1>
        </PopupWrapper>
        <SamaButton
          btnText='افـــزودن'
          btnClick={() => setShowInsertDialog(true)}
          txtColor='white'
          bgColor='green'
          ikon='/images/PersonAdd.svg'
        />
        <SamaButton
          btnText='بازگشت'
          btnClick={() => router.back()}
          txtColor='slate'
          bgColor='stone'
          ikon='images/Return.svg'
        />
      </div>
      <RespTab data={handleUsersRowData(dataItems)} colDefs={colDefs} />
    </div>
  );
}

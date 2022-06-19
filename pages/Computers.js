import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import SamaButton from '../components/SamaButton';
import PopupWrapper from '../components/PopupWrapper';
import { RespTab } from '../components/RespTab';
import {
  SamaApi,
  useAddComputerMutation,
  useEdtComputerMutation,
  useGetComputersQuery,
  useGetLOVAppsQuery,
  useGetLOVConnectionsQuery,
  useGetLOVCPUsQuery,
  useGetLOVDepartmentsQuery,
  useGetLOVGPUsQuery,
  useGetLOVMemoriesQuery,
  useGetLOVMotherBoardsQuery,
  useGetLOVOSesQuery,
  useGetLOVPowersQuery,
  useGetLOVSoftwaresQuery,
  useGetLOVStoragesQuery,
  useGetProvincesQuery,
  useGetAllUsersQuery,
  usePostNewFilterMutation,
  
  useRmvComputerMutation,
  useCleanFilterMutation,
  
  useClearSortMutation,
  usePostSortMutation,
  useGetAllComputersMutation,
} from '../app/samaRTKapi';
import PrepareForm from '../components/PrepareForm';
import { useDispatch, useSelector } from 'react-redux';
import toast from 'react-hot-toast';
import { setIsLoading, setTitle } from '../app/systemSlice';
import useWhereClauses from '../hooks/useWhereClauses';
import { CSVComponent } from '../components/CSVComponent';

export default function Computers() {
  const [getComputersReq, { data: Response, isLoading }] =
    SamaApi.useLazyGetComputersQuery();
  const [pageNum, setPageNum] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);

  const formTitle = 'رایانه های تحویلی';
  const [showDialog, setShowDialog] = useState(false);
  const dispatch = useDispatch();
  const [getAllRecords] = useGetAllComputersMutation();
  const [formTemplate, setFormTemplate] = useState({
    Name: '',
    DialogTitle: '',
    form: <div />,
  });
  const router = useRouter();

  const { data: DeptList } = useGetLOVDepartmentsQuery();
  const { data: CPUList } = useGetLOVCPUsQuery();
  const { data: GPUList } = useGetLOVGPUsQuery();
  const { data: ConList } = useGetLOVConnectionsQuery();
  const { data: MemList } = useGetLOVMemoriesQuery();
  const { data: MotherList } = useGetLOVMotherBoardsQuery();
  const { data: OsList } = useGetLOVOSesQuery();
  const { data: AppList } = useGetLOVAppsQuery();
  const { data: PwrList } = useGetLOVPowersQuery();
  const { data: PrvList } = useGetProvincesQuery();
  const { data: SoftList } = useGetLOVSoftwaresQuery();
  const { data: StrgList } = useGetLOVStoragesQuery();
  const { data: UserList } = useGetAllUsersQuery();

  const [insert] = useAddComputerMutation();
  const [edit] = useEdtComputerMutation();
  const [remove] = useRmvComputerMutation();
  const [postNewFilter] = usePostNewFilterMutation();
  
  const [postSort] = usePostSortMutation();

  const [query, setQuery] = useState('');
  const [list, setList] = useState(Response?.items);

  useEffect(() => {
    const filteredByProvince = (L) =>
      userProfile.UserLevelId != 1
        ? L?.filter((row) => userProfile.ProvinceId == row.Provinces.Id)
        : L;
    const injectIx = filteredByProvince(Response?.items)?.map((row, ix) => ({
      ...row,
      ix: ix,
    }));

    setList(injectIx);
  }, [Response]);

  const [filteredList, setFilteredList] = useState(list);

  const changeHandler = ({ target: { value } }) => {
    setQuery(value);
  };
  useEffect(() => {
    setFilteredList(list);
    setFilteredList(
      query === ''
        ? list
        : list.filter((itm) => {
            return (
              itm.PropertyCode +
              itm.Users?.Id +
              itm.Users?.Name +
              itm.Users?.Family +
              itm.Provinces?.Province +
              itm.LOVMotherBoards?.Model +
              itm.LOVCPUs?.Model +
              itm.LOVGPUs?.Specs +
              itm.Power
            )
              .toLowerCase()
              .replace(/\s+/g, '')
              .includes(query.toLowerCase().replace(/\s+/g, ''));
          })
    );
  }, [query, list]);

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
    getComputersReq({ itemsPerPage, pageNum });
  }, [itemsPerPage, pageNum]);

  const colDefs = [
    { headerName: 'کد اموال', field: 'PropertyCode', type: 'text' },
    {
      headerName: 'نام',
      mobileHeader: true,
      field: 'Users.Name',
    },
    {
      headerName: 'فامیل',
      mobileHeader: true,
      field: 'Users.Family',
    },
    {
      headerName: 'تحویل گیرنده',
      mobileHeader: true,
      field: 'NameFamily',
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
      HideInRespTab: true,
    },
    userProfile.UserLevelId == 1 && {
      headerName: 'استان',
      mobileHeader: true,
      field: 'Provinces.Province',
      type: 'select',
      choises: PrvList,
      optionTitle: ['Province'],
      optionSource: 'Provinces.Id',
      rules: ['required'],
    },
    {
      headerName: 'واحد خدمت گیرنده',
      field: 'LOVDepartments.Department',
      type: 'select',
      choises: DeptList,
      optionTitle: ['Department'],
      optionSource: 'LOVDepartments.Id',
      rules: ['required'],
    },
    {
      headerName: 'مادر بورد',
      field: 'LOVMotherBoards.Model',
      type: 'select',
      className: 'font-sans',
      choises: MotherList,
      optionTitle: ['Model'],
      optionSource: 'LOVMotherBoards.Id',
      rules: ['required'],
    },
    {
      headerName: 'پردازنده',
      field: 'LOVCPUs.Model',
      type: 'select',
      className: 'font-sans',
      choises: CPUList,
      optionTitle: [
        'مدلModel: ',
        ', کلاکClock: ',
        ', کشCache: ',
        ', مشخصاتSpecs:',
      ],
      optionSource: 'LOVCPUs.Id',
      rules: ['required'],
    },
    {
      headerName: 'پردازنده گرافیکی',
      field: 'LOVGPUs.Model',
      type: 'select',
      className: 'font-sans',
      choises: GPUList,
      optionTitle: ['Specs:'],
      optionSource: 'LOVGPUs.Id',
    },
    {
      headerName: 'منبع تغذیه',
      field: 'LOVPowers.Model',
      type: 'select',
      className: 'font-sans',
      choises: PwrList,
      optionTitle: ['Model'],
      optionSource: 'LOVPowers.Id',
    },
    {
      headerName: 'ارتباط شبکه',
      field: 'Connections',
      type: 'form',
      addButton: true,
      colDefs: [
        {
          field: 'Id',
          type: 'text',
          hideInForms: true,
        },
        {
          field: 'Ip',
          type: 'text',
          className: 'rounded w-full',
        },
        {
          field: 'NetworkName',
          type: 'text',
          className: 'rounded w-full',
        },
        {
          field: 'LOVConnections',
          type: 'select',
          choises: ConList,
          optionTitle: ['Type'],
          optionSource: 'LOVConnections.Id',
          rules: ['required'],
        },
      ],
    },
    {
      headerName: 'حافظه',
      field: 'Memories',
      type: 'form',
      addButton: true,
      colDefs: [
        {
          field: 'Id',
          type: 'text',
          hideInForms: true,
        },
        {
          field: 'Count',
          type: 'count',
          className: 'w-1/12 rounded-full',
        },
        {
          field: 'LOVMemories',
          type: 'select',
          choises: MemList,
          optionTitle: ['Capacity: ', ', Type: '],
          optionSource: 'LOVMemories.Id',
          rules: ['required'],
        },
      ],
    },
    {
      headerName: 'سیستم عامل',
      field: 'OSes',
      type: 'form',
      colDefs: [
        {
          field: 'Id',
          type: 'text',
          hideInForms: true,
        },
        {
          field: 'LOVOSes',
          type: 'select',
          choises: OsList,
          optionTitle: ['Specs'],
          optionSource: 'LOVOSes.Id',
          rules: ['required'],
        },
      ],
    },
    {
      headerName: 'نرم افزارها',
      field: 'Softwares',
      type: 'form',
      addButton: true,
      colDefs: [
        {
          field: 'Id',
          type: 'text',
          hideInForms: true,
        },
        {
          field: 'LOVSoftwares',
          type: 'select',
          choises: SoftList,
          optionTitle: ['Specs'],
          optionSource: 'LOVSoftwares.Id',
          rules: ['required'],
        },
      ],
    },
    {
      headerName: 'سامانه ها',
      field: 'Apps',
      type: 'form',
      addButton: true,
      colDefs: [
        {
          field: 'Id',
          type: 'text',
          hideInForms: true,
        },
        {
          field: 'LOVApps',
          type: 'select',
          choises: AppList,
          optionTitle: ['Name'],
          optionSource: 'LOVApps.Id',
          rules: ['required'],
        },
      ],
    },
    {
      headerName: 'حافظه سخت',
      field: 'Storages',
      type: 'form',
      addButton: true,
      colDefs: [
        {
          field: 'Id',
          type: 'text',
          hideInForms: true,
        },
        {
          field: 'Count',
          type: 'count',
          className: 'w-1/12 rounded-full',
        },
        {
          field: 'LOVStorages',
          type: 'select',
          choises: StrgList,
          optionTitle: ['Specs: ', ', Type: '],
          optionSource: 'LOVStorages.Id',
          rules: ['required'],
        },
      ],
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

  const handleUsersRowData = (qry) => {
    if (!qry) return [];
    let rowdata = [{}];
    userProfile.UserLevelId != 1 // برای سطح 2 یا 3
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
    rowdata = rowdata.map((row, index) => ({
      ...row,
      'LOVCPUs.Model': row.LOVCPUs?.Model,
      'LOVDepartments.Department': row.LOVDepartments?.Department,
      'LOVGPUs.Model': row.LOVGPUs?.Specs,
      'LOVMotherBoards.Model': row.LOVMotherBoards?.Model,
      'Users.Id': row.Users?.Id,
      'Users.Name': row.Users?.Name,
      'Users.Family': row.Users?.Family,
      NameFamily: row.Users?.Name + ' ' + row.Users?.Family,
      'LOVPowers.Model': row.LOVPowers.Model,
      'Provinces.Province': row.Provinces?.Province,
      OSes: row.OSes.map((itm, i) => {
        return (
          <div key={i} className='flex flex-col '>
            <p className='px-1 m-auto mt-[0.1rem] font-sans border rounded-md max-w-fit border-slate-400 bg-[#ddea]'>
              {itm.LOVOSes?.Specs}
            </p>
          </div>
        );
      }),
      Softwares: row.Softwares.map((itm, i) => {
        return (
          <div key={i} className='flex flex-col '>
            <p className='px-1 m-auto mt-[0.1rem] font-sans border rounded-md max-w-fit border-slate-400 bg-[#ddea]'>
              {itm.LOVSoftwares?.Specs}
            </p>
          </div>
        );
      }),
      Apps: (
        <div className='flex justify-center items-center flex-wrap  space-y-[0.1rem] space-x-[0.1rem] text-xs max-w-[18rem]'>
          {row.Apps.map((itm, i) => {
            return (
              <div key={i} className='flex items-center justify-center '>
                <p className='px-[0.1rem] min-w-[0.7rem] py-[0.2rem] m-auto mt-[0.1rem] font-sans border rounded-[0.15rem] border-slate-400 bg-[#ddea]'>
                  {itm.LOVApps?.Name}
                </p>
              </div>
            );
          })}
        </div>
      ),
      Connections: row.Connections.map((itm, i) => {
        return (
          <div key={i} className='flex flex-col '>
            <p className='px-1 m-auto mt-[0.1rem] font-sans border rounded-md max-w-fit border-slate-400 bg-[#ddea]'>
              {itm.NetworkName}
            </p>
            <p className='p-0 font-sans border-t-0 '>{itm.Ip}</p>
            <p className='px-1 m-auto mt-[0.1rem] font-sans border rounded-md max-w-fit border-slate-400 bg-[#ddea]'>
              {itm.LOVConnections?.Type}
            </p>
          </div>
        );
      }),
      Memories: row.Memories.map((itm, i) => {
        return (
          <div key={i} className='flex flex-col font-sans '>
            <p className='px-1 m-auto mt-[0.1rem] font-sans border rounded-md max-w-fit border-slate-400 bg-[#ddea]'>
              {itm.Count}x{itm.LOVMemories?.Capacity} &nbsp;
              {itm.LOVMemories?.Type}
            </p>
          </div>
        );
      }),
      Storages: row.Storages.map((itm, i) => {
        return (
          <div key={i} className='flex flex-col font-sans '>
            <p className='px-1 m-auto mt-[0.1rem] font-sans border rounded-md max-w-fit border-slate-400 bg-[#ddea]'>
              {itm.Count}x{itm.LOVStorages?.Type} &nbsp;
              {itm.LOVStorages?.Specs}
            </p>
          </div>
        );
      }),
      edit: (
        <div
          className='flex items-center justify-center border-none cursor-pointer bg-none'
          onClick={() => {
            setShowDialog(true);
            setFormTemplate(editForm(row.ix));
          }}
        >
          <img
            className='editImg opacity-90'
            alt=''
            src='/images/edit.svg'
            width='30px'
          />
        </div>
      ),
      hazf: (
        <div
          className='flex items-center justify-center border-none cursor-pointer bg-none'
          onClick={() => {
            setShowDialog(true);
            setFormTemplate(
              deleteForm(
                row.ix,
                row.PropertyCode,
                row.Users?.Name + ' ' + row.Users?.Family
              )
            );
          }}
        >
          <img alt='' src='/images/TrashCan.svg' width='30px' />
        </div>
      ),
    }));
    return rowdata;
  };

  function makeComputerData(dataState) {
    const {
      Users,
      PropertyCode,
      LOVDepartments,
      Provinces,
      LOVMotherBoards,
      LOVCPUs,
      LOVGPUs,
      LOVPowers,
      Memories: DataMemories,
      Apps: DataApps,
      Connections: DataConnections,
      OSes: DataOSes,
      Softwares: DataSoftwares,
      Storages: DataStorages,
      Id,
    } = dataState;

    let Memories = DataMemories?.map((itm) => ({
      LOVMemoryId: itm.LOVMemories.Id,
      Count: itm.Count,
    }));
    let Apps = DataApps?.map((itm) => ({
      LOVAppId: itm.LOVApps.Id,
    }));
    let Connections = DataConnections?.map((itm) => ({
      LOVConnectionId: itm.LOVConnections.Id,
      NetworkName: itm.NetworkName,
      Ip: itm.Ip,
    }));
    let OSes = DataOSes?.map((itm) => ({
      LOVOsId: itm.LOVOSes.Id,
    }));
    let Softwares = DataSoftwares?.map((itm) => ({
      LOVSoftwareId: itm.LOVSoftwares.Id,
    }));
    let Storages = DataStorages?.map((itm) => ({
      LOVStorageId: itm.LOVStorages.Id,
      Count: itm.Count,
    }));

    let body = {
      TheUser: userProfile.Id,
      Summary: '',
      Agent: window.navigator.userAgent,
      Computer: {
        UserId: Users.Id,
        PropertyCode: PropertyCode,
        ProvinceId: Provinces.Id,
        LOVDepartmentsId: LOVDepartments.Id,
        LOVMotherBoardsId: LOVMotherBoards.Id,
        LOVCPUId: LOVCPUs.Id,
        LOVGPUId: LOVGPUs.Id,
        LOVPowerId: LOVPowers.Id,
        // LOVLaptopId: LOVLaptops.Id,
      },
      Memories,
      Apps,
      Connections,
      OSes,
      Softwares,
      Storages,
    };

    return body;
  }

  const addForm = () => ({
    Name: 'insert',
    DialogTitle: 'افزودن کامپیوتر / لپ تاپ',
    form: (
      <PrepareForm
        colDef={colDefs}
        selectedRow={[]}
        action={async (dataState) => {
          try {
            let body = makeComputerData(dataState);
            await insert(body);
            toast.success(`مورد جدید افزوده شد.`);
          } catch (err) {
            console.error(err);
            toast.error(`مورد جدید اضافه نشد.`);
          }
        }}
        actionName='ذخیره'
        setShowDialog={setShowDialog}
      />
    ),
  });

  const editForm = (ix) => ({
    Name: 'edit',
    DialogTitle: `ویرایش کامپیوتر / لپ تاپ با کد اموال  ${list[ix].PropertyCode}`,
    form: (
      <PrepareForm
        colDef={colDefs}
        selectedRow={list && list[ix]}
        action={async (dataState) => {
          try {
            let body = makeComputerData(dataState);
            body.Id = dataState.Id;
            await edit(body);
            toast.success(`مورد انتخاب شده ویرایش شد.`);
          } catch (err) {
            console.error(err);
            toast.error(`مورد انتخاب شده ویرایش نشد.`);
          }
        }}
        actionName='ذخیره'
        setShowDialog={setShowDialog}
      />
    ),
  });

  const deleteForm = (ix, pCode, nFamily) => ({
    Name: 'delete',
    DialogTitle: (
      <div>
        <p>{`حذف دستگاه بشماره اموال ${pCode}`}</p>
        <p>{`در اختیار ${nFamily}`}</p>
      </div>
    ),
    form: (
      <PrepareForm
        colDef={[]}
        selectedRow={list && list[ix]}
        action={async (dataState) => {
          try {
            const obj = {
              Id: dataState.Id,
              TheUser: userProfile.Id,
              Summary: '',
              Agent: window.navigator.userAgent,
            };
            await remove(obj).unwrap();
            toast.success(`مورد انتخاب شده حذف شد.`);
          } catch (err) {
            console.error(err);
            toast.error(`مورد انتخاب شده حذف نشد.`);
          }
        }}
        actionName={'حذف'}
        setShowDialog={setShowDialog}
      />
    ),
  });

  return (
    <div dir='rtl' className='full'>
      <div style={{ direction: 'rtl' }}>
        {/* <h1 className='font-extrabold text-blue-700 '>
          وضعیت کامپیوترهای دسکتاپ
        </h1> */}
      </div>
      <div className='flex items-center justify-between'>
        <PopupWrapper
          small={formTemplate.Name === 'delete'}
          showDialog={showDialog}
          setShowDialog={setShowDialog}
          DialogTitle={formTemplate.DialogTitle}
        >
          {formTemplate.form}
        </PopupWrapper>
        <div className='flex items-center justify-between w-4/6'>
          <SamaButton
            btnText='افـــزودن'
            btnClick={() => {
              setShowDialog(true);
              setFormTemplate(addForm());
            }}
            txtColor='white'
            bgColor='blue'
            ikon='/images/PersonAdd.svg'
          />
          <div className='w-full my-4 ml-5'>
            <input
              className='w-full px-3 py-2 leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline'
              id='filter'
              type='text'
              placeholder='جستجو'
              value={query}
              onChange={changeHandler}
            />
          </div>
        </div>
        <SamaButton
          btnText='بازگشت'
          btnClick={() => router.back()}
          txtColor='slate'
          bgColor='stone'
          ikon='images/Return.svg'
        />
      </div>
      <div>
        <CSVComponent
          formTitle={formTitle}
          getAllRecords={getAllRecords}
          colDefs={colDefs}
          DataHandler={handleUsersRowData}
        />
        <RespTab
          colDefs={colDefs}
          filter={postNewFilter}
          filterIdentity='Computers'
          
          pageCount={Response?.pageCount} 
 itemsPerPage={itemsPerPage}
          
          data={handleUsersRowData(filteredList)}
          ItemsCount={Response?.itemsCount}
          sortingReq={postSort}
          setPageNum={setPageNum}
        />
      </div>
    </div>
  );
}

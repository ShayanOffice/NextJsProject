import { startTransition, useEffect, useState } from 'react';
import PopupWrapper from './PopupWrapper';
import PrepareForm from './PrepareForm';
import { RespTab } from './RespTab';
import SamaButton from './SamaButton';
import { useRouter } from 'next/router';
import { useSelector } from 'react-redux';
import toast from 'react-hot-toast';
import { useCleanFilterMutation } from '../app/samaRTKapi';
import { CSVComponent } from './CSVComponent';

export function LovForm(props) {
  const {
    addActionName,
    addDialogTitle,
    edtActionName,
    colDefs,
    edit,
    edtDialogTitle,
    filter,
    filterIdentity,
    formTitle,
    insert,
    insertingTemplate,
    ItemsCount,
    itemsPerPage,
    pageCount,
    pagingReq,
    remove,
    rmvActionName,
    rmvDialogTitle,
    List,
    sortingReq,
    setPageNum,
    getAllRecords,
    DataHandler,
  } = props;
  useCleanFilterMutation(); // جهت پاک کردن فیلتر
  const userProfile = useSelector((state) => state.userReducer.currentUser);
  const router = useRouter();

  const [showDialog, setShowDialog] = useState(false);
  const [query, setQuery] = useState('');
  const [formTemplate, setFormTemplate] = useState({
    Name: '',
    DialogTitle: '',
    form: <div />,
  });
  // eval('itm.' + ozv.replace(/(.*)\..*/, '$1'))[ozv.replace(/.*\.(.*)/, '$1')]

  const handleUsersRowData = (qry) => {
    const rowdata = qry?.map((row) => ({
      ...row,
      edit: (
        <div
          className='flex items-center justify-center border-none cursor-pointer bg-none'
          onClick={() => {
            setShowDialog(true);
            setFormTemplate({
              DialogTitle: edtDialogTitle,
              form: (
                <PrepareForm
                  colDef={colDefs}
                  selectedRow={List[row.ix]}
                  action={async (ds) => {
                    try {
                      const body = {
                        ...ds,
                        TheUser: userProfile.Id,
                        Summary: edtDialogTitle,
                        Agent: window.navigator.userAgent,
                      };
                      await edit(body).unwrap();
                      toast.success(`مورد انتخاب شده ویرایش شد.`);
                    } catch (err) {
                      toast.error(`مورد انتخاب شده ویرایش نشد.`);
                    }
                  }}
                  actionName={edtActionName}
                  setShowDialog={setShowDialog}
                />
              ),
            });
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
            setFormTemplate({
              Name: 'delete',
              DialogTitle:
                rmvDialogTitle.replace(/[a-zA-Z]/g, '') +
                ' ' +
                List[row.ix][rmvDialogTitle.replace(/[^a-zA-Z]/g, '')],
              form: (
                <PrepareForm
                  colDef={[]}
                  selectedRow={List[row.ix]}
                  action={async (dataState) => {
                    try {
                      const body = {
                        ...dataState,
                        TheUser: userProfile.Id,
                        Summary: rmvDialogTitle,
                        Agent: window.navigator.userAgent,
                      };
                      await remove(body).unwrap();
                      toast.success(`مورد انتخاب شده حذف شد.`);
                    } catch (err) {
                      toast.error(`مورد انتخاب شده حذف نشد.`);
                    }
                  }}
                  actionName={rmvActionName}
                  setShowDialog={setShowDialog}
                />
              ),
            });
          }}
        >
          <img alt='' src='/images/TrashCan.svg' width='30px' />
        </div>
      ),
    }));
    return rowdata;
  };

  return (
    <div
      dir='rtl'
      className='relative flex flex-col items-center justify-center w-full mt-0'
    >
      <PopupWrapper
        small={formTemplate.Name === 'delete'}
        showDialog={showDialog}
        setShowDialog={setShowDialog}
        DialogTitle={formTemplate.DialogTitle}
      >
        {formTemplate.form}
      </PopupWrapper>
      <div className='fixed z-50 flex items-center justify-between px-4 bg-[#ffffff88] rounded-full shadow-lg top-2 w-[35%] h-11 text-center'>
        {addDialogTitle && (
          <SamaButton
            Title='افزودن'
            btnText={addDialogTitle}
            btnClick={() => {
              setFormTemplate({
                Name: 'edit',
                DialogTitle: addDialogTitle,
                form: (
                  <PrepareForm
                    colDef={colDefs}
                    selectedRow={
                      userProfile.UserLevelId != 1 ? insertingTemplate : []
                    }
                    action={async (ds) => {
                      try {
                        console.log('ds:', ds);
                        const body = {
                          ...ds,
                          TheUser: userProfile.Id,
                          Summary: addDialogTitle,
                          Agent: window.navigator.userAgent,
                        };
                        await insert(body).unwrap();
                        toast.success(`مورد جدید افزوده شد.`);
                      } catch (err) {
                        toast.error(`مورد جدید اضافه نشد.`);
                      }
                    }}
                    actionName={addActionName}
                    setShowDialog={setShowDialog}
                  />
                ),
              });
              setShowDialog(true);
            }}
            txtColor='white'
            bgColor='blue'
            ikon='/images/PersonAdd.svg'
          />
        )}
        <CSVComponent
          formTitle={formTitle}
          getAllRecords={getAllRecords}
          colDefs={colDefs}
          DataHandler={DataHandler}
        />
        <span  className='w-full text-sm sm:text-md md:text-lg lg:text-xl text-slate-800'>
          {formTitle}
        </span>
        <SamaButton
          btnText='بازگشت'
          btnClick={() => router.back()}
          txtColor='slate'
          bgColor='stone'
          ikon='images/Return.svg'
        />
      </div>

      <RespTab
        colDefs={colDefs}
        filter={filter}
        filterIdentity={filterIdentity}
        pageCount={pageCount}
        pagingReq={pagingReq}
        setPageNum={setPageNum}
        sortingReq={sortingReq}
        data={handleUsersRowData(List)}
        ItemsCount={ItemsCount}
        itemsPerPage={itemsPerPage}
        getAllRecords={getAllRecords}
      />
    </div>
  );
}

import { useState } from 'react';
import PopupWrapper from './PopupWrapper';
import PrepareForm from './PrepareForm';
import { RespTab } from './RespTab';
import SamaButton from './SamaButton';
import { useRouter } from 'next/router';
import { useSelector } from 'react-redux';
import toast from 'react-hot-toast';

export function LovForm(props) {
  const {
    formTitle,
    addActionName,
    addDialogTitle,
    edtActionName,
    edtDialogTitle,
    rmvActionName,
    rmvDialogTitle,
    List,
    insert,
    edit,
    remove,
    colDefs,
  } = props;

  const userProfile = useSelector((state) => state.userReducer.currentUser);
  const router = useRouter();

  const [showDialog, setShowDialog] = useState(false);
  const [formTemplate, setFormTemplate] = useState({
    DialogTitle: '',
    form: <div />,
  });

  const handleUsersRowData = (qry) => {
    if (!qry) return [];
    const rowdata = qry.map((row, ix) => ({
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
                  selectedRow={List[ix]}
                  action={async (ds) => {
                    try {
                      const body = {
                        ...ds,
                        TheUser: userProfile.Id,
                        Summary: edtDialogTitle,
                        Agent: window.navigator.userAgent,
                      };
                      await edit(body);
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
              DialogTitle: rmvDialogTitle,
              form: (
                <PrepareForm
                  colDef={[]}
                  selectedRow={List[ix]}
                  action={async (dataState) => {
                    try {
                      const body = {
                        ...dataState,
                        TheUser: userProfile.Id,
                        Summary: rmvDialogTitle,
                        Agent: window.navigator.userAgent,
                      };
                      await remove(body);
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
    <div dir='rtl' className='w-full'>
      <div>
        <p className='text-slate-800'>
          <a className='text-2xl'>{formTitle}</a>
        </p>
      </div>
      <div className='grid grid-cols-4 shrink-0'>
        <PopupWrapper
          showDialog={showDialog}
          setShowDialog={setShowDialog}
          DialogTitle={formTemplate.DialogTitle}
        >
          {formTemplate.form}
        </PopupWrapper>
        <SamaButton
          btnText={addActionName}
          btnClick={() => {
            setFormTemplate({
              DialogTitle: addDialogTitle,
              form: (
                <PrepareForm
                  colDef={colDefs}
                  selectedRow={[]}
                  action={async (ds) => {
                    try {
                      const body = {
                        ...ds,
                        TheUser: userProfile.Id,
                        Summary: addDialogTitle,
                        Agent: window.navigator.userAgent,
                      };
                      await insert(body);
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
        <SamaButton
          btnText='بازگشت'
          btnClick={() => router.back()}
          txtColor='slate'
          bgColor='stone'
          ikon='images/Return.svg'
        />
      </div>
      <RespTab data={handleUsersRowData(List)} colDefs={colDefs} />
    </div>
  );
}

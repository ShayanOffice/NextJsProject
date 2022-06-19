import { Fragment, useRef, useState, useEffect } from 'react';
import { Dialog, Transition } from '@headlessui/react';

export default function ConfirmationForm(props) {
  /* This example requires Tailwind CSS v2.0+ */
  const [open, setOpen] = useState(props.showDialog);

  const cancelButtonRef = useRef(null);
  useEffect(() => {
    setOpen(props.showDialog);
  }, [props.showDialog]);

  return (
    <Transition.Root show={open} as={Fragment}>
      <Dialog
        as='div'
        className='fixed inset-0 z-10 overflow-y-auto'
        initialFocus={cancelButtonRef}
        onClose={(x) => {
          setOpen(x);
          props.setShowDialog(x);
        }}
      >
        <div className='flex items-end justify-center min-h-screen px-4 pt-4 pb-20 text-center sm:block sm:p-0'>
          <Transition.Child
            as={Fragment}
            enter='ease-out duration-300'
            enterFrom='opacity-0'
            enterTo='opacity-100'
            leave='ease-in duration-200'
            leaveFrom='opacity-100'
            leaveTo='opacity-0'
          >
            <Dialog.Overlay className='fixed inset-0 transition-opacity bg-gray-500 bg-opacity-75' />
          </Transition.Child>

          {/* This element is to trick the browser into centering the modal contents. */}
          <span
            className='hidden sm:inline-block sm:align-middle sm:h-screen'
            aria-hidden='true'
          >
            &#8203;
          </span>
          <Transition.Child
            as={Fragment}
            enter='ease-out duration-300'
            enterFrom='opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95'
            enterTo='opacity-100 translate-y-0 sm:scale-100'
            leave='ease-in duration-200'
            leaveFrom='opacity-100 translate-y-0 sm:scale-100'
            leaveTo='opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95'
          >
            <div className='relative inline-block overflow-hidden text-left align-bottom transition-all transform bg-white rounded-lg shadow-xl sm:my-8 sm:align-middle sm:max-w-lg sm:w-full'>
              <div className='px-4 pt-5 pb-4 bg-white sm:p-6 sm:pb-4'>
                <div className='sm:flex sm:items-start'>
                  <div className='mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left'>
                    <Dialog.Title
                      as='h3'
                      className='text-lg leading-6 text-gray-900'
                    >
                      {props.DialogTitle}
                    </Dialog.Title>
                    <div>
                      <p>{props.children}</p>
                    </div>
                  </div>
                </div>
              </div>
              <div className='px-4 py-3 bg-gray-50 sm:px-6 sm:flex sm:flex-row-reverse'>
                <button
                  type='button'
                  className='inline-flex justify-center w-full px-4 py-2 text-base text-white bg-red-600 border border-transparent rounded-md shadow-sm hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 sm:ml-3 sm:w-auto sm:text-sm'
                  onClick={() => {
                    setOpen(false);
                    props.setShowDialog(false);
                    props.action();
                  }}
                >
                  اجرا
                </button>
                <button
                  type='button'
                  className='inline-flex justify-center w-full px-4 py-2 mt-3 text-base text-gray-700 bg-white border border-gray-300 rounded-md shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm'
                  onClick={() => {
                    setOpen(false);
                    props.setShowDialog(false);
                  }}
                  ref={cancelButtonRef}
                >
                  انصراف
                </button>
              </div>
            </div>
          </Transition.Child>
        </div>
      </Dialog>
    </Transition.Root>
  );
}

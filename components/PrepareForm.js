import React, { useEffect, useState } from 'react';
import produce from 'immer';
import Combo from './Combo';
import Accordion from './Accordion';
import UpDownNumber from './UpDownNumber';
import OneLineForm from './OneLineForm';
import Validator from './Validator';

export default function PrepareForm(props) {
  const { action, actionName, colDef, selectedRow, setShowDialog } = props;
  const obj = selectedRow ? produce(selectedRow, (newer) => newer) : {};
  const [dataState, setDataState] = useState({ ...obj });
  const [pressedSubmitOnce, setPressedSubmitOnce] = useState(false);
  var validations = [];

  useEffect(() => {
    validations = [];
  }, []);

  const checkIsValid = () => {
    for (let i = 0; i < validations.length; i++) {
      const validation = validations[i];
      if (validation == false) return false;
    }
    return true;
  };

  console.log('DataState: ', colDef, dataState);
  const formsView = () =>
    colDef.map((item, ix) => {
      if (!item.hideInForms) {
        switch (item.type) {
          case 'text':
            return (
              <Validator
                key={ix}
                show={pressedSubmitOnce}
                validations={validations}
              >
                <div key={ix} className={` ${item.className} mx-1`}>
                  {item['headerName'] && (
                    <label
                      className={`block mb-2 text-sm font-bold text-gray-700 `}
                      htmlFor={item['field']}
                    >
                      {item['headerName'] + ':'}
                    </label>
                  )}
                  <input
                    onChange={(e) => {
                      setDataState((prev) =>
                        produce(prev, (newer) => {
                          newer[item['field']] = e.target.value;
                        })
                      );
                    }}
                    className='w-full px-3 py-2 leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline'
                    id={item['field']}
                    type={item['type']}
                    value={
                      dataState == {} || dataState === undefined
                        ? ''
                        : dataState[item['field']]
                    }
                    rules={item.rules}
                  />
                </div>
              </Validator>
            );
          case 'select':
            var getOptions = () => {
              const choises = item['choises'];
              return choises
                ? choises.map((choise) => {
                    const id = choise[item['optionSource'].replace(/.*\./, '')];
                    const val = item['optionTitle'].reduce(
                      (title, txt) =>
                        /:/.test(txt)
                          ? choise[txt.replace(/[^a-zA-Z]/g, '')]
                            ? title +
                              txt.replace(/[a-zA-Z]/g, '') +
                              choise[txt.replace(/[^a-zA-Z]/g, '')]
                            : title
                          : title + ' ' + choise[txt],
                      ''
                    );
                    return {
                      id,
                      val,
                    };
                  })
                : [];
            };

            return (
              <Validator
                key={ix}
                show={pressedSubmitOnce}
                validations={validations}
              >
                <div
                  className={`flex items-baseline justify-center w-full text-center ${item.className}`}
                >
                  {item['headerName'] && (
                    <label
                      className='flex justify-start w-1/3 mb-2 mr-8 text-sm font-bold text-right text-gray-700'
                      htmlFor={item['field']}
                    >
                      {item['headerName'] + ':'}
                    </label>
                  )}
                  <div className='flex justify-end w-full'>
                    <Combo
                      field={item['field']}
                      onChange={(value) => {
                        setDataState((prev) =>
                          optionSourceSetter(item, prev, value)
                        );
                      }}
                      value={
                        dataState && dataState != {}
                          ? optionSourceGetter(item, dataState)
                          : -1
                      }
                      optionsList={getOptions()}
                      rules={item.rules}
                    />
                  </div>
                </div>
              </Validator>
            );
          case 'count':
            return (
              <div key={ix} className={` ${item.className} mx-1`}>
                {item['headerName'] && (
                  <label
                    className={`block mb-2 text-sm font-bold text-gray-700 `}
                    htmlFor={item['field']}
                  >
                    {item['headerName'] + ':'}
                  </label>
                )}
                <UpDownNumber
                  value={1}
                  maxVal={8}
                  minVal={0}
                  step={1}
                  hideError
                  message=''
                  onChange={(value) => {
                    setDataState((prev) =>
                      produce(prev, (newer) => {
                        newer.Count = value;
                      })
                    );
                  }}
                />
              </div>
            );
          case 'form': {
            // console.log('selectedRow:', selectedRow);
            return (
              <div
                className={`flex justify-center w-full my-2 z-[${-ix}] ${
                  item.className && item.className
                } `}
              >
                <div className='w-full'>
                  <Accordion
                    Title={item['headerName'] && item['headerName'] + ':'}
                    addButton={colDef[ix].hasAddButton}
                    addAction={() => {
                      const defs = colDef[ix].colDefs;
                      let newRecord = {};
                      for (var i = 0; i < defs.length; i++) {
                        newRecord[defs[i].field] = undefined;
                      }
                      setDataState((prev) =>
                        produce(prev, (newer) => {
                          !newer[colDef[ix].field]
                            ? (newer[colDef[ix].field] = [newRecord])
                            : newer[colDef[ix].field].push(newRecord);
                        })
                      );
                    }}
                  >
                    {dataState[item['field']]?.map((formRow, jx) => (
                      <OneLineForm
                        key={jx}
                        colDef={colDef[ix].colDefs}
                        validations={validations}
                        pressedSubmitOnce={pressedSubmitOnce}
                        value={formRow}
                        onChange={(valueToSet) => {
                          setDataState((prev) => {
                            let objCopy = produce(prev, (newer) => {
                              newer[item['field']][jx] = valueToSet;
                            });
                            return objCopy;
                          });
                        }}
                        onDelete={() => {
                          setDataState((prev) => {
                            let objCopy = produce(prev, (newer) => {
                              newer[item['field']].splice(jx, 1);
                            });
                            return objCopy;
                          });
                        }}
                      />
                    ))}
                  </Accordion>
                </div>
              </div>
            );
          }
        }
      }
    });

  return (
    // <div className='flex justify-center w-full'>
    <form
      onSubmit={(e) => {
        e.preventDefault();
        // console.log('is valid:', checkIsValid());
        setPressedSubmitOnce(true);
        if (checkIsValid()) {
          action(dataState);
          setShowDialog && setShowDialog(false);
        } else {
          console.warn('Validation error count:', validations.length);
        }
      }}
      className={`w-full px-8 bg-white`}
    >
      {formsView()}
      {actionName && (
        <button
          type='submit'
          className='inline-flex justify-center w-full px-4 py-2 mt-4 text-base bg-indigo-500 border border-gray-800 rounded-md shadow-sm text-slate-300 hover:bg-indigo-700 hover:text-slate-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:ml-3 sm:w-auto sm:text-sm'
        >
          {actionName ? actionName : 'Ok'}
        </button>
      )}
    </form>
    // </div>
  );
}
function optionSourceSetter(colDefItem, previousData, valueToSet) {
  var obj;
  if (/\./.test(colDefItem['optionSource'])) {
    obj = produce(previousData, (newer) => {
      if (!newer) newer = {};
      const path = colDefItem['optionSource'];
      const pathArr = path.split('.');
      const finalNestedProp = pathArr.pop();
      if (finalNestedProp) {
        newer = pathArr.reduce((lastPos, prop) => {
          if (!lastPos[prop]) lastPos[prop] = {};
          return lastPos[prop];
        }, newer);
        newer[finalNestedProp] = valueToSet;
      }
    });
  } else {
    obj = produce(previousData, (newer) => {
      newer[colDefItem['optionSource']] = valueToSet;
    });
  }
  return obj;
}

function optionSourceGetter(colDefItem, dataState) {
  const evaled = eval(
    'dataState.' + colDefItem['optionSource'].replace(/(.*)(\.).*/, '$1')
  );

  return /\./.test(colDefItem['optionSource'])
    ? evaled && evaled[colDefItem['optionSource'].replace(/.*\./, '')]
    : dataState[colDefItem['optionSource']];
}

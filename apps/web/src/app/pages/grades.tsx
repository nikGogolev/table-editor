import React, { useEffect, useMemo, useRef, useState } from 'react';
import {
  add,
  deactivateAddPopup,
  getAddPopupState,
  getError,
  getGradesTable,
  resetError,
} from '../../features/gradesTable/gradesTableSlice';
import { setSelectedTable } from '../../features/table/tableSlice';
import MyPopup from '../components/my-popup/my-popup';
import { Navigate } from '../components/Navigate/Navigate';
import { Table } from '../components/Table/Table';
import { useAppDispatch, useAppSelector } from '../hooks';
import styles from './grades.module.scss';

interface GradesPagePropsType {
  allowEdit: boolean;
  allowNav: boolean;
  hideSpareRow: boolean;
}

export const GradesPage = ({
  allowEdit,
  allowNav,
  hideSpareRow,
}: GradesPagePropsType) => {
  const gradesTable = useAppSelector(getGradesTable);
  const dispatch = useAppDispatch();
  const ref = useRef(null);
  const addPopupState = useAppSelector(getAddPopupState);

  const [addButtonEnabled, setAddButtonEnabled] = useState(false);

  const checkAddButtonEnabled = () => {
    const refTarget: HTMLSelectElement =
      ref?.current as unknown as HTMLSelectElement;
    if (Boolean(refTarget?.value) && refTarget?.value !== '') {
      setAddButtonEnabled(true);
    } else {
      setAddButtonEnabled(false);
    }
  };

  const handlePopupAction = () => {
    const input: HTMLInputElement = ref.current as unknown as HTMLInputElement;
    if (input instanceof HTMLInputElement) {
      dispatch(add({ new: input.value }));
      dispatch(deactivateAddPopup());
    }
  };

  useEffect(() => {
    dispatch(setSelectedTable('grades'));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [gradesTable]);

  const mapData = useMemo(
    () => (hideSpareRow ? gradesTable.slice(0, -1) : gradesTable),
    [hideSpareRow, gradesTable]
  );

  const error = useAppSelector(getError);
  return (
    <>
      <Navigate allowNav={allowNav} />
      <Table
        tableData={mapData}
        allowEdit={allowEdit}
        tableHeader={['', 'Образование']}
      />
      {addPopupState && (
        <MyPopup
          header="Добавьте образование"
          mainText="Добавьте образование"
          action={handlePopupAction}
          close={() => {
            dispatch(deactivateAddPopup());
          }}
          buttonText="OK"
          buttonEnabled={addButtonEnabled}
        >
          <input
            type="text"
            ref={ref}
            onInput={() => {
              dispatch(resetError());
              checkAddButtonEnabled();
            }}
          />
        </MyPopup>
      )}
      <p className={styles['error-text']}>{error.message}</p>
    </>
  );
};

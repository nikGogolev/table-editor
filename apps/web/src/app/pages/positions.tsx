import React, { useEffect, useMemo, useRef, useState } from 'react';
import {
  add,
  deactivateAddPopup,
  getAddPopupState,
  getError,
  getPositionsTable,
  resetError,
} from '../../features/positionsTable/positionsTableSlice';
import { setSelectedTable } from '../../features/table/tableSlice';
import MyPopup from '../components/my-popup/my-popup';
import { Navigate } from '../components/Navigate/Navigate';
import { Table } from '../components/Table/Table';
import { useAppDispatch, useAppSelector } from '../hooks';
import styles from './positions.module.scss';

interface PositionsPagePropsType {
  allowEdit: boolean;
  allowNav: boolean;
  hideSpareRow: boolean;
}

export const PositionsPage = ({
  allowEdit,
  allowNav,
  hideSpareRow,
}: PositionsPagePropsType) => {
  const positionsTable = useAppSelector(getPositionsTable);
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

  const mapData = useMemo(
    () => (hideSpareRow ? positionsTable.slice(0, -1) : positionsTable),
    [hideSpareRow, positionsTable]
  );

  useEffect(() => {
    dispatch(setSelectedTable('positions'));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const error = useAppSelector(getError);
  return (
    <>
      <Navigate allowNav={allowNav} />
      <Table
        tableData={mapData}
        allowEdit={allowEdit}
        tableHeader={['', 'Должность']}
      />
      {addPopupState && (
        <MyPopup
          header="Добавьте должность"
          mainText="Добавьте должность"
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

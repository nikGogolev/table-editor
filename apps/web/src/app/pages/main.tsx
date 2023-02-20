import React, { useEffect, useRef, useState } from 'react';
import {
  add,
  deactivateAddPopup,
  getAddPopupState,
  getError,
  getEmployesTable,
} from '../../features/employesTable/employesTableSlice';
import { getGradesTable } from '../../features/gradesTable/gradesTableSlice';
import { getPositionsTable } from '../../features/positionsTable/positionsTableSlice';
import {
  getSelectedRow,
  setSelectedTable,
} from '../../features/table/tableSlice';
import MyPopup from '../components/my-popup/my-popup';
import { Navigate } from '../components/Navigate/Navigate';
import { Table } from '../components/Table/Table';
import { useAppDispatch, useAppSelector } from '../hooks';
import { GradesPage } from './grades';
import { PositionsPage } from './positions';
import styles from './main.module.scss';

interface MainPagePropsType {
  allowEdit: boolean;
  allowNav: boolean;
}

export const MainPage = ({ allowEdit, allowNav }: MainPagePropsType) => {
  const gradesTable = useAppSelector(getGradesTable);
  const positionsTable = useAppSelector(getPositionsTable);
  const employesTable = useAppSelector(getEmployesTable);
  const dispatch = useAppDispatch();
  const refName = useRef(null);
  const refPosition = useRef(null);
  const refGrade = useRef(null);
  const addPopupState = useAppSelector(getAddPopupState);
  const selectedRow = useAppSelector(getSelectedRow);
  const [editGradesPopupState, setEditGradesPopupState] = useState(false);
  const [addEmployeButtonEnabled, setAddEmployeButtonEnabled] = useState(false);
  const [editPositionsPopupState, setEditPositionsPopupState] = useState(false);

  const handlePopupAction = () => {
    const input: HTMLInputElement =
      refName.current as unknown as HTMLInputElement;
    const grade: HTMLSelectElement =
      refGrade.current as unknown as HTMLSelectElement;
    const position: HTMLSelectElement =
      refPosition.current as unknown as HTMLSelectElement;
    if (input instanceof HTMLInputElement) {
      dispatch(
        add({
          new: {
            name: input.value,
            gradeId: +grade.value,
            positionId: +position.value,
          },
        })
      );
      dispatch(deactivateAddPopup());
    }
  };

  const setGradeDefaultValue = () => {
    const grade: HTMLSelectElement =
      refGrade.current as unknown as HTMLSelectElement;
    grade.value = '1';
  };

  const setPositionDefaultValue = () => {
    const position: HTMLSelectElement =
      refPosition.current as unknown as HTMLSelectElement;
    position.value = '1';
  };

  useEffect(() => {
    dispatch(setSelectedTable('employes'));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [employesTable]);

  const error = useAppSelector(getError);

  const mapData = employesTable.map((emp) => {
    return {
      id: emp.id,
      name: emp.name,
      gradeId: gradesTable.find((item) => item.id === emp.gradeId)?.name,
      positionId: positionsTable.find((item) => item.id === emp.positionId)
        ?.name,
    };
  });

  const checkAddEmployeButtonEnabled = () => {
    const refGradeTarget: HTMLSelectElement =
      refGrade?.current as unknown as HTMLSelectElement;
    const refPositionTarget: HTMLSelectElement =
      refPosition?.current as unknown as HTMLSelectElement;
    const refNameTarget: HTMLSelectElement =
      refName?.current as unknown as HTMLSelectElement;
    if (
      Boolean(refGradeTarget?.value) &&
      refGradeTarget?.value !== '1' &&
      Boolean(refGradeTarget?.value) &&
      refPositionTarget?.value !== '1' &&
      Boolean(refNameTarget.value)
    ) {
      setAddEmployeButtonEnabled(true);
    } else {
      setAddEmployeButtonEnabled(false);
    }
  };

  return (
    <>
      <Navigate allowNav={allowNav} />
      <Table
        tableData={mapData}
        allowEdit={allowEdit}
        tableHeader={['', 'ФИО', 'Образование', 'Должность']}
      />
      {addPopupState && (
        <MyPopup
          header="Добавьте сотрудника"
          mainText="Добавьте сотрудника"
          action={handlePopupAction}
          close={() => dispatch(deactivateAddPopup())}
          buttonText="OK"
          buttonEnabled={addEmployeButtonEnabled}
        >
          <label htmlFor="name">Имя сотрудника</label>
          <input
            type="text"
            ref={refName}
            id="name"
            onInput={checkAddEmployeButtonEnabled}
          />
          <label htmlFor="grade">Образование</label>
          <div>
            <select
              name="grade"
              id="grade"
              ref={refGrade}
              defaultValue="1"
              onChange={checkAddEmployeButtonEnabled}
            >
              {gradesTable?.map((item) => (
                <option value={item?.id} key={item?.id}>
                  {item?.name}
                </option>
              ))}
            </select>
            <button onClick={() => setEditGradesPopupState(true)}>Edit</button>
            <button onClick={setGradeDefaultValue}>default</button>
          </div>

          <label htmlFor="position">Должность</label>
          <div>
            <select
              name="position"
              id="position"
              ref={refPosition}
              defaultValue="1"
              onChange={checkAddEmployeButtonEnabled}
            >
              {positionsTable?.map((item) => (
                <option value={item?.id} key={item?.id}>
                  {item?.name}
                </option>
              ))}
            </select>
            <button onClick={() => setEditPositionsPopupState(true)}>
              Edit
            </button>
            <button onClick={setPositionDefaultValue}>default</button>
          </div>
        </MyPopup>
      )}
      {editGradesPopupState && (
        <MyPopup
          header="Редактировать образование"
          mainText="Редактировать образование"
          action={() => {
            setEditGradesPopupState(false);
            const ref: HTMLSelectElement =
              refGrade.current as unknown as HTMLSelectElement;
            ref.value = String(gradesTable[selectedRow]?.id);
          }}
          close={() => {
            setEditGradesPopupState(false);
          }}
          buttonText="OK"
          buttonEnabled={
            Boolean(gradesTable[selectedRow]?.id) &&
            gradesTable[selectedRow]?.id !== 1
          }
        >
          <GradesPage allowEdit={true} allowNav={false} hideSpareRow={false} />
        </MyPopup>
      )}
      {editPositionsPopupState && (
        <MyPopup
          header="Редактировать должности"
          mainText="Редактировать должности"
          action={() => {
            setEditPositionsPopupState(false);
            const position: HTMLSelectElement =
              refPosition.current as unknown as HTMLSelectElement;
            position.value = String(positionsTable[selectedRow]?.id);
          }}
          close={() => {
            setEditPositionsPopupState(false);
          }}
          buttonText="OK"
          buttonEnabled={
            Boolean(positionsTable[selectedRow]?.id) &&
            positionsTable[selectedRow]?.id !== 1
          }
        >
          <PositionsPage
            allowEdit={true}
            allowNav={false}
            hideSpareRow={false}
          />
        </MyPopup>
      )}
      <p className={styles['error-text']}>{error.message}</p>
    </>
  );
};

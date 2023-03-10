import {
  activateAddPopup as activateGradesAddPopup,
  getGradesTable,
  getSelectedRow as getGradesSelectedRow,
  removeAsync as gradesRemove,
} from '../../../features/gradesTable/gradesTableSlice';
import {
  activateAddPopup as activatePositionsAddPopup,
  getPositionsTable,
  getSelectedRow as getPositionsSelectedRow,
  removeAsync as positionsRemove,
} from '../../../features/positionsTable/positionsTableSlice';
import {
  activateAddPopup as activateEmployesAddPopup,
  getEmployesTable,
  getSelectedRow as getEmployesSelectedRow,
  remove as employesRemove,
} from '../../../features/employesTable/employesTableSlice';
import React, { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../hooks';
import styles from './header.module.scss';
import {
  getSelectedRow,
  getSelectedTable,
} from '../../../features/table/tableSlice';

// eslint-disable-next-line @typescript-eslint/ban-types
export const Header = ({
  switchAllowEdit,
}: {
  switchAllowEdit: () => void;
}) => {
  const dispatch = useAppDispatch();
  const selectedTable = useAppSelector(getSelectedTable);
  const selectedRow = useAppSelector(getSelectedRow);
  const gradesTable = useAppSelector(getGradesTable);
  const positionsTable = useAppSelector(getPositionsTable);
  const employesTable = useAppSelector(getEmployesTable);
  const [removeBtnActive, setRemoveBtnActive] = useState(true);

  useEffect(() => {
    switch (selectedTable) {
      case 'grades':
        setRemoveBtnActive(gradesTable.length > 1);
        break;
      case 'positions':
        setRemoveBtnActive(positionsTable.length > 1);
        break;

      case 'employes':
        setRemoveBtnActive(employesTable.length > 0);
        break;
      default:
        break;
    }
  }, [gradesTable, positionsTable, selectedTable, employesTable]);

  const handleActivateAddPopup = () => {
    switch (selectedTable) {
      case 'grades':
        dispatch(activateGradesAddPopup());
        break;
      case 'positions':
        dispatch(activatePositionsAddPopup());
        break;
      case 'employes':
        dispatch(activateEmployesAddPopup());
        break;
      default:
        break;
    }
  };

  const handleDeleteRow = async () => {
    switch (selectedTable) {
      case 'grades':
        await dispatch(gradesRemove({ oldIndex: selectedRow }));
        //dispatch(gradesRemove({ oldIndex: selectedRow }));
        break;
      case 'positions':
        dispatch(positionsRemove({ oldIndex: selectedRow }));
        break;

      case 'employes':
        dispatch(employesRemove({ oldIndex: selectedRow }));
        break;

      default:
        break;
    }
  };
  return (
    <div className={styles['header-container']}>
      <button
        className={styles['header-button']}
        onClick={handleActivateAddPopup}
      >
        ????????????????
      </button>
      <button className={styles['header-button']} onClick={switchAllowEdit}>
        ??????????????????????????
      </button>
      <button
        className={styles['header-button']}
        onClick={handleDeleteRow}
        disabled={!removeBtnActive}
      >
        ??????????????
      </button>
    </div>
  );
};

import React, { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../hooks';
import {
  edit as gradesEdit,
  getError as getGradesError,
  getGradesTable,
  Grades,
  resetError as resetGradesError,
} from '../../../features/gradesTable/gradesTableSlice';
import {
  edit as positionsEdit,
  getError as getPositionsError,
  getPositionsTable,
  Positions,
  resetError as resetPositionsError,
} from '../../../features/positionsTable/positionsTableSlice';
import {
  edit as employesEdit,
  getError as getEmployesError,
  getEmployesTable,
  Employes,
  resetError as resetEmployesError,
} from '../../../features/employesTable/employesTableSlice';
import {
  getSelectedTable,
  setSelectedRow,
} from '../../../features/table/tableSlice';

export const TableCell = ({
  item,
  index,
  allowEdit,
  id,
}: {
  item: string;
  index: number;
  allowEdit: boolean;
  id: number;
}) => {
  const dispatch = useAppDispatch();
  const gradesError = useAppSelector(getGradesError);
  const gradesActVal = useAppSelector(getGradesTable);
  const positionsError = useAppSelector(getPositionsError);
  const positionsActVal = useAppSelector(getPositionsTable);
  const employesError = useAppSelector(getEmployesError);
  const employesActVal = useAppSelector(getEmployesTable);
  const [state, setState] = useState(item);
  const selectedtable = useAppSelector(getSelectedTable);

  type CellData = Grades;

  useEffect(() => {
    if (gradesError.state) {
      setState(gradesActVal[index]?.name);
    }

    if (positionsError.state) {
      setState(positionsActVal[index]?.name);
    }

    if (employesError.state) {
      setState(employesActVal[index]?.name);
    }
  }, [gradesError, positionsError, employesError, state]);

  const handleClick = () => {
    dispatch(setSelectedRow(index));
  };

  const handleEdit = () => {
    switch (selectedtable) {
      case 'grades':
        dispatch(gradesEdit({ new: state, oldIndex: index, id }));
        break;
      case 'positions':
        dispatch(positionsEdit({ new: state, oldIndex: index, id }));
        break;

      case 'employes':
        dispatch(employesEdit({ new: state, oldIndex: index, id }));
        break;
      default:
        break;
    }
  };
  return (
    <div className="table__cell">
      <input
        disabled={!allowEdit}
        value={state}
        onClick={handleClick}
        onChange={({ target }) => {
          dispatch(resetGradesError());
          dispatch(resetPositionsError());
          setState(target.value);
        }}
        type="text"
        onKeyDown={(e) => {
          if (e.key === 'Enter') {
            handleEdit();
          }
        }}
        // onBlur={(e) => {
        //   dispatch(edit({ new: state, oldIndex: index }));
        // }}
      />
    </div>
  );
};

import React from 'react';
import { Employes } from '../../../features/employesTable/employesTableSlice';
import { Grades } from '../../../features/gradesTable/gradesTableSlice';
import { Positions } from '../../../features/positionsTable/positionsTableSlice';
import { TableCell } from './TableCell';
import styles from './table.module.scss';

type RowData = Grades | Positions | Employes | string[];

export const TableRow = ({
  rowData,
  rowIndex,
  allowEdit,
}: {
  rowData: RowData;
  rowIndex: number;
  allowEdit: boolean;
}) => {
  const mapData = Object.values(rowData);

  return (
    <div className={styles['table__row']}>
      {mapData.map(
        (item, idx) =>
          (idx > 0 && idx <= 1 && (
            <TableCell
              key={item}
              item={item}
              index={rowIndex}
              allowEdit={allowEdit}
              id={mapData[0]}
            />
          )) ||
          (idx > 1 && (
            <TableCell
              key={item}
              item={item}
              index={rowIndex}
              allowEdit={false}
              id={mapData[0]}
            />
          ))
      )}
    </div>
  );
};

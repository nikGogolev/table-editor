import React from 'react';
import { TableCell } from './TableCell';
import styles from './table.module.scss';
import { EditCellPayload } from '../../app';

export const TableRow = ({
  rowData,
  rowIndex,
  allowEdit,
  editAction,
  changeAction,
  clickAction,
}: {
  rowData: object | string[];
  rowIndex: number;
  allowEdit: boolean;
  editAction?: (payload: EditCellPayload) => Promise<string>;
  changeAction?: () => void;
  clickAction?: (payload: number) => void;
}) => {
  let mapData = new Array<string>();
  if (typeof rowData === 'object') {
    mapData = Object.values(rowData);
  }
  if (Array.isArray(rowData)) {
    mapData = rowData;
  }

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
              id={+mapData[0]}
              editAction={editAction}
              changeAction={changeAction}
              clickAction={clickAction}
            />
          )) ||
          (idx > 1 && (
            <TableCell
              key={item}
              item={item}
              index={rowIndex}
              allowEdit={false}
              id={+mapData[0]}
            />
          ))
      )}
    </div>
  );
};

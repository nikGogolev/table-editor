import React from 'react';
import { EditCellPayload } from '../../app';
import { TableRow } from './TableRow';

export const Table = ({
  tableData,
  allowEdit,
  tableHeader,
  editAction,
  changeAction,
  clickAction,
}: {
  tableData: object[];
  allowEdit: boolean;
  tableHeader: string[];
  editAction?: (payload: EditCellPayload) => Promise<string>;
  changeAction?: () => void;
  clickAction?: (payload: number) => void;
}) => {
  return tableData ? (
    <div className="table">
      <TableRow rowData={tableHeader} rowIndex={-1} allowEdit={false} />

      {tableData.map((rowData, idx) => (
        <TableRow
          key={idx}
          rowData={rowData}
          rowIndex={idx}
          allowEdit={allowEdit}
          editAction={editAction}
          changeAction={changeAction}
          clickAction={clickAction}
        />
      ))}
    </div>
  ) : (
    <div>loading...</div>
  );
};

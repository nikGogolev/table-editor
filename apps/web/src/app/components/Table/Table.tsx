import React from 'react';
import { Employes } from '../../../features/employesTable/employesTableSlice';
import { Grades } from '../../../features/gradesTable/gradesTableSlice';
import { Positions } from '../../../features/positionsTable/positionsTableSlice';
import { TableRow } from './TableRow';

type TableData = Grades | Positions | Employes;

export const Table = ({
  tableData,
  allowEdit,
  tableHeader,
}: {
  tableData: Array<TableData>;
  allowEdit: boolean;
  tableHeader: string[];
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
        />
      ))}
    </div>
  ) : (
    <div>loading...</div>
  );
};

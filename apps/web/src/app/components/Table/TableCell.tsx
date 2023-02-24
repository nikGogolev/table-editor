import React, { useState } from 'react';

import { EditCellPayload } from '../../app';

export const TableCell = ({
  item,
  index,
  allowEdit,
  id,
  editAction,
  changeAction,
  clickAction,
}: {
  item: string;
  index: number;
  allowEdit: boolean;
  id: number;
  editAction?: (payload: EditCellPayload) => Promise<string>;
  changeAction?: () => void;
  clickAction?: (payload: number) => void;
}) => {
  const [state, setState] = useState(item);

  const handleClick = () => {
    if (clickAction instanceof Function) {
      clickAction(index);
    }
  };

  const handleEdit = async () => {
    if (editAction instanceof Function) {
      const result = await editAction({ new: state, oldIndex: index, id });
      setState(result);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (changeAction instanceof Function) {
      changeAction();
    }
    setState(e.target.value);
  };

  return (
    <div className="table__cell">
      <input
        disabled={!allowEdit}
        value={state}
        onClick={handleClick}
        onChange={handleChange}
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

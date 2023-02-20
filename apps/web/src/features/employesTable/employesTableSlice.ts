import { createSlice } from '@reduxjs/toolkit';
import { RootState } from '../../app/store';

export interface EmployesTablePayload {
  new: { id?: number; name: string; gradeId: number; positionId: number };
  oldIndex: number;
}

export interface EmployesTableEditPayload {
  new: string;
  oldIndex: number;
}

export interface Error {
  state: boolean;
  message: string;
}

export interface Employes {
  id: number;
  name: string;
  gradeId: number;
  positionId: number;
}

export const employesTableSlice = createSlice({
  name: 'employesTable',
  initialState: {
    table: new Array<Employes>(),
    error: { state: false, message: '' },
    addPopupIsActive: false,
    selectedRow: 9999999999,
  },
  reducers: {
    add: (state, action) => {
      const payload: EmployesTablePayload = action.payload;

      if (
        !state.table.find((item) => {
          return item.name === payload.new.name;
        })
      ) {
        state.table.unshift({
          id: +new Date(),
          name: payload.new.name,
          gradeId: payload.new.gradeId,
          positionId: payload.new.positionId,
        });
      } else {
        state.error.state = true;
        state.error.message = 'Такая сотрудник уже существует';
      }
    },
    edit: (state, action) => {
      const payload: EmployesTableEditPayload = action.payload;
      if (
        !state.table.find(
          (item, idx) => item.name === payload.new && idx !== payload.oldIndex
        )
      ) {
        state.table[payload.oldIndex].name = payload.new;
      } else {
        state.error.state = true;
        state.error.message = 'Такая сотрудник уже существует';
      }
    },
    remove: (state, action) => {
      const payload: EmployesTablePayload = action.payload;

      state.table.splice(payload.oldIndex, 1);
    },
    resetError: (state) => {
      state.error.state = false;
      state.error.message = '';
    },
    activateAddPopup: (state) => {
      state.addPopupIsActive = true;
    },
    deactivateAddPopup: (state) => {
      state.addPopupIsActive = false;
    },
    setSelectedRow: (state, action) => {
      state.selectedRow = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const {
  add,
  edit,
  remove,
  resetError,
  activateAddPopup,
  deactivateAddPopup,
  setSelectedRow,
} = employesTableSlice.actions;

export const getEmployesTable = (state: RootState): Array<Employes> => {
  return state.employesTable.table;
};

export const getError = (state: RootState): Error => {
  return state.employesTable.error;
};

export const getAddPopupState = (state: RootState): boolean => {
  return state.employesTable.addPopupIsActive;
};

export const getSelectedRow = (state: RootState): number => {
  return state.employesTable.selectedRow;
};

export default employesTableSlice.reducer;

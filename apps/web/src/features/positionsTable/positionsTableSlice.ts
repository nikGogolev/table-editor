import { createSlice } from '@reduxjs/toolkit';
import { RootState } from '../../app/store';

export interface PositionsTablePayload {
  new: string;
  oldIndex: number;
  id?: number;
}

export interface Error {
  state: boolean;
  message: string;
}

export interface Positions {
  id: number;
  name: string;
}

export const positionsTableSlice = createSlice({
  name: 'positionsTable',
  initialState: {
    table: new Array<Positions>({ id: 1, name: '(не выбрано)' }),
    error: { state: false, message: '' },
    addPopupIsActive: false,
    selectedRow: 9999999999,
  },
  reducers: {
    add: (state, action) => {
      const payload: PositionsTablePayload = action.payload;

      if (
        !state.table.find((item) => {
          return item.name === payload.new;
        })
      ) {
        state.table.unshift({ id: +new Date(), name: payload.new });
      } else {
        state.error.state = true;
        state.error.message = 'Такая должность уже существует';
      }
    },
    edit: (state, action) => {
      const payload: PositionsTablePayload = action.payload;
      if (payload.id !== 1) {
        if (
          !state.table.find(
            (item, idx) => item.name === payload.new && idx !== payload.oldIndex
          )
        ) {
          state.table[payload.oldIndex].name = payload.new;
        } else {
          state.error.state = true;
          state.error.message = 'Такая должность уже существует';
        }
      } else {
        if (
          !state.table.find((item) => {
            return item.name === payload.new;
          })
        ) {
          state.table.unshift({ id: +new Date(), name: payload.new });
        } else {
          state.error.state = true;
          state.error.message = 'Такая должность уже существует';
        }
      }
    },
    remove: (state, action) => {
      const payload: PositionsTablePayload = action.payload;

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
} = positionsTableSlice.actions;

export const getPositionsTable = (state: RootState): Array<Positions> => {
  return state.positionsTable.table;
};

export const getError = (state: RootState): Error => {
  return state.positionsTable.error;
};

export const getAddPopupState = (state: RootState): boolean => {
  return state.positionsTable.addPopupIsActive;
};

export const getSelectedRow = (state: RootState): number => {
  return state.positionsTable.selectedRow;
};

export default positionsTableSlice.reducer;

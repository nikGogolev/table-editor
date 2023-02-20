import { createSlice } from '@reduxjs/toolkit';
import { RootState } from '../../app/store';

export const tableSlice = createSlice({
  name: 'table',
  initialState: {
    selectedTable: '',
    selectedRow: 99999999,
  },
  reducers: {
    setSelectedTable: (state, action) => {
      const payload: string = action.payload;

      state.selectedTable = payload;
    },
    resetSelectedTable: (state) => {
      state.selectedTable = '';
    },
    setSelectedRow: (state, action) => {
      const payload: number = action.payload;

      state.selectedRow = payload;
    },
    resetSelectedRow: (state) => {
      state.selectedRow = 99999999;
    },
  },
});

export const {
  setSelectedTable,
  resetSelectedTable,
  setSelectedRow,
  resetSelectedRow,
} = tableSlice.actions;

export const getSelectedTable = (state: RootState) => {
  return state.table.selectedTable;
};

export const getSelectedRow = (state: RootState) => {
  return state.table.selectedRow;
};

export default tableSlice.reducer;

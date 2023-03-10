import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { RootState } from '../../app/store';

export interface GradesTablePayload {
  new?: string;
  oldIndex: number;
  id?: number;
}

export interface Error {
  state: boolean;
  message: string;
}

export interface Grades {
  id: number;
  name: string;
}

export const removeAsync = createAsyncThunk(
  'gradesTable/removeAsync',
  async (
    payload: GradesTablePayload,
    { dispatch, rejectWithValue, fulfillWithValue, getState }
  ) => {
    try {
      const state: RootState = getState() as unknown as RootState;
      if (
        state.employesTable.table.find(
          (item) =>
            item.gradeId === state.gradesTable.table[payload.oldIndex].id
        )
      ) {
        dispatch(
          setError(
            `Образование ${
              state.gradesTable.table[payload.oldIndex].name
            } используется в таблице сотрудников`
          )
        );
      } else {
        dispatch(remove(payload));
      }
    } catch (error) {
      console.log(error);
    }
  }
);

export const editAsync = createAsyncThunk(
  'gradesTable/editAsync',
  async (
    payload: GradesTablePayload,
    { dispatch, rejectWithValue, fulfillWithValue, getState }
  ) => {
    try {
      const state: RootState = getState() as unknown as RootState;
      if (payload.id !== 1) {
        if (
          !state.gradesTable.table.find(
            (item, idx) => item.name === payload.new && idx !== payload.oldIndex
          )
        ) {
          dispatch(edit(payload));
          return fulfillWithValue(payload.new);
        } else {
          dispatch(setError('Такое образование уже существует'));
          return rejectWithValue(
            state.gradesTable.table[payload.oldIndex].name
          );
        }
      } else {
        if (
          !state.gradesTable.table.find((item) => {
            return item.name === payload.new;
          })
        ) {
          dispatch(add(payload));
          return fulfillWithValue(payload.new);
        } else {
          dispatch(setError('Такое образование уже существует'));
          return rejectWithValue(
            state.gradesTable.table[payload.oldIndex].name
          );
        }
      }
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const gradesTableSlice = createSlice({
  name: 'gradesTable',
  initialState: {
    table: new Array<Grades>({ id: 1, name: '(не выбрано)' }),
    error: { state: false, message: '' },
    addPopupIsActive: false,
    selectedRow: 9999999999,
  },
  reducers: {
    add: (state, action) => {
      const payload: GradesTablePayload = action.payload;

      if (
        !state.table.find((item) => {
          return item.name === payload.new;
        })
      ) {
        state.table.unshift({ id: +new Date(), name: String(payload.new) });
      } else {
        state.error.state = true;
        state.error.message = 'Такое образование уже существует';
      }
    },
    edit: (state, action) => {
      const payload: GradesTablePayload = action.payload;

      state.table[payload.oldIndex].name = String(payload.new);
    },
    remove: (state, action) => {
      const payload: GradesTablePayload = action.payload;

      state.table.splice(payload.oldIndex, 1);
    },
    setError: (state, action) => {
      state.error.state = true;
      state.error.message = action.payload;
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
  setError,
  resetError,
  activateAddPopup,
  deactivateAddPopup,
  setSelectedRow,
} = gradesTableSlice.actions;

export const getGradesTable = (state: RootState): Array<Grades> => {
  return state.gradesTable.table;
};

export const getError = (state: RootState): Error => {
  return state.gradesTable.error;
};

export const getAddPopupState = (state: RootState): boolean => {
  return state.gradesTable.addPopupIsActive;
};

export const getSelectedRow = (state: RootState): number => {
  return state.gradesTable.selectedRow;
};

export default gradesTableSlice.reducer;

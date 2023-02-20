import { configureStore } from '@reduxjs/toolkit';
import { enableMapSet } from 'immer';
import gradesTableReducer from '../features/gradesTable/gradesTableSlice';
import positionsTableReducer from '../features/positionsTable/positionsTableSlice';
import tableReducer from '../features/table/tableSlice';
import employesTableReducer from '../features/employesTable/employesTableSlice';
enableMapSet();
export const store = configureStore({
  reducer: {
    gradesTable: gradesTableReducer,
    positionsTable: positionsTableReducer,
    table: tableReducer,
    employesTable: employesTableReducer,
  },
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;

import React, { useEffect, useRef, useState } from 'react';
import { Message } from '@table-editor/api-interfaces';
import {
  getError,
  getGradesTable,
  resetError,
} from '../features/gradesTable/gradesTableSlice';
import styles from './app.module.scss';
import { useSelector } from 'react-redux';
import { add, edit, remove } from '../features/gradesTable/gradesTableSlice';
import { useAppDispatch, useAppSelector } from './hooks';
import e from 'express';
import { Table } from './components/Table/Table';

import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { MainPage } from './pages/main';
import { GradesPage } from './pages/grades';
import { Header } from './components/Header/Header';
import { Navigate } from './components/Navigate/Navigate';
import { PositionsPage } from './pages/positions';
import MyPopup from './components/my-popup/my-popup';

export const App = () => {
  const [allowEdit, setAllowEdit] = useState<boolean>(false);
  const dispatch = useAppDispatch();
  const ref = useRef(null);

  const error = useAppSelector(getError);

  const switchAllowEdit = () => {
    setAllowEdit(!allowEdit);
  };

  const router = createBrowserRouter([
    {
      path: '/',
      element: <MainPage allowEdit={allowEdit} allowNav={true} />,
    },
    {
      path: '/positions',
      element: (
        <PositionsPage
          allowEdit={allowEdit}
          allowNav={true}
          hideSpareRow={true}
        />
      ),
    },
    {
      path: '/grades',
      element: (
        <GradesPage allowEdit={allowEdit} allowNav={true} hideSpareRow={true} />
      ),
    },
  ]);
  return (
    <div className={styles['main-container']}>
      <Header switchAllowEdit={switchAllowEdit} />

      <RouterProvider router={router} />
    </div>
  );
};

export default App;

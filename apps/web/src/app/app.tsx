import React, { useState } from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';

import { Header } from './components/Header/Header';
import { MainPage } from './pages/main';
import { GradesPage } from './pages/grades';
import { PositionsPage } from './pages/positions';
import styles from './app.module.scss';

export interface EditCellPayload {
  new: string;
  oldIndex: number;
  id: number;
}

export const App = () => {
  const [allowEdit, setAllowEdit] = useState<boolean>(false);

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

import React from 'react';
import { Link, NavLink } from 'react-router-dom';

import styles from './navigate.module.scss';

interface NavPropsType {
  allowNav: boolean;
}

export const Navigate = ({ allowNav }: NavPropsType) => {
  return (
    <>
      {allowNav && (
        <div className={styles['navigate-container']}>
          <NavLink
            className={({ isActive, isPending }) => {
              return isActive
                ? 'navigate-link active'
                : isPending
                ? 'pending'
                : 'navigate-link';
            }}
            to="/"
          >
            Сотрудники
          </NavLink>
          <NavLink
            className={({ isActive, isPending }) => {
              return isActive
                ? 'navigate-link active'
                : isPending
                ? 'pending'
                : 'navigate-link';
            }}
            to="/positions"
          >
            Должности
          </NavLink>
          <NavLink
            className={({ isActive, isPending }) => {
              return isActive
                ? 'navigate-link active'
                : isPending
                ? 'pending'
                : 'navigate-link';
            }}
            to="/grades"
          >
            Образование
          </NavLink>
        </div>
      )}
    </>
  );
};

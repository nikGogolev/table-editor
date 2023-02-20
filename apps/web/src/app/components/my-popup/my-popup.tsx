import { ReactNode } from 'react';

import styles from './my-popup.module.scss';

/* eslint-disable-next-line */
export interface MyPopupProps {
  header: string;
  mainText: string;
  buttonText: string;
  children: ReactNode;
  buttonEnabled: boolean;
  action: () => void;
  close: () => void;
}

export function MyPopup(props: MyPopupProps) {
  const clickHandler = () => {
    props.action();
  };
  return (
    <div className={styles['container']}>
      <div
        className={styles['modal_backdrop']}
        onClick={(e) => {
          e.stopPropagation();
          props.close();
        }}
      >
        <div
          className={styles['modal']}
          onClick={(e) => {
            e.stopPropagation();
          }}
        >
          <header className={styles['modal_header']}>{props.header}</header>
          <div className={styles['modal_text']}>{props.mainText}</div>
          {props.children}
          <button
            type="button"
            onClick={clickHandler}
            disabled={!props.buttonEnabled}
          >
            {props.buttonText}
          </button>
        </div>
      </div>
    </div>
  );
}

export default MyPopup;

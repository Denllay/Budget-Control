import React from 'react';
import styles from './PreLoader.module.scss';
import CSS from 'csstype';
interface IProps {
  preloaderStatus: TpreloaderStatus;
}
type TpreloaderStatus = 'budget' | 'nav';
interface IStyles {
  [key: string]: CSS.Properties;
}
export const PreLoader: React.FC<IProps> = ({ preloaderStatus }) => {
  const style: IStyles = {
    nav: {
      position: 'relative',
      margin: ' 0px 100px 0px 0px',
      width: '120px',
      height: '30px',
      borderRadius: '5px',
      background: '#282d3c',
    },
    budget: {
      position: 'relative',
      width: '120px',
      height: '30px',
      borderRadius: '5px',
      marginTop: '5%',
      background: '#535763',
    },
  };
  return (
    <div style={style[preloaderStatus]}>
      <div className={styles.loader}></div>
    </div>
  );
};

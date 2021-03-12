import React, { Dispatch, SetStateAction, useState } from 'react';
import { SketchPicker } from 'react-color';
import styles from './AddCategoryColor.module.scss';
interface IProps {
  color: string;
  setColor: Dispatch<SetStateAction<string>>;
}
export const AddCategoryColor: React.FC<IProps> = ({ setColor, color }) => {
  const [displayColor, setDisplayColor] = useState(false);
  const onChangeColor = ({ hex }: { hex: string }) => {
    setColor(hex);
  };
  return (
    <>
      <div
        className={styles.background_color}
        style={{ background: color }}
        onClick={() => setDisplayColor((prev) => !prev)}
      />
      {displayColor && (
        <>
          <div className={styles.cover} onClick={() => setDisplayColor(false)} />
          <SketchPicker className={styles.select_color} color={color} onChange={onChangeColor} />
        </>
      )}
    </>
  );
};

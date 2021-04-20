import React, { Dispatch, SetStateAction, useEffect, useState } from 'react';
import { SketchPicker } from 'react-color';
import styles from './CategoryColorPick.module.scss';
interface IProps {
  color: string;
  setColor: Dispatch<SetStateAction<string>>;
}
export const CategoryColorPick: React.FC<IProps> = ({ setColor, color }) => {
  const [displayColor, setDisplayColor] = useState(false);
  const onChangeColor = ({ hex }: { hex: string }) => {
    setColor(hex);
  };
  const onTargetDisplayColor = (e: React.MouseEvent<HTMLDivElement>) => {
    e.stopPropagation();
    setDisplayColor((prev) => !prev);
  };

  useEffect(() => {
    const closeDisplayColor = () => setDisplayColor(false);
    window.addEventListener('click', closeDisplayColor);
    return () => {
      window.removeEventListener('click', closeDisplayColor);
    };
  }, [displayColor]);

  return (
    <>
      <div className={styles.background_color} style={{ background: color }} onClick={onTargetDisplayColor} />
      {displayColor && (
        <>
          <div onClick={(e: React.MouseEvent<HTMLDivElement>) => e.stopPropagation()}>
            <SketchPicker className={styles.select_color} color={color} onChange={onChangeColor} />
          </div>
        </>
      )}
    </>
  );
};

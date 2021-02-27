import { BudgetColorContext } from '@/context/BudgetColorContext';
import React, { useContext } from 'react';
import { SketchPicker } from 'react-color';
import styles from './ColorBlock.module.scss';
interface IProps {
  color: string;
  onChangeColor({ hex }: { hex: string }): void;
}
export const ColorBlock: React.FC<IProps> = ({ onChangeColor, color }) => {
  const { displayColor, setDisplayColor } = useContext(BudgetColorContext);

  return (
    <>
      <div
        className={styles.background_color}
        style={{ background: color }}
        onClick={() => setDisplayColor((prev) => !prev)}
        data-id="show_color_block"
      />
      {displayColor ? <SketchPicker className={styles.select_color} color={color} onChange={onChangeColor} /> : null}
    </>
  );
};

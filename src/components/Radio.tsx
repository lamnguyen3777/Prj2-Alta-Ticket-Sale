import React, { useEffect } from "react";

type Props = {
  name: string;
  id: string;
  text: string;
  value: string | number;
  onChecked: (checkType: number) => void;
  isChecked: boolean;
};



const Radio = ({ name, id, text, value, onChecked, isChecked }: Props) => {
  return (
    <label htmlFor={id} className="label__radio">
      <input
        type="radio"
        className="raxch"
        value={value}
        id={id}
        name={name}
        hidden
        onChange={(e) => onChecked(Number(e.target.value))}
        checked={isChecked}  
      />
      <div className="radio">
        <div className="radio__check"></div>
      </div>
      <span className="text__radio">{text}</span>
    </label>
  );
};

export default Radio;

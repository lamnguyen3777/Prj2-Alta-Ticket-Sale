import React from "react";

type Props = {
  id: string;
  value: string;
  text: string;
  isChecked: boolean;
  onChecked: (value: string) => void
};

const Checkbox = ({ id, value, isChecked, text, onChecked }: Props) => {
  return (
    <label htmlFor={id} className="label__checkbox">
      <input
        type="checkbox"
        className="raxch"
        value={value}
        id={id}
        hidden
        onChange={(e) => onChecked(e.target.value)}
        checked={isChecked}
      />
      <div className="checkbox">
        <div className="checkbox__check">
          <i className="bx bx-check"></i>
        </div>
      </div>
      <span className="text__checkbox">{text}</span>
    </label>
  );
};

export default Checkbox;

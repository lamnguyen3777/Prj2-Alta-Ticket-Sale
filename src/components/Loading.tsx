import React from "react";
import { useSelector } from "react-redux";
import { RootState } from "../store";

type Props = {};

const Loading = (props: Props) => {
  const crudLoading = useSelector((state: RootState) => state.crud.isLoading);

  if (!crudLoading) {
    return <></>;
  }
  return (
    <div className="loading__container">
      <div className="loading">
        <span></span>
        <span></span>
        <span></span>
      </div>
    </div>
  );
};

export default Loading;

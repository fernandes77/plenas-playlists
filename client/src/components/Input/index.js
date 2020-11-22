import React from 'react';
import './styles.css';

const Input = (props) => {
  return (
    <div className="input-block">
      <label htmlFor={props.name}>{props.label}</label>
      <input type="text" id={props.name} onChange={props.onChange} />
    </div>
  );
};

export default Input;

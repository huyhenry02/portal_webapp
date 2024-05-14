import React from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import './input-date.css';

const InputDate = props => {
  return (
    <div className="dateContainer">
      <span className="dateInput">
        {' '}
        <DatePicker {...props} />
      </span>
      <span className="icon">
        <i className="ki-outline ki-calendar fs-1"></i>
      </span>
    </div>
  );
};

export default InputDate;

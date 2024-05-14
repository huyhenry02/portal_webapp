import React, { useState } from 'react';

type IFormInput = {
  label?: string;
  disabled?: boolean;
  value?: string;
  placeholder?: string;
  inputClass?: string;
  parentClass?: string;
};

const FormInput: React.FC<IFormInput> = ({
  label,
  disabled,
  value,
  placeholder,
  inputClass,
  parentClass,
}) => {
  const [valueInput, setValueInput] = useState(value);

  const handleInput = e => {
    setValueInput(e.target.value);
  };

  return (
    <div className={parentClass ?? 'col-md-6 fv-row'}>
      <label className="fs-6 fw-semibold mb-2">{label}</label>
      <input
        type="text"
        className={inputClass ?? 'form-control form-control-solid'}
        placeholder={placeholder}
        value={valueInput}
        disabled={disabled}
        onChange={handleInput}
      />
      <div className="fv-plugins-message-container fv-plugins-message-container--enabled invalid-feedback">
        <div data-field="name" data-validator="notEmpty">
          API name is required
        </div>
      </div>
    </div>
  );
};

export default FormInput;

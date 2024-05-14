import React from 'react';
import zxcvbn from 'zxcvbn';
import { get } from 'lodash';
import { translate } from '../../../translates/translate';

const PasswordStrengthMeter = ({ newPassword }) => {
  const testResult = zxcvbn(newPassword);
  const num = (testResult.score * 100) / 3;
  const objectResult = {
    0: { label: translate('veryWeak'), color: '#828282' },
    1: { label: translate('weak'), color: '#EA1111' },
    2: { label: translate('medium'), color: '#FFAD00' },
    3: { label: translate('veryGood'), color: '#50cd89' },
  };

  const label = get(objectResult, `${testResult.score}.label`, '');
  const color = get(objectResult, `${testResult.score}.color`, '');

  return (
    <>
      <div className="progress" style={{ height: '7px' }}>
        <div
          className="progress-bar"
          style={{
            width: `${num}%`,
            background: color,
            height: '7px',
          }}
        ></div>
      </div>
      <p style={{ color }}>{label}</p>
    </>
  );
};

export default PasswordStrengthMeter;

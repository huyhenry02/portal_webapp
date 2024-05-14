import { isArray } from 'lodash';
import moment from 'moment';

type IRule =
  | 'nullable'
  | 'required'
  | 'min'
  | 'max'
  | 'in'
  | 'email'
  | 'phoneNumber'
  | 'identification'
  | 'startDateBeforeEndDate';

type IRules = {
  [k: string]: {
    key: IRule;
    message?: string;
    value?: ITypeValue;
  }[];
};

type IErrors = {
  [k: string]: string;
};

type IDataNeedValidate = {
  [k: string]: ITypeValue;
};

type IStartAndEndDate = {
  startDate: Date;
  endDate: Date;
};

type ITypeValue = string | number | unknown[] | null | undefined;

class Validation {
  public errors: IErrors = {};
  public rules: IRules;
  public isValid: boolean = false;

  /**
   * ex rules: { password: [{key: 'required'}, {key: 'min', value: 5}, ...] }
   * @param rules
   */
  constructor(rules: IRules) {
    this.initial();
    this.rules = rules;
  }

  public initial() {
    this.errors = {};
    this.isValid = true;
  }

  /**
   * ex data: { password: 123456, username: 123456 }
   */
  public validate(data: IDataNeedValidate) {
    if (!Object.keys(this.rules).length) {
      return {
        isValid: this.isValid,
        errors: this.errors,
      };
    }

    for (const key in this.rules) {
      const rules = this.rules[key];
      if (rules && rules.length) {
        if (rules.find(rule => rule.key === 'nullable') && !data[key]) {
          continue;
        }
        rules.forEach(rule => {
          const nameMethodValidate = `validate${
            rule.key[0].toUpperCase() + rule.key.slice(1)
          }`;
          const { isValid, message } = this[nameMethodValidate](
            data[key],
            rule.value,
            key,
            rule.message,
          );
          if (!isValid && this.isValid) {
            this.isValid = isValid;
          }
          if (!isValid && message) {
            this.errors[key] = message;
            return;
          }
        });
      }
    }
    return { isValid: this.isValid, errors: this.errors };
  }

  public validateStartDateBeforeEndDate(
    value: IStartAndEndDate[],
    valueInRule: ITypeValue,
    field: string,
    msg: string,
  ) {
    let isValid = true;
    let message = '';
    if (isArray(value)) {
      value.map(item => {
        if (moment(item?.startDate) > moment(item?.endDate)) {
          message = msg;
          isValid = false;
        }
      });
    }
    return { isValid, message };
  }

  public validateNullable() {
    return { isValid: true, message: '' };
  }

  public validateRequired(
    value: ITypeValue,
    valueInRule: ITypeValue,
    field: string,
    msg?: string,
  ) {
    let isValid = true;
    let message = `The ${field} field is required.`;
    if (!value || (typeof value === 'object' && !value.length)) {
      isValid = false;
      if (msg) {
        message = msg;
      }
    } else {
      message = '';
    }

    return { isValid, message };
  }

  public validateMin(
    value: ITypeValue,
    valueInRule: ITypeValue,
    field: string,
    msg?: string,
  ) {
    let isValid = true;
    let message = '';
    if (typeof value === 'string' && typeof valueInRule === 'string') {
      message = `The ${field} must be at least ${valueInRule}`;
      if (value.length < parseInt(valueInRule)) {
        isValid = false;
        if (msg) {
          message = msg;
        }
      } else {
        message = '';
      }
    } else if (typeof value === 'number' && typeof valueInRule === 'number') {
      message = `The ${field} must be at least ${valueInRule}`;
      if (value < valueInRule) {
        isValid = false;
        if (msg) {
          message = msg;
        }
      } else {
        message = '';
      }
    } else if (Array.isArray(value) && Array.isArray(valueInRule)) {
      message = `The ${field} must have at least ${valueInRule} items.`;
      if (value.length < valueInRule.length) {
        isValid = false;
        if (msg) {
          message = msg;
        }
      } else {
        message = '';
      }
    } else {
      isValid = false;
      message = 'Data invalid';
    }

    return { isValid, message };
  }

  public validateMax(
    value: ITypeValue,
    valueInRule: ITypeValue,
    field: string,
    msg?: string,
  ) {
    let isValid = true;
    let message = '';
    if (typeof value === 'string' && typeof valueInRule === 'string') {
      message = `The ${field} may not be greater than ${valueInRule} characters.`;
      if (value.length > valueInRule.length) {
        isValid = false;
        if (msg) {
          message = msg;
        }
      } else {
        message = '';
      }
    } else if (typeof value === 'number' && typeof valueInRule === 'number') {
      message = `The ${field} may not be greater than ${valueInRule}.`;
      if (value > valueInRule) {
        isValid = false;
        if (msg) {
          message = msg;
        }
      } else {
        message = '';
      }
    } else if (Array.isArray(value) && Array.isArray(valueInRule)) {
      message = `The ${field} may not have more than ${valueInRule} items.`;
      if (value.length > valueInRule.length) {
        isValid = false;
        if (msg) {
          message = msg;
        }
      } else {
        message = '';
      }
    } else {
      isValid = false;
      message = 'Data invalid';
    }

    return { isValid, message };
  }

  public validateIn(
    value: ITypeValue,
    valueInRule: ITypeValue,
    field: string,
    msg?: string,
  ) {
    let isValid = true;
    let message = '';
    if (Array.isArray(valueInRule)) {
      message = `The ${field} field does not exist in ${valueInRule.toString()}.`;
      if (!valueInRule.includes(value)) {
        isValid = false;
        if (msg) {
          message = msg;
        }
      } else {
        message = '';
      }
    } else {
      isValid = false;
      message = 'Data invalid';
    }

    return { isValid, message };
  }

  public validateEmail(
    value: ITypeValue,
    valueInRule: ITypeValue,
    field: string,
    msg?: string,
  ) {
    let isValid = true;
    let message = '';
    const validRegex = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/;
    const emailData = typeof value === 'string' ? value : value?.toString();
    if (!emailData || !emailData.match(validRegex)) {
      isValid = false;
      message = `The ${field} must be a valid email address.`;
      if (msg) {
        message = msg;
      }
    }

    return { isValid, message };
  }

  public validateIdentification(
    value: ITypeValue,
    valueInRule: ITypeValue,
    field: string,
    msg?: string,
  ) {
    let isValid = true;
    let message = '';
    const patternRegex = /^\d{9,12}$/;
    const numberPersonCard =
      typeof value === 'string' ? value : value?.toString();
    if (!numberPersonCard || !numberPersonCard.match(patternRegex)) {
      isValid = false;
      message = `Số CCCD không hợp lệ.`;
      if (msg) {
        message = msg;
      }
    }
    return { isValid, message };
  }

  public validatePhoneNumber(
    value: ITypeValue,
    valueInRule: ITypeValue,
    field: string,
    msg?: string,
  ) {
    let isValid = true;
    let message = '';
    const patternRegex = /^0[0-9]{9}$/;
    const phoneNumber = typeof value === 'string' ? value : value?.toString();
    if (!phoneNumber || !phoneNumber.match(patternRegex)) {
      isValid = false;
      message = `Số điện thoại không hợp lệ.`;
      if (msg) {
        message = msg;
      }
    }
    return { isValid, message };
  }
}

export default Validation;

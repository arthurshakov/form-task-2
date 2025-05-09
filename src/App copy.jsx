import * as yup from 'yup';
import styles from './app.module.css';
import { useStore } from './hooks/useStore';
import { useRef } from 'react';
import { useForm } from 'react-hook-form';

const emailRegExp = /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/;
const passwordRegExp = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;

const emailSchema = yup
  .string()
  .min(1, 'Поле "Email" должно быть заполнено')
  // .matches(/^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/, 'Неверный формат email')
  .email('Неверный формат email')
;

const passwordSchema = yup
  .string()
  .min(1, 'Поле "Пароль" должно быть заполнено')
  .matches(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/, 'Пароль должен: содержать не менее 8 символов; состоять только из латинских букв и чисел; и содержать хотя бы одну букву и хотя бы одно число.')
;

const password2Schema = yup
  .string()
  .min(1, 'Поле "Пароль" должно быть заполнено')
  .matches(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/, 'Пароль должен: содержать не менее 8 символов; состоять только из латинских букв и чисел; и содержать хотя бы одну букву и хотя бы одно число.')
;

const validateAndGetErrorMessage = (schema, value) => {
  let errorMessage = null;

  try {
    schema.validateSync(value, { abortEarly: false });
  } catch ({errors}) {
    errorMessage = errors.join('\n');
  }

  return errorMessage;
}

const errorParams = {
  email: {
    isValid: value => emailRegExp.test(value),
    emptyError: 'Поле "Email" должно быть заполнено',
    formatError: 'Неверный формат email',
  },
  password: {
    isValid: value => passwordRegExp.test(value),
    emptyError: 'Поле "Пароль" должно быть заполнено',
    formatError: 'Пароль должен: содержать не менее 8 символов; состоять только из латинских букв и чисел; и содержать хотя бы одну букву и хотя бы одно число.',
  },
  password2: {
    isValid: (value, valueToCompareTo) => value === valueToCompareTo,
    emptyError: 'Поле "Повторите пароль" должно быть заполнено',
    formatError: 'Второй пароль не совпадает с первым',
  },
}

function sendFormData(formData) {
  console.dir(formData);
}

export const AppContainer = () => {



  const { getState, updateState, getErrors, updateErrors } = useStore();
  const { email, password, password2 } = getState();
  const formIsValid = Object.values(getErrors()).every(value => value === '');
  const submitButtonRef = useRef(null);

  const onSubmit = (event) => {
    event.preventDefault();
    console.log('submitting');

    formIsValid && sendFormData(getState());
  };

  const testField = (value, fieldName, condition) => {
    let error = '';

    if (value === '') {
      error = errorParams[fieldName].emptyError;
    } else if (!condition) {
      error = errorParams[fieldName].formatError;
    }

    updateErrors(fieldName, error);
  };

  const onChange = ({ target }) => {
    updateState(target.name, target.value);

    let schema = null;

    switch (target.name) {
      case 'email':
        schema = emailSchema;
        break;
      case 'password':
        schema = passwordSchema;
        break;
      case 'password2':
        schema = password2Schema;
        break;
    }

    // if (target.name === 'password2') {
    //   condition = errorParams[target.name].isValid(target.value, password);
    // } else {
    //   condition = errorParams[target.name].isValid(target.value);
    // }

    // testField(target.value, target.name, condition);

    const error = validateAndGetErrorMessage(schema, target.value);
    console.log(error);
  };

  const onBlur = () => {
    if (formIsValid) {
      submitButtonRef.current.focus();
    }
  };

  return (
    <form className={styles.form} onSubmit={onSubmit} noValidate>
      {/* showing errors if there are such */}
      <div className={styles.error__block}>
        { Object.entries(getErrors()).map(([id, value]) =>
          value && <div className={styles.error} key={id}>{ value }</div>
        )}
      </div>

      <input
        type="email"
        name="email"
        value={ email }
        placeholder="Email"
        className={styles['form-control']}
        onChange={ onChange }
        onBlur={ onBlur }
      />

      <input
        type="password"
        name="password"
        value={ password }
        placeholder="Пароль"
        className={styles['form-control']}
        onChange={ onChange }
        onBlur={ onBlur }
        />

      <input
        type="password"
        name="password2"
        value={ password2 }
        placeholder="Повтор пароля"
        className={styles['form-control']}
        onChange={ onChange }
        onBlur={ onBlur }
      />

      <button
        type="submit"
        className={styles.button}
        disabled={!formIsValid}
        ref={submitButtonRef}
      >Зарегистрироваться</button>
    </form>
  )
};

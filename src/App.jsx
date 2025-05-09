import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import styles from './app.module.css';
import { useRef } from 'react';
import { useForm } from 'react-hook-form';

const schema = yup.object({
  email: yup
    .string()
    .required('Поле "Email" должно быть заполнено')
    // .matches(/^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/, 'Неверный формат email')
    .email('Неверный формат email'),
  password: yup
    .string()
    .required('Поле "Пароль" должно быть заполнено')
    .matches(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/, 'Пароль должен: содержать не менее 8 символов; состоять только из латинских букв и чисел; и содержать хотя бы одну букву и хотя бы одно число.'),
  password2: yup
    .string()
    .required('Поле "Повтор пароля" должно быть заполнено')
    .oneOf([yup.ref('password'), null], 'Пароли должны совпадать')
});

let submittedOnce = false;

export const App = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      email: '',
      password: '',
      password2: '',
    },
    resolver: yupResolver(schema),
  });

  let submitButtonRef = useRef(null);

  const emailError = errors.email?.message;
  const passwordError = errors.password?.message;
  const password2Error = errors.password2?.message;

  const onSubmit = (formData) => {
    console.log(formData);
  };

  const onBlur = () => {
    if (submittedOnce && !Object.keys(errors).length) {
      submitButtonRef.current.focus();
    }
  }

  return (
    <form className={ styles.form } onSubmit={ handleSubmit(onSubmit) } noValidate>
      {/* showing errors if there are such */}
      <div className={styles.error__block}>
        { emailError && <div className={styles.error}>{ emailError }</div> }
        { passwordError && <div className={styles.error}>{ passwordError }</div> }
        { password2Error && <div className={styles.error}>{ password2Error }</div> }
      </div>

      <input
        type="email"
        name="email"
        placeholder="Email"
        className={styles['form-control']}
        // {...register('email', emailProps)}
        {...register('email', {onBlur})}
      />

      <input
        type="password"
        name="password"
        placeholder="Пароль"
        className={styles['form-control']}
        {...register('password', {onBlur})}
        />

      <input
        type="password"
        name="password2"
        placeholder="Повтор пароля"
        className={styles['form-control']}
        onClick={() => console.log('clicking')}
        {...register('password2', {onBlur})}
      />

      <button
        type="submit"
        className={styles.button}
        disabled={Object.keys(errors).length}
        ref={submitButtonRef}
        onClick={() => submittedOnce = true}
      >Зарегистрироваться</button>
    </form>
  )
};

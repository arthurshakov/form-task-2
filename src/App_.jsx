import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import styles from './app.module.css';
import { useRef } from 'react';
import { useForm } from 'react-hook-form';

const emailRegExp = /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/;
const passwordRegExp = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;

const schema = yup.object({
  email: yup
    .string()
    .min(1, 'Поле "Email" должно быть заполнено')
    // .matches(/^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/, 'Неверный формат email')
    .email('Неверный формат email'),
  password: yup
    .string()
    .min(1, 'Поле "Пароль" должно быть заполнено')
    .matches(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/, 'Пароль должен: содержать не менее 8 символов; состоять только из латинских букв и чисел; и содержать хотя бы одну букву и хотя бы одно число.'),
  password2: yup
    .string()
    .min(1, 'Поле "Пароль" должно быть заполнено')
    .matches(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/, 'Пароль должен: содержать не менее 8 символов; состоять только из латинских букв и чисел; и содержать хотя бы одну букву и хотя бы одно число.'),
});

export const AppContainer = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      email: 'dd',
      password: '',
      password2: '',
    },
    resolver: yupResolver(schema),
  });

  let submitButtonRef = useRef(null);

  // const emailProps = {
  //   minLength: { value: 1, message: 'Поле "Email" должно быть заполнено'},
  //   pattern: { value: /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/, message: 'Неверный формат email'},
  // };

  const emailError = errors.email?.message;
  const passwordError = errors.password?.message;
  const password2Error = errors.password2?.message;

  console.log(errors);

  const onSubmit = (formData) => {
    console.log(formData);
  };

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
        {...register('email')}
      />

      <input
        type="password"
        name="password"
        placeholder="Пароль"
        className={styles['form-control']}
        {...register('password')}
        />

      <input
        type="password"
        name="password2"
        placeholder="Повтор пароля"
        className={styles['form-control']}
        {...register('password2')}
      />

      <button
        type="submit"
        className={styles.button}
        // disabled={!formIsValid}
        ref={submitButtonRef}
      >Зарегистрироваться</button>
    </form>
  )
};

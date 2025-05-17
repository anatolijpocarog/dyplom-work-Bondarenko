import { useDispatch } from 'react-redux';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as yup from 'yup';
import { signupThunk } from '../../redux/auth/thunk';
import styles from '../LogInForm/LogIn.module.scss';
import { SectionWrapper } from '../Section/SectionWrapper';

const nameReg = /^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$/;
const emailReg = /^\w+@\w+\.\w+$/;

const schema = yup.object().shape({
  name: yup.string().matches(nameReg, 'Не валідно').required('Обовʼязкове поле'),
  email: yup.string().matches(emailReg, 'Не валідно').required('Обовʼязкове поле'),
  password: yup.string().min(8, 'Не валідно').required('Обовʼязкове поле'),
});

const SignUpForm = () => {
  const dispatch = useDispatch();

  const submitForm = (values, actions) => {
    actions.resetForm();
    dispatch(signupThunk(values));
  };

  return (
    <SectionWrapper>
    <Formik
      initialValues={{ name: '', email: '', password: '' }}
      validationSchema={schema}
      onSubmit={submitForm}
    >
      <Form className={styles.formContainer}>
        <label className={styles.label}>
          Імʼя
          <Field
            className={styles.input}
            type="text"
            name="name"
            placeholder="John"
          />
          <ErrorMessage name="name" component="p" />
        </label>

        <label className={styles.label}>
          Емейл
          <Field
            className={styles.input}
            type="email"
            name="email"
            placeholder="examplemail@mail.com"
          />
          <ErrorMessage name="email" component="p" />
        </label>

        <label className={styles.label}>
          Пароль
          <Field
            className={styles.input}
            type="password"
            name="password"
            placeholder="examplepwd123"
          />
          <ErrorMessage name="password" component="p" />
        </label>

        <button type="submit" className={styles.formButton}>
            Створити користувача
        </button>
      </Form>
    </Formik>
    </SectionWrapper>

  );
};

export default SignUpForm;
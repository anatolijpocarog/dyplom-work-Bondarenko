import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as yup from 'yup';
import { useDispatch } from 'react-redux';
import styles from './LogIn.module.scss';
import { loginThunk } from '../../redux/auth/thunk';
import { SectionWrapper } from '../Section/SectionWrapper';

const emailReg = /^\w+@\w+\.\w+$/;

const schema = yup.object().shape({
  email: yup.string().matches(emailReg, 'Not valid').required('Required'),
  password: yup.string().min(8, 'Not valid').required('Required'),
});

const LogInForm = () => {
  const dispatch = useDispatch();

  const submitForm = (values, actions) => {
    actions.resetForm();
    dispatch(loginThunk(values));
  };

  return (
    <SectionWrapper>
    <Formik
      initialValues={{ email: '', password: '' }}
      validationSchema={schema}
      onSubmit={submitForm}
    >
      <Form className={styles.formContainer}>
        <label className={styles.label}>
          Email
          <Field
            className={styles.input}
            type="email"
            name="email"
            placeholder="example@mail.com"
          />
          <ErrorMessage name="email" component="p" />
        </label>

        <label className={styles.label}>
          Password
          <Field
            className={styles.input}
            type="password"
            name="password"
            placeholder="examplepwd123"
          />
          <ErrorMessage name="password" component="p" />
        </label>

        <button type="submit" className={styles.formButton}>
          Create User
        </button>
      </Form>
    </Formik>
    </SectionWrapper>
  );
};

export default LogInForm;
import { useDispatch, useSelector } from 'react-redux';
import styles from './UserMenu.module.scss';
import { logoutThunk } from '../../redux/auth/thunk';
import { selectAuthUserData } from '../../redux/auth/auth.selectors';

const UserMenu = () => {
  const userData = useSelector(selectAuthUserData);
  const dispatch = useDispatch();

  const onLogout = () => {
    dispatch(logoutThunk());
  };

  return (
    <div className={styles.logoutBox}>
      <p>{userData.name}</p>
      <button type="button" onClick={onLogout} className={styles.logoutBoxButton}>
        Вихід
      </button>
    </div>
  );
}

export default UserMenu;
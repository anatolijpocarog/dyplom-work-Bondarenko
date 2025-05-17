import { useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';
import styles from './Navigation.module.scss';
import { selectAuthAuthenticated } from '../../redux/auth/auth.selectors';
import Header from '../Header/Header';
import h from '../Header/Header.module.scss';
import icons from '../../images/icons.svg';

export const Navigation = () => {
  const authenticated = useSelector(selectAuthAuthenticated);

  return (
    <header className={h.header}>
      <div className="container">
        <nav>
          {authenticated ? (
            <div className={styles.privatNav}>
              <Header />
            </div>
          ) : (
            <ul className={styles.navList}>
              <NavLink to="/">
                <svg width="48" height="48" className={h.logo}>
                  <use href={icons + '#icon-logo'}></use>
                </svg>
              </NavLink>
              <li>
                <NavLink
                  to="login"
                  className={({ isActive }) =>
                    isActive ? `${styles.navLink} active` : styles.navLink
                  }
                >
                  Log in
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="register"
                  className={({ isActive }) =>
                    isActive ? `${styles.navLink} active` : styles.navLink
                  }
                >
                  Register
                </NavLink>
              </li>
            </ul>
          )}
        </nav>
      </div>
    </header>
  );
};

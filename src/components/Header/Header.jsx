import { NavLink } from 'react-router-dom';

import icons from '../../images/icons.svg';

import h from './Header.module.scss';
import styles from '../Navigation/Navigation.module.scss';
import UserMenu from '../UserMenu/UserMenu';
import { useSelector } from 'react-redux';
import { selectAuthAuthenticated } from '../../redux/auth/auth.selectors';

function Header() {
  const authenticated = useSelector(selectAuthAuthenticated);
  return (
    <div className={h.header}>
      <div className={h.container}>
        <NavLink to="/">
          <svg width="48" height="48" className={h.logo}>
            <use href={icons + '#icon-logo'}></use>
          </svg>
        </NavLink>
        <nav className={styles.navContainer}>
          {authenticated ? (
            <>
              <div className={styles.privatNav}>
                <ul className={styles.listNavLink}>
                  <li>
                    <NavLink className="header-nav-link" to="/">
                      Home
                    </NavLink>
                  </li>
                  <li>
                    <NavLink className="header-nav-link" to="/catalog">
                      House rental
                    </NavLink>
                  </li>
                  <li>
                    <NavLink className="header-nav-link" to="/favorites">
                      Favorite house
                    </NavLink>
                  </li>
                </ul>
              </div>
              <UserMenu />

            </>
          ) : (
            <ul  className={styles.listNavLink}>
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
        {/*<nav>*/}
        {/*  <ul>*/}
        {/*    <li>*/}
        {/*      <NavLink className="header-nav-link" to="/">*/}
        {/*        Home*/}
        {/*      </NavLink>*/}
        {/*    </li>*/}
        {/*    <li>*/}
        {/*      <NavLink className="header-nav-link" to="/catalog">*/}
        {/*        House rental*/}
        {/*      </NavLink>*/}
        {/*    </li>*/}
        {/*    <li>*/}
        {/*      <NavLink className="header-nav-link" to="/favorites">*/}
        {/*        Favorite house*/}
        {/*      </NavLink>*/}
        {/*    </li>*/}
        {/*  </ul>*/}
        {/*</nav>*/}
      </div>
    </div>
  );
}

export default Header;

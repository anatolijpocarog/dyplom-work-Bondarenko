import { NavLink } from 'react-router-dom';

import icons from '../../images/icons.svg';

import h from './Header.module.scss';
import styles from '../Navigation/Navigation.module.scss';
import UserMenu from '../UserMenu/UserMenu';

function Header() {

  return (
    <div className={h.header}>
      <div className={h.container}>
        <NavLink to="/">
          <svg width="48" height="48" className={h.logo}>
            <use href={icons + '#icon-logo'}></use>
          </svg>
        </NavLink>
        <nav className={styles.navContainer}>
          <div className={styles.privatNav}>
            <ul className={styles.listNavLink}>
              <li>
                <NavLink className="header-nav-link" to="/">
                  Головна
                </NavLink>
              </li>
              <li>
                <NavLink className="header-nav-link" to="/catalog">
                  Оренда будинку
                </NavLink>
              </li>
              <li>
                <NavLink className="header-nav-link" to="/favorites">
                  Улюблене
                </NavLink>
              </li>
              <li>
                <NavLink className="header-nav-link" to="/orenda-dash">
                  Для Орендодавця
                </NavLink>
              </li>
            </ul>
          </div>
          <UserMenu />
        </nav>
      </div>
    </div>
  );
}

export default Header;

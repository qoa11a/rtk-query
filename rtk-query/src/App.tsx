import React, { FC } from 'react';
import { NavLink, Outlet } from 'react-router-dom';

import styles from './App.module.scss';

const links = [
  {
    to: '/posts',
    text: 'Posts',
  },
  {
    to: '/users',
    text: 'Users',
  },
];

const App: FC = () => {
  return (
    <>
      <header>
        <h1>RTK Query</h1>

        <nav>
          <ul className={styles.list}>
            {links.map(({ to, text }) => (
              <li key={to} className={styles.listItem}>
                <NavLink
                  className={
                    ({ isActive }) =>
                      `${styles.link} ${isActive ? styles.activeLink : ''}`
                  }
                  to={to}
                >
                  {text}
                </NavLink>
              </li>
            ))}
          </ul>
        </nav>
      </header>

      <main className={styles.main}>
        <Outlet />
      </main>
    </>
  );
};

export default App;

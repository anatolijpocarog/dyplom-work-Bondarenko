import { Suspense } from 'react';
import { Outlet } from 'react-router-dom';

import Header from '../Header/Header';
import { Loader } from '../Loader/Loader';

const Layout = () => {
  return (
    <>
      <Header />
      <main>
        <h1
          style={{
            opacity: '0',
            visibility: 'hidden',
            pointerEvents: 'none',
            height: '0',
          }}
        >
          Rental Card
        </h1>
        <Suspense fallback={<Loader />}>
          <Outlet />
        </Suspense>
      </main>
    </>
  );
};

export default Layout;

import { Suspense } from 'react';
import { Outlet } from 'react-router-dom';

import { Loader } from '../Loader/Loader';
import { Navigation } from '../Navigation/Navigation';

const Layout = () => {
  return (
    <>
      <Navigation />

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

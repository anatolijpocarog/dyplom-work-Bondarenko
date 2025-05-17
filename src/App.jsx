import { Suspense, lazy, useEffect } from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import { selectIsLoading, selectIsOpenModal } from './redux/cars.selectors';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { ModalHouse } from './components/ModalHouse/ModalHouse';
import { Loader } from './components/Loader/Loader';
import { refreshThunk } from './redux/auth/thunk';
import PrivateRoute from './components/PrivateRoute/PrivateRoute';
import RestictedRoute from './components/RestictedRoute/RestictedRoute';
import LogInPage from './page/LoginPage';
import RegistrationPage from './page/RegistrationPage';

const Layout = lazy(() => import('./components/Layout/Layout'));
const HomePage = lazy(() => import('./page/HomePage'));
const HouseRentalPage = lazy(() => import('./page/HouseRentalPage'));
const FavoriteCarsPage = lazy(() => import('./page/FavoriteHousePage'));

function App() {
  const isOpenModal = useSelector(selectIsOpenModal);
  const isLoading = useSelector(selectIsLoading);

  useEffect(() => {
    document.body.style.overflow = isOpenModal ? 'hidden' : '';
  }, [isOpenModal]);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(refreshThunk());
  }, [dispatch]);

  return (
    <>
      {/* <Suspense fallback={<Loader />}>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<HomePage />} />
            <Route path="/catalog" element={<HouseRentalPage />} />
            <Route path="/favorites" element={<FavoriteCarsPage />} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Route>
        </Routes>
      </Suspense>
      {isOpenModal && <ModalHouse />}
      {isLoading && <Loader />}
      <ToastContainer /> */}
      {/** ============ */}

      <Suspense fallback={<Loader />}>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<HomePage />} />
            <Route
              path="/catalog"
              element={
                <PrivateRoute>
                  <HouseRentalPage />
                </PrivateRoute>
              }
            />
            <Route
              path="/favorites"
              element={
                <PrivateRoute>
                  <FavoriteCarsPage />
                </PrivateRoute>
              }
            />
            <Route
              path="/login"
              element={
                <RestictedRoute>
                  <LogInPage />
                </RestictedRoute>
              }
            />
            <Route
              path="/register"
              element={
                <RestictedRoute>
                  <RegistrationPage />
                </RestictedRoute>
              }
            />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Route>
        </Routes>

        {isOpenModal && <ModalHouse />}
        {isLoading && <Loader />}
        <ToastContainer autoClose={2000} />
      </Suspense>
    </>
  );
}

export default App;

import { Suspense, lazy, useEffect } from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import { useSelector } from 'react-redux';

import { selectIsLoading, selectIsOpenModal } from './redux/cars.selectors';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { ModalCar } from './components/ModalCar/ModalCar';
import { Loader } from './components/Loader/Loader';

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

  return (
    <>
      <Suspense fallback={<Loader />}>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<HomePage />} />
            <Route path="/catalog" element={<HouseRentalPage />} />
            <Route path="/favorites" element={<FavoriteCarsPage />} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Route>
        </Routes>
      </Suspense>
      {isOpenModal && <ModalCar />}
      {isLoading && <Loader />}
      <ToastContainer />
    </>
  );
}

export default App;

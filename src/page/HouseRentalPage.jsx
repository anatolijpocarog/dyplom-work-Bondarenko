import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { Container } from '../components/Container/Container';
import { Section } from '../components/Section/Section';
import { CarItem } from '../components/CarItem/CarItem';
import { Filter } from '../components/Filter/Filter';
import { NoContent } from '../components/NoContent/NoContent';

import {
  selectCatalogCarsData,
  selectFilter,
  selectNextPage,
} from '../redux/cars.selectors';
import { setNextPage } from '../redux/slice/nextApiPageSlice';
import { catatlogCarsThunk } from '../redux/cars/carsThunk';

import rentalCars from './pages.module.scss';
import { totalCars } from '../services/api';
import { toast } from 'react-toastify';

const HouseRentalPage = () => {
  const dispatch = useDispatch();
  const [carsData, setCarData] = useState([]);
  const responseCarData = useSelector(selectCatalogCarsData);
  const nextPage = useSelector(selectNextPage);
  const filter = useSelector(selectFilter);

  const [totalElements, setTotalElements] = useState(0);

  useEffect(() => {
    const fetchTotalElements = async () => {
      try {
        const total = await totalCars();
        setTotalElements(total);
      } catch (error) {
        toast.error('Error fetching total elements:', error);
      }
    };
    fetchTotalElements();
  }, []);

  const limit = 12;
  const lastPage = Math.ceil(totalElements / limit);

  useEffect(() => {
    if (responseCarData.length === 0) {
      dispatch(catatlogCarsThunk({ page: 1 }));
    }
  }, [dispatch, responseCarData]);

  useEffect(() => {
    if (filter.length !== 0) {
      const { make, price, minMileage, maxMileage } = filter;

      const filterList = responseCarData.filter(car => {
        const numPrice = parseInt(car.rentalPrice.replace(/\D/g, ''), 10);

        const makeCondition = make !== null ? car.make === make : true;
        const priceCondition = price !== null ? numPrice <= price.value : true;
        const minMileageCondition =
          minMileage !== '' ? Number(car.mileage) >= Number(minMileage) : true;
        const maxMileageCondition =
          maxMileage !== '' ? Number(car.mileage) <= Number(maxMileage) : true;

        return (
          makeCondition &&
          priceCondition &&
          minMileageCondition &&
          maxMileageCondition
        );
      });

      setCarData(filterList);
    } else {
      setCarData(responseCarData);
    }
  }, [responseCarData, filter]);

  const loadMore = () => {
    dispatch(setNextPage(nextPage + 1));
    dispatch(catatlogCarsThunk({ page: nextPage }));
  };

  return (
    <>
      <Section title="All adverts">
        <Container>
          <div className={rentalCars.wrapper}>
            <Filter />
            {carsData.length === 0 ? (
              <NoContent />
            ) : (
              <ul className={rentalCars.listCards}>
                {carsData.map(e => (
                  <CarItem key={e.id} car={e} />
                ))}
              </ul>
            )}
            {(carsData.length !== 0 &&
              nextPage <= lastPage &&
              filter.length === 0) ||
            (nextPage <= lastPage &&
              filter.make === null &&
              filter.price === null &&
              filter.minMileage === '' &&
              filter.maxMileage === '') ? (
              <button className={rentalCars.btnLoadMore} onClick={loadMore}>
                Load more
              </button>
            ) : null}
          </div>
        </Container>
      </Section>
    </>
  );
};

export default HouseRentalPage;

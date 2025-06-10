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
        toast.error('Помилка отримання загальної кількості елементів:', error);
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
      const {
        typesHomes,
        Price,
        minYear,
        maxYear,
        cityHomes,
        minSquare,
        maxSquare,
        minSize,
        maxSize,
        minPrice,
        maxPrice,
      } = filter;

      const filterList = responseCarData.filter(car => {
        const numPrice = parseInt(car.Price.replace(/\D/g, ''), 10);
        const addressParts = car.address.split(', ');
        const cityFromAddress = addressParts[addressParts.length - 2];

        const typeCondition = typesHomes !== null ? car.type === typesHomes : true;
        const cityCondition = cityHomes !== null ? cityFromAddress === cityHomes : true;
        const priceCondition =
          Price !== null ? numPrice <= Price.value :
            minPrice !== '' && maxPrice !== '' ? numPrice >= Number(minPrice) && numPrice <= Number(maxPrice) :
              minPrice !== '' ? numPrice >= Number(minPrice) :
                maxPrice !== '' ? numPrice <= Number(maxPrice) :
                  true;

        const YearCondition =
          (minYear !== '' ? Number(car.year) >= Number(minYear) : true) &&
          (maxYear !== '' ? Number(car.year) <= Number(maxYear) : true);

        const squareCondition =
          (minSquare !== '' ? Number(car.square) >= Number(minSquare) : true) &&
          (maxSquare !== '' ? Number(car.square) <= Number(maxSquare) : true);

        const floorMatch = car.size && car.size.match(/^(\d+)/); // "12 поверх із 20" -> 12
        const currentFloor = floorMatch ? parseInt(floorMatch[1], 10) : null;

        const floorCondition =
          (minSize !== '' ? currentFloor >= Number(minSize) : true) &&
          (maxSize !== '' ? currentFloor <= Number(maxSize) : true);

        return (
          typeCondition &&
          cityCondition &&
          priceCondition &&
          YearCondition &&
          squareCondition &&
          floorCondition
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
      <Section title="Усі оголошення">
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
              filter.typesHomes === null &&
              filter.Price === null &&
              filter.minYear === '' &&
              filter.maxYear === '' &&
              filter.minPrice === '' &&
              filter.maxPrice === '' &&
              filter.minSquare === '' &&
              filter.maxSquare === '' &&
              filter.minSize === '' &&
              filter.maxSize === '' &&
              filter.cityHomes === null) ? (
              <button className={rentalCars.btnLoadMore} onClick={loadMore}>
                ↓ Більше ↓
              </button>
            ) : null}
          </div>
        </Container>
      </Section>
    </>
  );
};

export default HouseRentalPage;

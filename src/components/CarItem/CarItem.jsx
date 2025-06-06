import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import Button from '../Button/Button';
import {
  addToFavorites,
  removeFromFavorites,
} from '../../redux/cars/carsSlice';
import { selectFavorites } from '../../redux/cars.selectors';

import randomImg from '../../images/car.jpeg';
import icons from '../../images/icons.svg';

import item from './CarItem.module.scss';

export const CarItem = ({ car }) => {
  const dispatch = useDispatch();
  const favorites = useSelector(selectFavorites);
  const [isFavorite, setIsFavorite] = useState(false);

  const handleToggleFavorite = () => {
    if (!isFavorite) {
      dispatch(addToFavorites(car));
      setIsFavorite(true);
    } else {
      dispatch(removeFromFavorites(id));
      setIsFavorite(false);
    }
  };

  const {
    id,
    year,
    make,
    type,
    img,
    square,
    size,
    Price,
    rentalCompany,
    address,
  } = car;

  useEffect(() => {
    if (favorites !== null) {
      const carIsFavorite = favorites.some(e => e.id === id);

      setIsFavorite(carIsFavorite);
    }
  }, [favorites, id]);

  const addressParts = address.split(', ');
  const classCar = rentalCompany.split(' ');
  const typeCar = type.toLowerCase();

  return (
    <li className={item.carItem}>
      <div>
        <button
          className={item.favoriteBtn}
          type="button"
          onClick={handleToggleFavorite}
        >
          <svg
            width="18"
            height="18"
            className={isFavorite ? item.active : 'heart'}
          >
            <use href={icons + '#icon-favorite'}></use>
          </svg>
        </button>
        <div className={item.imageContainer}>
          <img
            src={img || randomImg}
            alt={make}
            width={274}
            height={268}
            loading="lazy"
            className={item.carImg}
          />
        </div>
        <div>
          <div className={item.carMainInfo}>
            <h3>
              {make} {type && <span>{type}</span>}, {year}
            </h3>
          </div>
          <div className={item.carAdditionalInfo}>
            <ul>
              <li>
                <p>{classCar[0]}</p>
              </li>
              <li>
                <p>{addressParts[2]}</p>
              </li>
              <li>
                <p>{rentalCompany}</p>
              </li>
              <li>
                <p>{square}</p>
              </li>
            </ul>
            <ul>
              <li>
                <p className={item.carType}>{typeCar}</p>
              </li>
              <li>
                <p>{size}</p>
              </li>
              <li>
                <p>{Price}</p>
              </li>
            </ul>

            <ul>
              <li>
                <p>{addressParts}</p>
              </li>
            </ul>
          </div>
        </div>
      </div>
      <Button text="Більше" car={car} />
    </li>
  );
};

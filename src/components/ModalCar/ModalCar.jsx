import { useCallback, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import Button from '../Button/Button';

import { selectCarInfo } from '../../redux/cars.selectors';
import { setIsOpenModal } from '../../redux/slice/isOpenModalSlice';

import randomImg from '../../images/car.jpeg';
import icons from '../../images/icons.svg';

import item from '../CarItem/CarItem.module.scss';
import m from './ModalCar.module.scss';

export const ModalCar = () => {
  const carInfo = useSelector(selectCarInfo);
  const dispatch = useDispatch();

  const closeModal = useCallback(() => {
    dispatch(setIsOpenModal(false));
  }, [dispatch]);

  const onBackdrop = e => e.target === e.currentTarget && closeModal();

  useEffect(() => {
    const onEsc = e => {
      e.key === 'Escape' && closeModal();
    };

    window.addEventListener('keydown', onEsc);
    return () => window.removeEventListener('keydown', onEsc);
  }, [closeModal]);

  const {
    make,
    year,
    model,
    type,
    img,
    address,
    engineSize,
    fuelConsumption,
    id,
    description,
    accessories,
    functionalities,
    mileage,
    rentalConditions,
    rentalPrice,
  } = carInfo;

  const addressParts = address?.split(', ');
  const typeCar = type.toLowerCase();

  const uiMileage = mileage.toLocaleString('en-US', { style: 'decimal' });

  const parseCondition = condition => {
    const [key, value] = condition.split(':').map(part => part.trim());
    return { key, value };
  };
  const conditionsArray = rentalConditions.split('\n');
  const { key: text, value: ageVal } = parseCondition(conditionsArray[0]);

  return (
    <div className={m.backdrop}>
      <div className={m.wrapperModal} onClick={onBackdrop}>
        <div className={m.modal}>
          <div className={m.generalCarInfo}>
            <img
              src={img || randomImg}
              alt={make}
              width={461}
              height={248}
              className={item.carImg}
            />
            <div className="text-info">
              <div className={item.title}>
                <h2>
                  {make} {model && <span>{model}</span>}, {year}
                </h2>
              </div>
              <div className={item.carAdditionalInfo}>
                <ul>
                  <li>
                    <p>{addressParts[1]}</p>
                  </li>
                  <li>
                    <p>{addressParts[2]}</p>
                  </li>
                  <li>
                    <p>Id: {id}</p>
                  </li>
                  <li>
                    <p>Year: {year}</p>
                  </li>
                  <li>
                    <p className={item.carType}>Type: {typeCar}</p>
                  </li>
                </ul>
                <ul>
                  <li>
                    <p>Fuel Consumption: {fuelConsumption}</p>
                  </li>
                  <li>
                    <p>Engine Size: {engineSize}</p>
                  </li>
                </ul>
              </div>
            </div>
            <p className={m.shortDescription}>{description}</p>
          </div>

          <div className="additional-car-info">
            <h3>Accessories and functionalities:</h3>
            <div className={item.carAdditionalInfo}>
              <ul>
                {accessories.map((item, index) => (
                  <li key={index}>
                    <p>{item}</p>
                  </li>
                ))}
              </ul>
              <ul>
                {functionalities.map((item, index) => (
                  <li key={index}>
                    <p>{item}</p>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="additional-car-info">
            <h3>Rental Conditions:</h3>
            <ul className={m.conditionsList}>
              {conditionsArray.map((condition, index) => (
                <li key={index}>
                  <p>
                    {index === 0 ? (
                      <>
                        {text}: <span>{ageVal}</span>
                      </>
                    ) : (
                      condition
                    )}
                  </p>
                </li>
              ))}
              <li>
                <p>
                  Mileage: <span>{uiMileage}</span>
                </p>
              </li>
              <li>
                <p>
                  Price: <span>{rentalPrice.slice(1)}$</span>
                </p>
              </li>
            </ul>
          </div>
          <div>
            <Button text="Rental car" onClick={closeModal} />

            <button type="button" onClick={closeModal}>
              <svg width="24" height="24">
                <use href={icons + '#icon-x'}></use>
              </svg>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

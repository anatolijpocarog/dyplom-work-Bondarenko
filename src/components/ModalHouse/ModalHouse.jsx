import { useCallback, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import Button from '../Button/Button';

import { selectCarInfo } from '../../redux/cars.selectors';
import { setIsOpenModal } from '../../redux/slice/isOpenModalSlice';

import randomImg from '../../images/home-foto.avif';
import icons from '../../images/icons.svg';

import item from '../CarItem/CarItem.module.scss';
import m from './ModalCar.module.scss';

export const ModalHouse = () => {
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
        id,
        year,
        make,
        type,
        img,
        description,
        square,
        size,
        features,
        functionalities,
        Price,
        rentalCompany,
        address,
        rentalConditions
    } = carInfo;

    const addressParts = address?.split(', ');
    const typeCar = type.toLowerCase();

    const parseCondition = condition => {
        const [key, value] = condition.split(':').map(part => part.trim());
        return { key, value };
    };
    const conditionsArray = rentalConditions.split('\n');
    const { key: text } = parseCondition(conditionsArray[0]);

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
                                    {make} {type && <span>{type}</span>}, {year}
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
                                        <p>Rental Company: {rentalCompany}</p>
                                    </li>
                                    <li>
                                        <p>Size: {size}</p>
                                    </li>
                                </ul>
                            </div>
                        </div>
                        <p className={m.shortDescription}>{description}</p>
                    </div>

                    <div className="additional-car-info">
                        <h3>Features and functionalities:</h3>
                        <div className={item.carAdditionalInfo}>
                            <ul>
                                {features.map((item, index) => (
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
                                                {text}
                                            </>
                                        ) : (
                                            condition
                                        )}
                                    </p>
                                </li>
                            ))}
                            <li>
                                <p>
                                    Square: <span>{square}</span>
                                </p>
                            </li>
                            <li>
                                <p>
                                    Price: <span>{Price.slice(1)}$</span>
                                </p>
                            </li>
                        </ul>
                    </div>
                    <div>
                        <Button text="Rental house" onClick={closeModal} />

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

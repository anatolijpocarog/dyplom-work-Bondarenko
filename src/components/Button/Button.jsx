import { useCallback } from 'react';
import { useDispatch } from 'react-redux';

import { setIsOpenModal } from '../../redux/slice/isOpenModalSlice';
import { setCarInfo } from '../../redux/slice/carInfoSlice';
import { setFilter } from '../../redux/slice/filterSlice';

import b from './Button.module.scss';
import { toast } from 'react-toastify';

function Button({ text, car, filterData }) {
  const dispatch = useDispatch();

  const learnMore = car => {
    dispatch(setCarInfo(car));
    dispatch(setIsOpenModal(true));
  };

  const closeModal = useCallback(() => {
    dispatch(setIsOpenModal(false));
    toast.success('You can contact the company by tel: +380680000000');
  }, [dispatch]);

  const filterSearch = () => {
    dispatch(setFilter(filterData));
  };

  return (
    (text === 'Більше' && (
      <button className={b.btnLearnMore} onClick={() => learnMore(car)}>
        {text}
      </button>
    )) ||
    (text === 'Оренда будинку' && (
      <button className={b.rentalCar} onClick={closeModal}>
        <a href="tel:+380730000000">{text}</a>
      </button>
    )) ||
    (text === 'Пошук' && (
      <button className={b.search} onClick={filterSearch}>
        {text}
      </button>
    ))
  );
}

export default Button;

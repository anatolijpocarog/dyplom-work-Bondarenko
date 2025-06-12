import React, { useState } from 'react';
import styles from './pages.module.scss';
import { toast } from 'react-toastify';

const OrendaDashPage = () => {
  const initialFormState = {
    id: '',
    year: '',
    make: '',
    type: '',
    img: '',
    description: '',
    square: '',
    size: '',
    features: '',
    functionalities: '',
    price: '',
    rentalCompany: '',
    address: '',
    rentalConditions: '',
  };

  const [formData, setFormData] = useState(initialFormState);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitSuccess(false);

    try {
      // Перетворюємо features та functionalities у масиви
      // const payload = {
      //   ...formData,
      //   features: formData.features.split(',').map(item => item.trim()),
      //   functionalities: formData.functionalities.split(',').map(item => item.trim()),
      // };

      // console.log('Submitted data:', payload);
      toast.success('Заявка пішла на модерування');
      // Тут можна зробити POST-запит на сервер
      // const response = await fetch('/api/properties', {
      //   method: 'POST',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify(payload)
      // });
      // if (!response.ok) throw new Error('Помилка при відправці');

      // Імітація затримки запиту
      await new Promise(resolve => setTimeout(resolve, 1000));

      setSubmitSuccess(true);
      setFormData(initialFormState); // Очищення форми
    } catch (error) {
      toast.error('Помилка:', error);

      // console.error('Помилка:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className={styles.formContainer}>
      <h2 className={styles.formTitle}>Додати нерухомість</h2>

      {submitSuccess && (
        <div className={styles.successMessage}>
          Дані успішно відправлено! Форма очищена.
        </div>
      )}

      {[
        ['id', 'ID (число)', 'number'],
        ['year', 'Рік побудови', 'number'],
        ['make', 'Назва (make)', 'text'],
        ['type', 'Тип (Квартира, Будинок, Офіс тощо)', 'text'],
        ['img', 'URL зображення', 'url'],
        ['description', 'Опис', 'text'],
        ['square', 'Площа (м²)', 'number'],
        ['size', 'Поверх/поверховість', 'text'],
        ['features', 'Особливості (через кому)', 'text'],
        ['functionalities', 'Функціональність (через кому)', 'text'],
        ['price', 'Ціна (₴/міс або ₴/доба)', 'number'],
        ['rentalCompany', 'Назва компанії', 'text'],
        ['address', 'Адреса', 'text'],
        ['rentalConditions', 'Умови оренди', 'text']
      ].map(([name, label, type]) => (
        <div key={name} className={styles.formGroup}>
          <label htmlFor={name}>{label}</label>
          <input
            type={type}
            id={name}
            name={name}
            value={formData[name]}
            onChange={handleChange}
            required
          />
        </div>
      ))}

      <button
        type="submit"
        className={styles.submitButton}
        disabled={isSubmitting}
      >
        {isSubmitting ? 'Відправка...' : 'Додати'}
      </button>
    </form>
  );
};

export default OrendaDashPage;
import { useSelector } from 'react-redux';

import { Container } from '../components/Container/Container';
import { Section } from '../components/Section/Section';
import { CarItem } from '../components/CarItem/CarItem';
import { NoContent } from '../components/NoContent/NoContent';

import { selectFavorites } from '../redux/cars.selectors';

import rentalCars from './pages.module.scss';

const FavoriteHousePage = () => {
  const favoriteCars = useSelector(selectFavorites);
  return (
    <Section title="Your favorite rental house!">
      <Container>
        <div className={rentalCars.favoriteWrapper}>
          {favoriteCars.length === 0 ? (
            <NoContent />
          ) : (
            <ul className={rentalCars.listCards}>
              {favoriteCars.map(e => (
                <CarItem key={e.id} car={e} />
              ))}
            </ul>
          )}
        </div>
      </Container>
    </Section>
  );
};

export default FavoriteHousePage;

import { Container } from '../components/Container/Container';
import { Section } from '../components/Section/Section';

import car from '../images/home-foto.avif';

import rentalCars from './pages.module.scss';
const HomePage = () => {
  return (
    <Section title="Ukrainian house rental">
      <Container>
        <div className={rentalCars.homeWrapper}>
          <section>
            <h2>Welcome to "Ukrainian house rental"!</h2>
            <div className={rentalCars.homeImg}>
              <img src={car} alt="car" />
            </div>
          </section>
          <section>
            <h2>About us</h2>
            <p>
              text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text
                          </p>
          </section>
          <section className={rentalCars.servicesBlock}>
            <h2>Our Services</h2>
            <ol>
              <li>
                <h3>title title title</h3>
                <ul>
                  <li>
                    <p>
                      text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text
                    </p>
                  </li>
                  <li>
                    <p>
                      text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text
                    </p>
                  </li>
                </ul>
              </li>
              <li>
                <h3>title title title</h3>
                <ul>
                  <li>
                    <p>
                      text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text
                    </p>
                  </li>
                  <li>
                    <p>
                        text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text
                    </p>
                  </li>
                </ul>
              </li>
              <li>
                <h3>title title title</h3>
                <ul>
                  <li>
                    <p>text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text
                      </p>
                  </li>
                  <li>
                    <p>text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text
                    </p>
                  </li>
                </ul>
              </li>
              <li>
                <h3>title title title</h3>
                <ul>
                  <li>
                    <p>
                      text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text

                    </p>
                  </li>
                  <li>
                    <p>text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text
                    </p>
                  </li>
                </ul>
              </li>
            </ol>
          </section>
          <section>
            <h2>Why Choose Us?</h2>
            <ul>
              <li>
                <p>
                  text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text

                </p>
              </li>
              <li>
                <p>
                  text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text

                </p>
              </li>
              <li>
                <p>
                  text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text

                </p>
              </li>
            </ul>
          </section>
          <section>
            <h2>Contact Us</h2>
            <p>
              text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text

            </p>
          </section>
        </div>
      </Container>
    </Section>
  );
};

export default HomePage;

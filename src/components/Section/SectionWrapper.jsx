import styles from './Section.module.scss';

export const SectionWrapper = ({ title, children }) => {
  return (
    <section className={styles.sectionWrapper}>
      <h2>{title}</h2>
      {children}
    </section>
  );
};
export const Section = ({ title, children }) => {
  return (
    <section className="section">
      <h2>{title}</h2>
      <>{children}</>
    </section>
  );
};

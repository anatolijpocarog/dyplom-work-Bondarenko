import c from './Container.module.scss';

export const Container = ({ children }) => {
  return <div className={c.container}>{children}</div>;
};

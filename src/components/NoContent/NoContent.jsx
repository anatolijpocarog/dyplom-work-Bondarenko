import empty from './NoContent.module.scss';

export const NoContent = () => {
  return (
    <div className={empty.noContent}>
      <p>
        <span>Тут ще пусто</span>🙂
      </p>
    </div>
  );
};

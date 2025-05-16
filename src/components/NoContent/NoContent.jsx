import empty from './NoContent.module.scss';

export const NoContent = () => {
  return (
    <div className={empty.noContent}>
      <p>
        <span>It's still empty here </span>🙂
      </p>
    </div>
  );
};

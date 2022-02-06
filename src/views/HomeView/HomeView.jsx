import styles from './HomeView.module.scss';

const HomeView = () => (
  <div className={styles.container}>
    <h1 className={styles.title}>
      Суперпроработанная главная страница{' '}
      <span role="img" aria-label="Иконка приветствия">
        🧨
      </span>
    </h1>
  </div>
);

export default HomeView;

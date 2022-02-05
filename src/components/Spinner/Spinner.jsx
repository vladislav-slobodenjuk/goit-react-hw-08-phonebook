import Loader from 'react-loader-spinner';
import s from './Spinner.module.scss';

export default function Spinner() {
  return (
    <>
      <div className={s.fallback}>
        <Loader type="Bars" color="#FFF" height={200} width={200} />
      </div>
    </>
  );
}

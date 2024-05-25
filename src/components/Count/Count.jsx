// ? styles
import s from './Count.module.css';

function Count({ green, title, count }) {
  return (
    <article className={s.main}>
      <h2
        className={`text text_size_smaller text_weight_thicker ${
          green && 'text_color_active'
        }`}
      >
        {title}
      </h2>
      <p className={'title'}>{count}</p>
    </article>
  );
}

export default Count;

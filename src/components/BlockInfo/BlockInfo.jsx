// ? styles
import s from './BlockInfo.module.css';

// ? assets
import iconAvatar from './../../assets/avatar.svg';
import { NavLink } from 'react-router-dom';

function BlockInfo({
  title,
  description,
  bigText,
  background,
  children,
  quest = false,
  link = false,
}) {
  const className = `${s.main} ${
    background === 'colorful'
      ? s.main_background_colorful
      : background === 'gold'
      ? s.main_background_gold
      : background === 'silver'
      ? s.main_background_silver
      : background === 'bronze'
      ? s.main_background_bronze
      : s.main_background_simple
  }`;

  function CurrentChildren() {
    return (
      <>
        <div className={s.info}>
          <img className={s.avatar} src={iconAvatar} alt='user avatar' />
          <div className={`${s.texts} ${bigText && s.texts_width_big}`}>
            <p
              className={`text text_size_smaller text_weight_thick ${s.title}`}
            >
              {title}
            </p>
            {description && (
              <p className={`text ${quest && s.quest}`}>{description}</p>
            )}
          </div>
        </div>

        {children}
      </>
    );
  }

  return link ? (
    <NavLink className={className} to={link}>
      <CurrentChildren />
    </NavLink>
  ) : (
    <article className={className}>
      <CurrentChildren />
    </article>
  );
}

export default BlockInfo;

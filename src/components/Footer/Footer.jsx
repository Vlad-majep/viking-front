import { NavLink } from 'react-router-dom';

// ? styles
import s from './Footer.module.css';

// ? assets
import iconMain from './../../assets/main.svg';
import iconReferral from './../../assets/referral.svg';
import iconTasks from './../../assets/tasks.svg';
import iconRocket from './../../assets/rocket.svg';

// ? components
import NavButton from './../NavButton/NavButton';

// ? co
import { PATHS } from './../../utils/constants';

function Footer({ tgId = '' }) {
  return (
    <footer className={s.main}>
      <div className={s.links}>
        <NavButton
          to={`${PATHS.main}?telegramUserId=${tgId}`}
          alt={'main'}
          src={iconMain}
        />
        <NavButton to={PATHS.referral} alt={'referral'} src={iconReferral} />
        <NavButton to={PATHS.quests} alt={'quests'} src={iconTasks} />
        <NavButton to={PATHS.boots} alt={'boots'} src={iconRocket} />
      </div>

      <p className={s.text}>
        How to Play?{' '}
        <NavLink
          className={`link ${s.text} ${s.text_type_link}`}
          to={PATHS.faq}
        >
          Learn more
        </NavLink>
      </p>

      <div className={s.background} />
    </footer>
  );
}

export default Footer;

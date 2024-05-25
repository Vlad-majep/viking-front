import { NavLink } from 'react-router-dom';

// ? styles
import s from './NavButton.module.css';

function NavButton({ to, alt, src }) {
  return (
    <NavLink className={`link ${s.main}`} to={to}>
      <img className={s.icon} alt={alt} src={src} />
    </NavLink>
  );
}

export default NavButton;

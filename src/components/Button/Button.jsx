// ! module
import { NavLink } from 'react-router-dom';

// ? styles
import s from './Button.module.css';

function Button({
  big,
  link = false,
  isActive = true,
  onClick,
  children = 'test text',
}) {
  const className = `${s.main} ${big ? s.main_size_big : s.main_size_small} ${
    isActive && s.main_active_active
  }`;

  return link ? (
    <NavLink className={`link ${className}`} to={link}>
      {children}
    </NavLink>
  ) : (
    <button
      onClick={onClick}
      disabled={!isActive}
      className={`button ${className}`}
    >
      {children}
    </button>
  );
}

export default Button;

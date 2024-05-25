// ? styles
import s from './Money.module.css';

// ? assets
import iconCoin from './../../assets/coin.svg';

function Money({ coin = true, children, small = false, onClick = () => {} }) {
  return (
    <div
      onClick={onClick}
      className={`${s.main} ${small && s.main_size_small}`}
    >
      <p className={`text text_weight_thicker text_size_smaller`}>{children}</p>
      {coin && (
        <img
          className={`${s.coin} ${small && s.coin_size_small}`}
          src={iconCoin}
          alt='coin'
        />
      )}
    </div>
  );
}

export default Money;

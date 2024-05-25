// ! modules
import { useEffect } from 'react';

// ? styles
import s from './Energy.module.css';

// ? assets
import iconEnergy from './../../assets/energy.svg';

// * utils
// ? constants

function Energy({ energy = 0, maxEnergy }) {
  useEffect(() => {
    document.getElementById('progress').style.width = `${
      (energy / maxEnergy) * 100
    }%`;
  });

  return (
    <div className={s.main}>
      <div className={s.count}>
        <img alt='energy' src={iconEnergy} className={s.icon} />
        <p className={'text text_size_bigger text_weight_thickest ' + s.energy}>
          {energy}
          <span className={'text text_size_bigger'}>/</span>
          {maxEnergy}
        </p>
      </div>

      <div className={s.line}>
        <div id='progress' className={s.progress} />
      </div>
    </div>
  );
}

export default Energy;

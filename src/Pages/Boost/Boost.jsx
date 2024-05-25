// ! modules
import { useContext, useRef } from 'react';

// ? styles
import s from './Boost.module.css';

// ? api
import mainApi from '../../Api/Main.api';

// ? assets
import iconCoin from './../../assets/coin.svg';
import iconWeapon from './../../assets/weapon.svg';
import iconEnergy from './../../assets/energy.svg';
import iconAutoMining from './../../assets/automining.svg';

// ? components
import Money from '../../components/Money/Money';
import Button from '../../components/Button/Button';

// ? contexts
import { CurrentUserContext } from '../../contexts/CurrentUserContext';

// * utils
import { numberWithCommas } from '../../utils/utils';
import { GAME_SETTINGS } from '../../utils/constants';

function Boost({ setCurrentUser, setAllUsers, setTopUsers, allUsers }) {
  const currentUser = useContext(CurrentUserContext);

  const refs = {
    weapon: useRef(null),
    energy: useRef(null),
    mining: useRef(null),
  };

  function handleButtonClick(nameOfUpgrade, error = false, text) {
    const newElement = document.createElement('div');
    newElement.innerText = `${nameOfUpgrade} now level is ${
      currentUser[names[nameOfUpgrade]]
    }`;
    newElement.className = `${s.notification} ${
      error && s.notification_type_error
    } text`;

    if (error) {
      newElement.innerText = text;
    }

    newElement.addEventListener('animationend', () => {
      refs[nameOfUpgrade].current.removeChild(newElement);
    });

    refs[nameOfUpgrade].current.appendChild(newElement);
  }

  const names = {
    energy: 'energyLevel',
    weapon: 'weapon',
    mining: 'automining',
  };

  function buyNewLevel(nameOfUpgrade) {
    mainApi
      .upgrade(currentUser.tgId, nameOfUpgrade)
      .then((user) => {
        const newUser = { ...currentUser, ...user };

        let index = 0;

        allUsers.forEach((_user, i) => {
          if (_user.id === newUser.id) {
            index = i;
          }
        });

        newUser.top = index + 1;

        setCurrentUser(newUser);

        if (newUser.top <= 50) {
          const newAllUsers = [...allUsers];
          newAllUsers[index] = newUser;

          setAllUsers(newAllUsers);
          const newTopUsers = newAllUsers.sort((a, b) => b.balance - a.balance);

          setTopUsers(newTopUsers);
        }

        handleButtonClick(nameOfUpgrade);
      })
      .catch((err) => {
        handleButtonClick(nameOfUpgrade, true, err.message);
        console.log(err.message);
      });
  }

  return (
    <section className={s.main}>
      <h1 className={`first-title ${s.title}`}>Boost</h1>

      <h2 className={`text text_weight_thicker`}>Balance</h2>

      <div className={s.money}>
        <p className={'title title_size_biggest'}>
          {numberWithCommas(currentUser.balance)}
        </p>
        <img className={s.coin} src={iconCoin} alt='coin' />
      </div>

      <div className={s['list-boosts']}>
        {/* // ? weapon */}
        <article ref={refs.weapon} className={s.boost}>
          <img className={s.boost__icon} alt='weapon' src={iconWeapon} />

          <div className={s.boots__info}>
            <div className={s.boost__description}>
              <h3 className='text text_size_big text_weight_thick'>WEAPON</h3>
              <p
                className={`text text_size_small text_weight_thin text_color_second ${s.boost__text}`}
              >
                Upgrade your weapon +1 to mining
              </p>
            </div>

            <div className={s['boost__level-button']}>
              <h4 className='text text_size_small text_weight_thickest'>
                LVL {currentUser.weapon}
              </h4>
              <Button
                isActive={
                  !(currentUser.weapon === GAME_SETTINGS.weapon.maxLevel)
                }
              >
                <Money
                  onClick={() => {
                    buyNewLevel('weapon');
                  }}
                  coin={!(currentUser.weapon === GAME_SETTINGS.weapon.maxLevel)}
                  small
                >
                  {currentUser.weapon === GAME_SETTINGS.weapon.maxLevel
                    ? 'Max'
                    : numberWithCommas(10000)}
                </Money>
              </Button>
            </div>
          </div>
        </article>

        {/* // ? Energy */}
        <article ref={refs.energy} className={s.boost}>
          <img className={s.boost__icon} alt='energy' src={iconEnergy} />

          <div className={s.boots__info}>
            <div className={s.boost__description}>
              <h3 className='text text_size_big text_weight_thick'>ENERGY</h3>
              <p
                className={`text text_size_small text_weight_thin text_color_second ${s.boost__text}`}
              >
                Upgrade your energy +500
              </p>
            </div>

            <div className={s['boost__level-button']}>
              <h4 className='text text_size_small text_weight_thickest'>
                LVL {currentUser.energyLevel}
              </h4>
              <Button
                isActive={
                  !(currentUser.energyLevel === GAME_SETTINGS.energy.maxLevel)
                }
              >
                <Money
                  onClick={() => {
                    buyNewLevel('energy');
                  }}
                  coin={
                    !(currentUser.energyLevel === GAME_SETTINGS.energy.maxLevel)
                  }
                  small
                >
                  {currentUser.energyLevel === GAME_SETTINGS.energy.maxLevel
                    ? 'Max'
                    : numberWithCommas(10000)}
                </Money>
              </Button>
            </div>
          </div>
        </article>

        {/* // ? auto mining */}
        <article ref={refs.mining} className={s.boost}>
          <img
            className={s.boost__icon}
            alt='automining'
            src={iconAutoMining}
          />

          <div className={s.boots__info}>
            <div className={s.boost__description}>
              <h3 className='text text_size_big text_weight_thick'>
                AUTOMINING
              </h3>
              <p
                className={`text text_size_small text_weight_thin text_color_second ${s.boost__text}`}
              >
                Get technologies for automining
              </p>
            </div>

            <div className={s['boost__level-button']}>
              <h4 className='text text_size_small text_weight_thickest'>
                LVL {currentUser.automining}
              </h4>
              <Button
                isActive={
                  !(
                    currentUser.automining === GAME_SETTINGS.autoMining.maxLevel
                  )
                }
              >
                <Money
                  onClick={() => {
                    buyNewLevel('mining');
                  }}
                  coin={
                    !(
                      currentUser.automining ===
                      GAME_SETTINGS.autoMining.maxLevel
                    )
                  }
                  small
                >
                  {currentUser.automining === GAME_SETTINGS.autoMining.maxLevel
                    ? 'Max'
                    : numberWithCommas(10000)}
                </Money>
              </Button>
            </div>
          </div>
        </article>
      </div>
    </section>
  );
}

export default Boost;

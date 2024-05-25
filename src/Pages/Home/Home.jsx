// ! modules
import { useContext, useEffect, useRef } from 'react';

// ? styles
import s from './Home.module.css';

// ? api
import mainApi from '../../Api/Main.api';

// ? assets
import iconCoin from './../../assets/coin.svg';
import iconRock from './../../assets/gold_rock.svg';
import iconVicingArm from './../../assets/viking_arm.svg';
import iconVicingBody from './../../assets/viking_body.svg';

// ? components
import BlockInfo from '../../components/BlockInfo/BlockInfo';
import Button from '../../components/Button/Button';
import Energy from './../../components/Energy/Energy';
import Money from '../../components/Money/Money';

// ? contexts
import { CurrentUserContext } from '../../contexts/CurrentUserContext';

// * utils
// ? constants
import { PATHS } from '../../utils/constants';
// ? utils
import { numberWithCommas, getRandomNumber } from '../../utils/utils';

function Home({
  topUser,
  isUserDataLoaded,
  allUsers,
  setAllUsers,
  setTopUsers,
  setCurrentUser,
}) {
  useEffect(() => {
    console.log(topUser);
  });
  const currentUser = useContext(CurrentUserContext);

  const containerRef = useRef(null);

  function handleButtonClick() {
    const newElement = document.createElement('img');
    newElement.style.top = `calc((100% - ${getRandomNumber(12, 162)}px) / 2)`;
    newElement.style.left = `calc((100% - ${getRandomNumber(12, 162)}px) / 2)`;
    newElement.setAttribute('src', iconCoin);
    newElement.className = `${s.coin} ${s.coinAnimation}`;

    newElement.addEventListener('animationend', () => {
      containerRef.current.removeChild(newElement);
    });

    containerRef.current.appendChild(newElement);
  }

  function onVikingClick(func) {
    func();
    mainApi
      .earnCoin(currentUser.tgId)
      .then((user) => {
        let index = null;

        allUsers.forEach((_user, i) => {
          if (_user.id === currentUser.id) {
            index = i;
          }
        });

        user.top = index + 1;

        const newUser = { ...currentUser, ...user };

        setCurrentUser(newUser);

        if (newUser.top <= 50) {
          const newAllUsers = [...allUsers];
          newAllUsers[index] = newUser;
          console.log(index, newUser);
          setAllUsers(newAllUsers);
          const newTopUsers = newAllUsers.sort((a, b) => b.balance - a.balance);

          setTopUsers(newTopUsers);
          topUser = newTopUsers[0];
        }
      })
      .catch((err) => console.log(err));
  }

  return (
    isUserDataLoaded && (
      <section className={s.main}>
        <BlockInfo
          background={'colorful'}
          title={topUser.nickName}
          description={`#Top 1`}
          link={`/${PATHS.ratings}`}
        >
          <Money>{numberWithCommas(topUser.balance)}</Money>
        </BlockInfo>

        <h1 className={`text text_weight_thicker ${s.title}`}>Balance</h1>

        <div className={s.money}>
          <p className={'title title_size_biggest'}>
            {numberWithCommas(currentUser.balance)}
          </p>
          <img className={s.coin} src={iconCoin} alt='coin' />
        </div>

        <Button link={`/${PATHS.ratings}`} big>
          <p className={'text'}>
            Rating -{' '}
            <span className='text_weight_thicker'>#{currentUser.top}</span>
          </p>
        </Button>

        {/* <img
          className={`${s.coin} ${s.coinAnimation}`}
          src={iconCoin}
          alt='coin'
        /> */}

        <article
          ref={containerRef}
          onClick={() => {
            onVikingClick(handleButtonClick);
          }}
          className={s.viking}
        >
          <img
            className={s.viking_body}
            alt='viking body'
            src={iconVicingBody}
          />
          <img className={s.viking_arm} alt='viking arm' src={iconVicingArm} />
          <img className={s.rock} alt='rock' src={iconRock} />
        </article>

        <Energy
          energy={currentUser.energyCurrent}
          maxEnergy={currentUser.energyMax}
        />
      </section>
    )
  );
}

export default Home;

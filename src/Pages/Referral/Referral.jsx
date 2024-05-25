// ! modules
import { useContext, useEffect, useRef, useState } from 'react';

// ? styles
import s from './Referral.module.css';

// ? api
import mainApi from '../../Api/Main.api';

// ? components
import BlockInfo from '../../components/BlockInfo/BlockInfo';
import Button from '../../components/Button/Button';
import Count from '../../components/Count/Count';
import Money from '../../components/Money/Money';

// ? contexts
import { CurrentUserContext } from '../../contexts/CurrentUserContext';

// * utils
import { numberWithCommas, copy } from '../../utils/utils';
import { GAME_SETTINGS } from '../../utils/constants';

function Referral() {
  const userData = useContext(CurrentUserContext);

  const refElement = useRef(null);
  const [refLink, setRefLink] = useState('');
  const [myReferrals, setMyReferrals] = useState({});
  const [isDataLoaded, setDataLoaded] = useState(false);

  useEffect(() => {
    mainApi.getReferralLinkById(userData.tgId).then((res) => {
      setRefLink(res.data);
    });

    mainApi
      .getMyReferralsById(userData.tgId)
      .then((myReferrals) => {
        setMyReferrals(myReferrals);
      })
      .catch((err) => console.log(err))
      .finally(() => {
        setDataLoaded(true);
      });
  }, [userData.tgId]);

  function handleButtonClick() {
    const newElement = document.createElement('div');
    newElement.innerText = 'Link has been copied';
    newElement.className = `${s.notification} text`;

    newElement.addEventListener('animationend', () => {
      refElement.current.removeChild(newElement);
    });

    refElement.current.appendChild(newElement);
    copy(refLink);
  }

  return (
    <section className={s.main}>
      <h1 className={`first-title ${s.title}`}>friends</h1>

      {/* // ? users count */}
      <div className={s.info}>
        {/* // ? all friends */}
        <Count
          title={'Invited'}
          count={isDataLoaded ? myReferrals.numberOfReferrals : 0}
        />
      </div>

      {/* // ? earned */}
      <div className={s.earned}>
        <h2 className={'text text_size_big text_weight_thicker'}>
          Earned coins
        </h2>
        <p className={'text text_size_big text_weight_thicker'}>
          {numberWithCommas(isDataLoaded ? myReferrals.myBalance : 0)}
        </p>
      </div>

      {/* // ? friends list */}
      <div className={s.friends}>
        <h2
          className={'text text_size_big text_weight_thicker text_color_gold'}
        >
          FRIENDS LIST
        </h2>
        <div className={s.users}>
          {isDataLoaded &&
            myReferrals.referralsInfo.map((userInfo, index) => {
              return (
                <BlockInfo key={index} title={userInfo.nickName}>
                  <Money>{`+${numberWithCommas(
                    userInfo.active ? GAME_SETTINGS.coins.forInvite : 0,
                  )}`}</Money>
                </BlockInfo>
              );
            })}
        </div>
      </div>

      <Button onClick={handleButtonClick} big>
        <p ref={refElement} style={{ position: 'relative' }} className={'text'}>
          <span className={s.text_weight_thin}>Send Invite</span>
        </p>
      </Button>

      <div className={s.invite}>
        <p className={'text'}>
          Invite your friends to play and get{' '}
          <span className={'text_weight_thickest text_color_gold_2'}>
            +10,000
          </span>{' '}
          coins for each active user
        </p>
      </div>
    </section>
  );
}

export default Referral;

// ? styles
import s from './Ratings.module.css';

// ? components
import BlockInfo from '../../components/BlockInfo/BlockInfo';
import Count from '../../components/Count/Count';
import Money from '../../components/Money/Money';

// * utils
// ? utils
import { numberWithCommas } from './../../utils/utils';
// ? constants
import { GAME_SETTINGS } from '../../utils/constants';

function Ratings({
  users = { all: 1, lastRegister: 1 },
  topUsers = [],
  coins = topUsers.reduce((acc, user) => acc + user.balance, 0),
}) {
  return (
    <section className={s.main}>
      <h1 className={`first-title ${s.title}`}>Ratings</h1>

      {/* // ? users count */}
      <div className={s.info}>
        {/* // ? all users */}
        <Count title={'Users'} count={users.all} />

        {/* // ? lastRegister users */}
        <Count green title={'Last 24h'} count={users.lastRegister} />
      </div>

      {/* // ? minted */}
      <div className={s.minted}>
        <h2 className={'text text_size_big text_weight_thicker'}>
          Minted coins
        </h2>
        <p className={'text text_size_big text_weight_thicker'}>
          {numberWithCommas(coins)} /{' '}
          <span className={'text_weight_thin'}>
            {numberWithCommas(GAME_SETTINGS.coins.max)}
          </span>
        </p>
      </div>

      {/* // ? top */}
      <div className={s.top}>
        <h2
          className={`text text_size_big text_weight_thicker text_color_gold`}
        >
          TOP 50 MINERS
        </h2>
        <div className={s.users}>
          {topUsers.map((userInfo, index) => {
            return (
              <BlockInfo
                key={index}
                title={userInfo.nickName}
                background={index < 3 && GAME_SETTINGS.backgrounds[index]}
                description={`#Top ${index + 1}`}
              >
                <Money>{numberWithCommas(userInfo.balance)}</Money>
              </BlockInfo>
            );
          })}
        </div>
      </div>
    </section>
  );
}

export default Ratings;

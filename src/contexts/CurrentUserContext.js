// ! modules
import { createContext } from 'react';

// * utils
import { GAME_SETTINGS } from '../utils/constants';

export const CurrentUserContext = createContext({
  id: 1,
  nickName: 'Vladyslav',
  tgId: '659171286',
  balance: 126405,
  referralCode: '6qDGPRaV',
  EnterReferralCode: null,
  count: 0,
  weapon: 1,
  energyLevel: 1,
  energyCurrent: 995,
  energyMax: 1000,
  automining: 2,
  subTg: false,
  createdAt: '2024-01-28T15:24:18.505Z',
  updatedAt: '2024-01-28T23:59:37.177Z',

  // id: 'id571hfw404',
  // tgId: 'id706nsl404',
  // nickName: 'very long text name',
  // balance: 10_000,
  // top: 1,
  // energy: GAME_SETTINGS.energy,
  // weapon: GAME_SETTINGS.weapon,
  // autoMining: GAME_SETTINGS.autoMining,
  // invitedId: {
  //   id: 'id571hfw406', // id of user of friend
  //   tgId: 'id571hfw407', // telegram id of friend
  // },
  // idFriends: [
  //   {
  //     id: null,
  //     tgId: null,
  //   },
  // ],
});

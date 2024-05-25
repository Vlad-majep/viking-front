// ? constants
import { STATUS, SETTINGS_API } from './../utils/constants';

class MainApi {
  constructor(setting) {
    this._address = setting.baseUrl;
    this._credentials = setting.credentials;
    this._headers = setting.headers;
  }

  // проверка ответа от сервера
  _checkResponse(res, url, message = '', type) {
    // тут проверка ответа
    if (res.ok) {
      // во время dev выводим в консоль
      if (STATUS.DEV)
        console.log(
          `The request to server [${url}]${
            message && ` for [${message}]`
          } was successfully processed`,
        );

      return res.json();
    }

    // остальные ошибки
    const error = res.json();
    return error.then((errorObj) =>
      Promise.reject({
        message: errorObj.error,
        message1: errorObj.message,
        status: res.status,
      }),
    );
  }

  // запрос на сервер
  async _request(url, options, message, type = 'json') {
    const res = await fetch(url, options);
    return this._checkResponse(res, url, message, type);
  }

  // ? GET

  // получение информации о пользователях
  getAllUsersInfo() {
    return this._request(
      `${this._address}/users/all`,
      {
        method: 'GET',
        credentials: this._credentials,
        headers: this._headers,
      },
      'get all users info',
    );
  }

  /* получение информации о пользователе по его id
    tgId = 639071250
  */
  getUserInfoById(tgId) {
    return this._request(
      `${this._address}/users/${tgId}`,
      {
        method: 'GET',
        credentials: this._credentials,
        headers: this._headers,
      },
      'get user info',
    );
  }

  /* получение количества пользователей зарегистрированных в течении последних 24 часа по его id
    tgId = 639071250
  */
  getRegisteredUsersLast24Hours(tgId) {
    return this._request(
      `${this._address}/${tgId}/users/last24HoursRegistered`,
      {
        method: 'GET',
        credentials: this._credentials,
        headers: this._headers,
      },
      'get last register user count',
    );
  }

  /* получение информации о рефералах пользователя по его id
    tgId = 639071250
  */
  getMyReferralsById(tgId) {
    return this._request(
      `${this._address}/${tgId}/myReferrals`,
      {
        method: 'GET',
        credentials: this._credentials,
        headers: this._headers,
      },
      'get my referrals info',
    );
  }

  /* получение информации о реферальной ссылке пользователе по его id
    tgId = 639071250
  */
  getReferralLinkById(tgId) {
    return this._request(
      `${this._address}/${tgId}/referral`,
      {
        method: 'GET',
        credentials: this._credentials,
        headers: this._headers,
      },
      'get referral link',
    );
  }

  /* получение информации о пользовательской подписке по его id
    tgId = 639071250
  */
  getCheckSubscriptionById(tgId) {
    return this._request(
      `${this._address}/${tgId}/checkSubscription`,
      {
        method: 'GET',
        credentials: this._credentials,
        headers: this._headers,
      },
      'check subscription',
    );
  }

  /* получение информации о топ 50 пользователях
   */
  getTopUsersById() {
    return this._request(
      `${this._address}/users/top`,
      {
        method: 'GET',
        credentials: this._credentials,
        headers: this._headers,
      },
      'check subscription',
    );
  }

  /* получение информации о топ 50 пользователях по id пользователя
    tgId = 639071250
  */
  getTopPositionById(tgId) {
    return this._request(
      `${this._address}/${tgId}/position`,
      {
        method: 'GET',
        credentials: this._credentials,
        headers: this._headers,
      },
      'check position in top',
    );
  }

  // ? --- --- --- check subscription --- --- ---

  /* проверка подписка на телеграм по id пользователя
    tgId = 639071250
  */
  checkSubscriptionTg(tgId, nameOfChanel) {
    return this._request(
      `${this._address}/${tgId}/checkSubscription${
        nameOfChanel === 'tapViking_fam' ? 1 : 2
      }`,
      {
        method: 'GET',
        credentials: this._credentials,
        headers: this._headers,
      },
      'check telegram subscription',
    );
  }

  /* проверка подписка на телеграм по id пользователя
    tgId = 639071250
  */
  checkSubscriptionTwitter(tgId) {
    return this._request(
      `${this._address}/${tgId}/TwitterSub`,
      {
        method: 'GET',
        credentials: this._credentials,
        headers: this._headers,
      },
      'check twitter subscription',
    );
  }

  collect(tgId, number) {
    return this._request(
      `${this._address}/${tgId}/collect${number}`,
      {
        method: 'GET',
        credentials: this._credentials,
        headers: this._headers,
      },
      'try to collect money',
    );
  }

  // ? POST

  /* заработок монет для пользователя по его id
    tgId = 639071250
  */
  earnCoin(tgId) {
    return this._request(
      `${this._address}/point`,
      {
        method: 'POST',
        credentials: this._credentials,
        headers: this._headers,
        body: JSON.stringify({
          tgId: tgId,
        }),
      },
      'earn viking coin',
    );
  }

  /* заработок монет для пользователя по его id
    tgId = 639071250,
    nameOfUpgrade = 'energy' // 'mining' или 'energy' или 'weapon'
  */
  upgrade(tgId, nameOfUpgrade) {
    return this._request(
      `${this._address}/upgrade/${nameOfUpgrade}
        `,
      {
        method: 'POST',
        credentials: this._credentials,
        headers: this._headers,
        body: JSON.stringify({
          tgId: tgId,
        }),
      },
      'earn viking coin',
    );
  }
}

// настройки для api
const setting = {
  baseUrl: SETTINGS_API.baseURL,
  credentials: SETTINGS_API.credentials,
  headers: {
    // origin: SETTINGS_API.baseURL,
    'Content-Type': SETTINGS_API.contentType,
  },
};

const mainApi = new MainApi(setting);
export default mainApi;

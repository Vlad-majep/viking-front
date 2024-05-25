/* eslint-disable react-hooks/exhaustive-deps */
// ! modules
import { useEffect, useState, useRef } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';

// ? styles
import s from './App.module.css';

// ? Api
import mainApi from './../Api/Main.api';

// ? components
import Header from './../components/Header/Header';
import Footer from './../components/Footer/Footer';

// ? Context
import { CurrentUserContext } from './../contexts/CurrentUserContext';

// ? pages
import Boost from '../Pages/Boost/Boost';
import Faq from '../Pages/Faq/Faq';
import Home from './../Pages/Home/Home';
import Quests from './../Pages/Quests/Quests';
import Ratings from './../Pages/Ratings/Ratings';
import Referral from './../Pages/Referral/Referral';

// * utils
// ? constants
import { PATHS } from '../utils/constants';
import { numberWithCommas } from '../utils/utils';

function App() {
  const page = useLocation().pathname;
  let interval;

  // ? useState`s
  // current user info
  const [currentUser, setCurrentUser] = useState({});

  // show or not show light
  const [showLight, setShowLight] = useState(false);
  const [showCobblestone, setShowCobblestone] = useState(false);
  const [showCloud, setShowCloud] = useState(false);
  const [showTree, setShowTree] = useState(false);
  const [isUserDataLoaded, setUserDataLoaded] = useState(false);
  const [allUsers, setAllUsers] = useState([]);
  const [topUsers, setTopUsers] = useState([]);
  const [countOffAllUsers, setCountOffAllUsers] = useState();
  const [tgId, setTgId] = useState();
  const [countOfLastRegister, setCountOfLastRegister] = useState(1);
  const [quests, setQuests] = useState([]);

  // ? useEffect`s

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const tgId = urlParams.get('telegramUserId');
    if (tgId) {
      setTgId(tgId);
    }
  }, []);

  // get info of user
  useEffect(() => {
    if (!tgId) return;
    mainApi
      .getUserInfoById(tgId)
      .then((user) => {
        mainApi.getTopPositionById(tgId).then((obj) => {
          const newUser = {
            ...user,
            ...{
              top: obj.position,
            },
          };
          setCurrentUser(newUser);
          setQuests([
            {
              display: !user.collect1,
              name: 'Coins',
              description: `Get ${numberWithCommas(10000)}`,
              reward: 5_000,
              func: (quests, currentUser) => {
                sendRequestMoney(quests, 1, currentUser);
              },
            },
            {
              display: !user.collect2,
              name: 'Coins',
              description: `Get ${numberWithCommas(20000)}`,
              reward: 5_000,
              func: (quests, currentUser) => {
                sendRequestMoney(quests, 2, currentUser);
              },
            },
            {
              display: !user.collect3,
              name: 'Coins',
              description: `Get ${numberWithCommas(100000)}`,
              reward: 25_000,
              func: (quests, currentUser) => {
                sendRequestMoney(quests, 3, currentUser);
              },
            },
            {
              display: !user.subTwitter,
              name: (
                <a
                  href='https://twitter.com/tapViking_app'
                  className='text text text_size_smaller text_weight_thick'
                >
                  Subscribe
                </a>
              ),
              description: 'twitter tapViking_app',
              reward: 5_000,
              func: (quests, currentUser) => {
                sendRequestTwitter(quests, currentUser);
              },
            },
            {
              display: !user.subTg1,
              name: (
                <a
                  href='https://t.me/tapViking_fam'
                  className='text text text_size_smaller text_weight_thick'
                >
                  Subscribe
                </a>
              ),
              description: 'telegram @tapViking_fam',
              reward: 10_000,
              func: (quests, currentUser) => {
                sendRequest(quests, 'tapViking_fam', currentUser);
              },
            },
            {
              display: !user.subTg2,
              name: (
                <a
                  href='https://t.me/tapViking'
                  className='text text text_size_smaller text_weight_thick'
                >
                  Subscribe
                </a>
              ),
              description: 'telegram @tapViking',
              reward: 10_000,
              func: (quests, currentUser) => {
                sendRequest(quests, 'tapViking', currentUser);
              },
            },
          ]);
        });
      })
      .catch((err) => console.log(err))
      .finally(() => {
        mainApi
          .getAllUsersInfo()
          .then((users) => {
            setAllUsers(users);
          })
          .catch((err) => console.log(err))
          .finally(() => {
            mainApi
              .getTopUsersById()
              .then((users) => {
                setTopUsers(users.topUsers);
                setCountOffAllUsers(users.totalUsers);
              })
              .catch((err) => console.log(err))
              .finally(() => {
                mainApi
                  .getRegisteredUsersLast24Hours(tgId)
                  .then(({ registeredUsersCount }) => {
                    setCountOfLastRegister(registeredUsersCount);
                  })
                  .catch((err) => console.log(err))
                  .finally(() => {
                    setUserDataLoaded(true);
                  });
              });
          });
      });
  }, [tgId]);

  useEffect(() => {
    interval = setInterval(() => {
      if (currentUser.energyCurrent + 1 > currentUser.energyMax) {
        return clearInterval(interval);
      }

      const _newUser = {
        ...{
          energyCurrent: currentUser.energyCurrent++,
        },
        ...currentUser,
      };
      setCurrentUser(_newUser);
    }, 1_000);

    return () => {
      clearInterval(interval);
    };
  });

  useEffect(() => {
    setShowLight(!PATHS.cloud.includes(page));
    setShowCloud(PATHS.cloud.includes(page));
    setShowTree(!PATHS.cloud.includes(page));
    setShowCobblestone(!PATHS.cloud.includes(page));
  }, [page]);

  const ref = useRef(null);

  function showNotification(text, error = false) {
    const newElement = document.createElement('div');
    newElement.innerText = text;
    newElement.className = `${s.notification} ${
      error && s.notification_type_error
    } text`;

    newElement.addEventListener('animationend', () => {
      ref.current.removeChild(newElement);
    });

    ref.current.appendChild(newElement);
  }

  function sendRequest(_quests, nameOfChanel, currentUser) {
    mainApi
      .checkSubscriptionTg(tgId, nameOfChanel)
      .then((user) => {
        const _newUser = {
          ...currentUser,
        };
        _newUser.balance = user.balance;

        let index = 0;

        allUsers.forEach((_user, i) => {
          if (_user.id === _newUser.id) {
            index = i;
          }
        });

        _newUser.top = index + 1;

        setCurrentUser(_newUser);

        if (_newUser.top <= 50) {
          const newAllUsers = [...allUsers];
          newAllUsers[index] = _newUser;

          setAllUsers(newAllUsers);
          const newTopUsers = newAllUsers.sort((a, b) => b.balance - a.balance);

          setTopUsers(newTopUsers);
        }
        const updatedData = _quests.map((item) => {
          if (item.description === `telegram @${nameOfChanel}`) {
            item.display = false;
          }
          return item;
        });

        setQuests(updatedData);

        showNotification('Done!');
      })
      .catch((err) => {
        console.error(err);
        showNotification(err.message, true);
      });
  }

  function sendRequestTwitter(_quests, currentUser) {
    mainApi
      .checkSubscriptionTwitter(tgId)
      .then((user) => {
        const _newUser = {
          ...currentUser,
        };
        _newUser.balance = user.balance;

        let index = 0;

        allUsers.forEach((_user, i) => {
          if (_user.id === _newUser.id) {
            index = i;
          }
        });

        _newUser.top = index + 1;

        setCurrentUser(_newUser);

        if (_newUser.top <= 50) {
          const newAllUsers = [...allUsers];
          newAllUsers[index] = _newUser;

          setAllUsers(newAllUsers);
          const newTopUsers = newAllUsers.sort((a, b) => b.balance - a.balance);

          setTopUsers(newTopUsers);
        }

        const updatedData = _quests.map((item) => {
          if (item.description === 'twitter tapViking_app') {
            item.display = false;
          }
          return item;
        });

        setQuests(updatedData);

        showNotification('Done!');
      })
      .catch((err) => {
        console.error(err);
        showNotification(err.message, true);
      });
  }

  function sendRequestMoney(_quests, number, currentUser) {
    mainApi
      .collect(tgId, number)
      .then((user) => {
        const _newUser = {
          ...currentUser,
        };
        _newUser.balance = user.balance;

        let index = 0;

        allUsers.forEach((_user, i) => {
          if (_user.id === _newUser.id) {
            index = i;
          }
        });

        _newUser.top = index + 1;

        setCurrentUser(_newUser);

        if (_newUser.top <= 50) {
          const newAllUsers = [...allUsers];
          newAllUsers[index] = _newUser;

          setAllUsers(newAllUsers);
          const newTopUsers = newAllUsers.sort((a, b) => b.balance - a.balance);

          setTopUsers(newTopUsers);
        }

        const updatedData = _quests.map((item) => {
          if (
            item.description ===
            `${
              number === 1
                ? 'Get 10,000'
                : number === 2
                ? 'Get 20,000'
                : 'Get 100,000'
            }`
          ) {
            item.display = false;
          }
          return item;
        });
        setQuests(updatedData);
        showNotification('Done!');
      })
      .catch((err) => {
        console.error(err);
        showNotification(err.message, true);
      });
  }

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <section className={s.main}>
        <Header />

        <main ref={ref} className={s.container}>
          <Routes>
            <Route
              path={PATHS.main}
              element={
                <Home
                  topUser={topUsers[0]}
                  isUserDataLoaded={isUserDataLoaded}
                  allUsers={allUsers}
                  setAllUsers={setAllUsers}
                  setTopUsers={setTopUsers}
                  setCurrentUser={setCurrentUser}
                />
              }
            />
            {isUserDataLoaded && (
              <>
                <Route
                  path={PATHS.ratings}
                  element={
                    <Ratings
                      users={{
                        all: countOffAllUsers,
                        lastRegister: countOfLastRegister,
                      }}
                      topUsers={topUsers}
                      coins={
                        topUsers &&
                        topUsers.reduce((acc, user, index, array) => {
                          return user && user.balance + acc;
                        }, 0)
                      }
                    />
                  }
                />
                <Route
                  path={PATHS.quests}
                  element={<Quests quests={quests} />}
                />
                <Route
                  path={PATHS.boots}
                  element={
                    <Boost
                      setAllUsers={setAllUsers}
                      setTopUsers={setTopUsers}
                      allUsers={allUsers}
                      setCurrentUser={setCurrentUser}
                    />
                  }
                />
                <Route path={PATHS.referral} element={<Referral />} />
                <Route path={PATHS.faq} element={<Faq />} />
              </>
            )}
          </Routes>
        </main>

        {/* // ? background */}
        {showLight && (
          <div className={`${s.background} ${s.background_url_light}`} />
        )}
        <div className={`${s.background} ${s.background_url_abstraction}`} />
        {showTree && (
          <div className={`${s.background} ${s.background_url_tree}`} />
        )}
        {showCobblestone && (
          <div className={`${s.background} ${s.background_url_cobblestone}`} />
        )}
        {showCloud && (
          <div className={`${s.background} ${s.background_url_cloud}`} />
        )}

        <Footer tgId={tgId} />
      </section>
    </CurrentUserContext.Provider>
  );
}

export default App;

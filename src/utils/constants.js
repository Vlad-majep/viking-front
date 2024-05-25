export const PATHS = {
  cloud: ['/ratings', '/referral', '/boots', '/quests', '/faq', '/claim'],
  main: '/',
  ratings: 'ratings',
  referral: 'referral',
  boots: 'boots',
  quests: 'quests',
  faq: 'faq',
  claim: 'claim',
};

export const STATUS = {
  DEV: true,
};

export const SETTINGS_API = {
  // baseURL: 'http://localhost:4000',
  baseURL: 'https://tapviking.app/api',
  credentials: 'include',
  contentType: 'application/json',
};

export const GAME_SETTINGS = {
  energy: {
    max: (lvl = 1) => lvl * 500,
    increment: 1,
    delay: 1_000,
    maxLevel: 5,
  },
  coins: {
    max: 5_000_000_000,
    forInvite: 10_000,
  },
  weapon: {
    level: 1,
    maxLevel: 3,
  },
  autoMining: {
    level: 0,
    maxLevel: 2,
  },
  backgrounds: ['gold', 'silver', 'bronze'],
};

export const QUESTIONS = [
  {
    question: 'How earn viking coins ?',
    answer: 'On main page you need to click viking',
  },
  {
    question: 'How can I increase my max energy ?',
    answer: 'You can buy an upgrade in page boots for your energy',
  },
  {
    question: 'How can I increase money that I get each click',
    answer: 'You can buy an upgrade in page boots for your weapon',
  },
  {
    question: 'Question 4 ?',
    answer: 'Answer',
  },
  {
    question: 'Question 5 ?',
    answer: 'Answer',
  },
  {
    question: 'Question 6 ?',
    answer: 'Answer',
  },
  {
    question: 'Question 7 ?',
    answer: 'Answer',
  },
  {
    question: 'Question 8 ?',
    answer: 'Answer',
  },
  {
    question: 'Question 9 ?',
    answer: 'Answer',
  },
  {
    question: 'Question 10 ?',
    answer: 'Answer',
  },
];

import { atom } from 'recoil';

export const languageState = atom({
  key: 'languageState', // unique ID (with respect to other atoms/selectors)
  default: 'javascript', // default value (initial state)
});
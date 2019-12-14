import {SAVE_INDEX} from '../types';

export function getIndex(index) {
  let videosPlayed = [];

  const data = [...videosPlayed, index];

  return {
    type: SAVE_INDEX,
    payload: data,
  };
}

import { cloneDeep } from 'lodash';

export const sleep = (ms) => new Promise((r) => setTimeout(r, ms));
export const rand = (num=0, min=0) => Math.floor(Math.random() * (num)) + min;
export const random = (items) => items[rand(items.length)];

export function shuffle<T extends object[]>(array: T): T {
    for (let index = array.length - 1; index > 0; index--) {
        // 무작위 index 값을 만든다. (0 이상의 배열 길이 값)
        const randomPosition = Math.floor(Math.random() * (index + 1));

        // 임시로 원본 값을 저장하고, randomPosition을 사용해 배열 요소를 섞는다.
        const temporary = array[index];
        array[index] = array[randomPosition];
        array[randomPosition] = temporary;
    }
    return array;
}
export type RandomPickItem<T> = [number, T];

/**
 * @function randomPick
 * @description 확률에 따라 랜덤으로 한 개의 아이템을 반환한다
 * @param Array [확률, 아이템] 
 * @returns 아이템
 */
export function randomPick<T extends any>(itemArray: RandomPickItem<T>[]): T {
  let cumulativeProbabilities: [number, T][] = [];
  let cumulativeProbability = 0;

  for (const [probability, item] of itemArray) {
    cumulativeProbability += probability;
    cumulativeProbabilities.push([cumulativeProbability, item]);
  }

  const randomValue = Math.random() * cumulativeProbability;

  for (const [cumulativeProb, item] of cumulativeProbabilities) {
    if (randomValue <= cumulativeProb) {
      return item;
    }
  }

  throw new Error('No item selected.'); // 선택된 아이템이 없는 경우 예외 처리
}
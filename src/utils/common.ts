

export const sleep = (ms) => new Promise((r) => setTimeout(r, ms));
export const rand = (num=0, min=0) => Math.floor(Math.random() * (num)) + min;
export const random = (items) => items[rand(items.length)];
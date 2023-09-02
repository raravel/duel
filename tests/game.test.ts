import {
    Corrosion,
    Cull,
    duel,
    Ghost,
    Meyhem,
    Player,
    ThreeHeadedSnake,
    TwistedFate,
} from '../src';


const p1 = new Player();
p1.name = 'p1';
p1.hash = '1234';
const p2 = new Player();
p2.name = 'p2';
p2.hash = '5678';

const deck1 = [
    ThreeHeadedSnake,
    TwistedFate,
    Meyhem,
    Corrosion,
    Ghost,
    Cull,
]

const deck2 = [
    ...deck1,
    ...deck1,
    ...deck1,
];

deck2.forEach((card) => p1.deckAdd(card));
deck2.forEach((card) => p2.deckAdd(card));

const history = duel(p1, p2);
console.dir(history.history, { maxArrayLength: null });
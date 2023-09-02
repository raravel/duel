import { randomPick } from "../src";


const results: any = {

}
let count = 0;

const run = () => {

    count++;

    const pickedItem = randomPick<string>([
        [50, 'item 1'],
        [25, 'item 2'],
        [20, 'item 3'],
        [4.99, 'item 4'],
        [0.01, 'item 5'],
    ]);
    if ( !results[pickedItem] ) {
        results[pickedItem] = 0;
    }
    results[pickedItem]++;

    setImmediate(run);
};

setImmediate(run);

const calc = (n) => (n * 100 / count).toFixed(2);
setInterval(() => {
    console.clear();
    console.log('total:', count);
    console.log(
    Object.entries(results)
        .map(([key, value]) => `${key}: ${calc(value)}%`)
        .join('\n')
    );
}, 100);

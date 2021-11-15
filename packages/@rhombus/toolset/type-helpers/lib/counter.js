/*


 ***script to generate this:***
 const get = l => Array.from(new Array(2**l).keys()).map(p => p - 2**(l-1)).map(p => p + 1);

var groups = get(12).reduce((seed, current) => {
  const bin = Math.floor(current / 512).toString();
  seed[bin] = seed[bin] || [];
  seed[bin].push(current);
  return seed;
}, {});

var getResult = (power, offset) =>
    Object.entries(
        Array.from(new Array(2**power).keys())
        .reduce((seed, current) => {
            const bin = Math.floor(current / 512).toString();
            seed[bin] = seed[bin] || [];
            seed[bin].push(current);
            return seed;
        }, {})
    )
    .map(([key, value]) => [key, value.map(p => (p+offset).toString().padStart((2**power).toString().length, ' ')).join(',')])
    .sort(([key1], [key2]) => +key1 > +key2 ? 1 : -1)
    .map(([,p]) => p)
    .join(',\n');

copy(`
export type Inc<T extends number> = [
    ${getResult(12,1)}
][T];

export type Dec<T extends number> = [
    ${getResult(12,-1)}
][T];
`)


 */
export {};
//# sourceMappingURL=counter.js.map
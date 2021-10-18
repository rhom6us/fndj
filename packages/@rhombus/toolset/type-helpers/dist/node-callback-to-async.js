export function nodeCallbackToAsync(fn) {
    return (...args) => new Promise((resolve, reject) => {
        fn(...args, (err, result) => {
            if (err) {
                reject(err);
            }
            else {
                resolve(result);
            }
        });
    });
}
//# sourceMappingURL=node-callback-to-async.js.map
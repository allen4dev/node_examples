function asyncAdd(a, b) {
  return new Promise(function(resolve, reject) {
    setTimeout(() => {
      if (typeof a === 'number' && typeof b === 'number') {
        resolve(a + b);
      } else {
        reject('Arguments must be numbers');
      }
    }, 1500);
  });
}

var somePromise = new Promise(function(resolve, reject) {
  setTimeout(() => {
    resolve('Hey, it worked!');
    reject('Unable to fulfill promise');
  }, 2000);
});

asyncAdd(12, '11')
  .then(sum => asyncAdd(sum, 33))
  .then(result => console.log(`Result: ${result}`))
  .catch(console.log);

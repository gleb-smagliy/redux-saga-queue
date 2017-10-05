const debug = false;

export default (...args) => debug ?  console.log('redux-saga-queue:',...args) : undefined;
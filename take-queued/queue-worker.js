import { take, actionChannel, call } from 'redux-saga/effects';

export default function* (workerSelector, pattern)
{
  const channel = yield actionChannel(pattern);

  while (true)
  {
    const action = yield take(channel);
    const { worker, args } = yield call(workerSelector, action.type);

    yield call(worker, action, args);
  }
}

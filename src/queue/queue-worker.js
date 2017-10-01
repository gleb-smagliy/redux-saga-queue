import { take, call } from 'redux-saga/effects';

export default function* (queue)
{
  while (true)
  {
    const action = yield take(queue.channel);
    const { handler, args } = yield call(queue.getActionHandler, action);

    yield call(handler, action, args);
  }
}

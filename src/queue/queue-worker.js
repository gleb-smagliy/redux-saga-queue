import { delay } from 'redux-saga';
import { take, call } from 'redux-saga/effects';
import log from '../log';


export default function* (queue)
{
  log(`started worker`);

  while (true)
  {
    const action = yield take(queue.channel);
    log(`taken ${action.type}`);
    const { handler, args } = yield call(queue.getActionHandler, action);
    yield call(handler, action, args);
    log(`processed ${action.type}`);

    if(queue.postCondition)
    {
      yield take(queue.postCondition);
      log(`taken ${queue.postCondition}`);
    }
  }
}

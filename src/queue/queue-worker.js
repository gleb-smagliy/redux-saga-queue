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
    log(`waiting for patterns: ${JSON.stringify(queue.patterns)}`);
    const { handler, args } = yield call(queue.getActionHandler, action);
    yield call(handler, action, args);
    yield call(delay, 0);
    log(`processed ${action.type}`);

    // if(queue.postCondition)
    // {
    //   log(`waiting for postCondition ${queue.postCondition}`);
    //   yield take(queue.postCondition);
    //   log(`reached postCondition ${queue.postCondition}`);
    // }
  }
}

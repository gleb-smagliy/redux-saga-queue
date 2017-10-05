import { fork, actionChannel } from 'redux-saga/effects';
import { buffers } from 'redux-saga';
import queueWorker from './queue-worker';
import log from '../log';

const INITIAL_BUFFER_SIZE = 50;

export class Queue
{
  constructor({ postCondition })
  {
    this.getActionHandler = this.getActionHandler.bind(this);
    this.isMatch = this.isMatch.bind(this);
    this.checkAction = this.checkAction.bind(this);
    this.addPattern = this.addPattern.bind(this);
    this.postCondition = postCondition;

    this.patterns = {};
    log('creating Queue');
  }

  addPattern(actionType, handler, args)
  {
    this.patterns[actionType] = { handler, args };
  };

  getActionHandler(action)
  {
    this.checkAction(action);

    return this.patterns[action.type];
  };

  isMatch(action)
  {
    this.checkAction(action);

    return Object.keys(this.patterns).indexOf(action.type) !== -1;
  };

  checkAction(action)
  {
    if(!action.type)
    {
      throw new Error("Expected action to have a type field");
    }
  };
}


export function* startQueue(queue, buffer = buffers.expanding(INITIAL_BUFFER_SIZE))
{
  log('calling startQueue');
  queue.channel = yield actionChannel(queue.isMatch, buffer);
  queue.worker = yield fork(queueWorker, queue);
};

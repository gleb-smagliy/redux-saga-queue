import { fork, actionChannel } from 'redux-saga/effects';
import { buffers } from 'redux-saga';
import queueWorker from './queue-worker';

const INITIAL_BUFFER_SIZE = 50;

class Queue
{
  constructor()
  {
    this.getActionHandler = this.getActionHandler.bind(this);
    this.isMatch = this.isMatch.bind(this);
    this.checkAction = this.checkAction.bind(this);
    this.addPattern = this.addPattern.bind(this);

    this.patterns = {};
    this.worker = fork(queueWorker, this);
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

export default function* (buffer = buffers.expanding(INITIAL_BUFFER_SIZE))
{
  const queue = new Queue();
  queue.channel = yield actionChannel(queue.isMatch, );

  return queue;
};

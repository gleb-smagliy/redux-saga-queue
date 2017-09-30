import { fork } from 'redux-saga/effects';
import { addPattern, actionMatcherFactory, workerSelectorFactory } from './queues-utils';
import queueWorker from './queue-worker';

let queuesRegistry = {};
const workersRegistry = {};

export const getQueues = () => queuesRegistry;
export const getWorkers = () => workersRegistry;

export default (pattern, queueName, saga, ...args) =>
{
  queuesRegistry = addPattern(queuesRegistry, queueName, pattern, saga, args);

  let worker = workersRegistry[queueName];

  if (!worker)
  {
    worker = fork(queueWorker,
      workerSelectorFactory(queuesRegistry, queueName),
      actionMatcherFactory(queuesRegistry, queueName));

    workersRegistry[queueName] = worker;
  }

  return worker;
};

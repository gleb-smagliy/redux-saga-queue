import log from '../log';

function* takeQueued(queue, pattern, saga, ...args)
{
  log(`calling takeQueued for '${pattern}'`);

  queue.addPattern(pattern, saga, args);

  return queue.worker;
}

export default takeQueued;

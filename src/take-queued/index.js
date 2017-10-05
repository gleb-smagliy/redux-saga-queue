import log from '../log';

function* takeQueued(queue, pattern, saga, ...args)
{
  log(`calling takeQueued for '${pattern} for ${queue.worker}`);

  queue.addPattern(pattern, saga, args);
}

export default takeQueued;

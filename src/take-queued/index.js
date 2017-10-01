export default (queue, pattern, saga, ...args) =>
{
  queue.addPattern(pattern, saga, args);

  return queue.worker;
};

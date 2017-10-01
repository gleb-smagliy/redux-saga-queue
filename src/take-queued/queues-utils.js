// export const addPattern = (queues, queueName, pattern, worker, args) => (
//   {
//     ...queues,
//     [queueName]:
//       {
//         ...(queues[queueName] || {}),
//         [pattern]: { worker, args }
//       }
//   });
//
// export const workerSelectorFactory = (queues, queueName) => (actionType) =>
// {
//   const patterns = queues[queueName];
//
//   return patterns ? patterns[actionType] : undefined;
// };
//
// export const actionMatcherFactory = (queues, queueName) =>
//   action => queues[queueName] && Object.keys(queues[queueName]).indexOf(action.type) !== -1;

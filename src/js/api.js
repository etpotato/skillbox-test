export default () => new Promise(resolve => {
  if (Math.random() > 0.5) return resolve('ajax success');
  else throw new Error('ajax error');
});

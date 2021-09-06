export default () => new Promise((resolve, reject) => {
  setTimeout(() => {
    if (Math.random() > 0.2) resolve({ok: Math.random() > 0.2});
    else reject(new Error('ajax error'));
  }, 300);
});

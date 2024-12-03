// Retry logic for dynamic imports
const retryImport = <T extends { default: React.ComponentType<any> }>(
  fn: () => Promise<T>,
  retries = 3,
  interval = 1000
): Promise<T> =>
  new Promise((resolve, reject) => {
    const attempt = () => {
      fn()
        .then(resolve)
        .catch((error) => {
          if (retries === 0) {
            reject(error);
          } else {
            setTimeout(() => {
              retries--;
              attempt();
            }, interval);
          }
        });
    };
    attempt();
  });

export { retryImport };
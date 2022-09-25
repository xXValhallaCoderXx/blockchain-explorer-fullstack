export const delay = (time) =>
  new Promise((resolve) => {
    setTimeout(() => {
      resolve(null);
    }, time | 500);
  });

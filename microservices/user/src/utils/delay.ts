export const delay = (delay = 500) =>
  new Promise((resolve) => setTimeout(resolve, delay));

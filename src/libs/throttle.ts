export const throttle = <T extends any[]>(func: (...args: T) => void, delay: number) => {
  let inProgress = false;

  return (...args: T) => {
    if (inProgress) {
      return;
    }
    inProgress = true;

    setTimeout(() => {
      func(...args); // Consider moving this line before the set timeout if you want the very first one to be immediate
      inProgress = false;
    }, delay);
  };
};

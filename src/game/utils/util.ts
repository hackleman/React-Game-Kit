/* eslint-disable @typescript-eslint/no-unused-vars */

export function throttle<T extends (...args: number[]) => void>(
    func: T,
    interval: number
  ): (...args: Parameters<T>) => void  {
    let lastCallTime = 0;

    return function(...args: Parameters<T>) {
        const now = Date.now();

        if (now - lastCallTime >= interval) {
            func(...args);
            lastCallTime = now;
        }
    }
}
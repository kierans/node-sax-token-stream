/**
 * Merges two objects into a new object
 * @param a First object to merge
 * @param b Second object to merge
 * @returns A new object containing properties from both a and b
 */
export function assign2<T, U>(a: T, b: U): T & U;

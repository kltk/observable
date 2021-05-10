import { Assign } from './types';

export type Extend<O, A> = A extends [infer A1, ...infer A2]
  ? Extend<Assign<O, A1>, A2>
  : O;

export function extend<F extends object, R extends object[]>(
  first: F,
  ...rest: R
): Extend<F, R> {
  const descs = rest.map((item) => Object.getOwnPropertyDescriptors(item));
  return Object.defineProperties(first, Object.assign({}, ...descs)) as any;
}

export class Left<T> {
  tag = 'left' as const;
  constructor(public value: T) { }
}
export class Right<T> {
  tag = 'right' as const;
  constructor(public value: T) { }
}
export type Either<T, T1> = Left<T> | Right<T1>;
export const left = <T>(v: T) => new Left(v);
export const right = <T>(v: T) => new Right(v);
export const isLeft = <T, T1>(e: Either<T, T1>): e is Left<T> => e.tag === 'left';
export const isRight = <T, T1>(e: Either<T, T1>): e is Right<T1> => e.tag === 'right';
export const matchW = <T, T1, T2, T3> (fnL: (e:T) => T2, fnR: (e:T1) => T3) => (e: Either<T,T1>) =>
  isLeft(e) ? fnL(e.value) : fnR(e.value);
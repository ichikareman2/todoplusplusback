export class Left<T> {
  tag = 'left' as const;
  constructor(public value: T) {}
}
export class Right<T> {
  tag = 'right' as const;
  constructor(public value: T) {}
}
export type Either<T,T1> = Left<T> | Right<T1>;

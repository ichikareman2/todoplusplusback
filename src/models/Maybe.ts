export class Nothing {
  tag = 'nothing' as const;
}
export class Just<T> {
  tag = 'just' as const;
  constructor(public value: T) {}
}
export type Maybe<T> = Nothing | Just<T>;
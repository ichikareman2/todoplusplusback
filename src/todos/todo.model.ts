import {t} from '@marblejs/middleware-io'

export const Todo = t.type({
  id: t.string,
  name: t.string,
  done: t.boolean
})
export type Todo = t.TypeOf<typeof Todo>

export const TodoAddRequest = t.type({
  name: t.string
})
export type TodoAddRequest = t.TypeOf<typeof TodoAddRequest>

export const TodoUpdateRequest = t.type({
  id: t.string,
  name: t.union([t.string, t.null, t.undefined]),
  done: t.union([t.boolean, t.null, t.undefined])
})
export type TodoUpdateRequest = t.TypeOf<typeof TodoUpdateRequest>
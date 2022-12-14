import {t} from '@marblejs/middleware-io'

export const Todo = t.type({
  id: t.string,
  name: t.string,
  done: t.boolean
})
export type Todo = t.TypeOf<typeof Todo>

export const TodoAdd = t.type({
  name: t.string
})
export type TodoAdd = t.TypeOf<typeof TodoAdd>
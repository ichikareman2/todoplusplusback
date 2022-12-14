import {r, HttpEffect, combineRoutes} from '@marblejs/http'
import { pipe } from 'rxjs'
import {either} from 'fp-ts'
// import * as E from '../models/Either'
import {map, mergeMap} from 'rxjs/operators'
import { addTodo$, fetchAllTodos$ } from './todo-data'
import {requestValidator$, t} from '@marblejs/middleware-io'
import { Todo, TodoAdd } from './todo.model'

// export const todoEffect$ = r.pipe(
//   r.matchPath('/'),
//   r.matchType('GET'),
//   r.useEffect(req$ => req$.pipe(
//     map(req => ({body: {test: 'test'}}))
//   ))
// )

const todoGet$ = r.pipe(
  r.matchPath('/'),
  r.matchType('GET'),
  r.useEffect(req$ => req$.pipe(
    mergeMap(fetchAllTodos$),
    map(either.matchW(
      e => ({
        status: 500,
        body: {message: e},
        error: ''
      }),
      todos => ({
        body: {todos}
      })
    ))
  ))
)
const todoPost$ = r.pipe(
  r.matchPath('/'),
  r.matchType('POST'),
  r.useEffect(req$ => req$.pipe(
    requestValidator$({
      body: TodoAdd
    }),
    mergeMap(({body}) => addTodo$(body.name)),
    map(either.matchW(
      e => ({
        status: 500,
        body: {message: e},
        error: ''
      }),
      todo => ({
        body: {todo}
      })
    ))
  ))
)

const todoPut$ = r.pipe(
  r.matchPath('/'),
  r.matchType('PUT'),
  r.useEffect(req$ => req$.pipe(
    requestValidator$({
      body: TodoAdd
    }),
    mergeMap(({body}) => addTodo$(body.name)),
    map(either.matchW(
      e => ({
        status: 500,
        body: {message: e},
        error: ''
      }),
      todo => ({
        body: {todo}
      })
    ))
  ))
)

export const todoEffects$ = combineRoutes('/todos', {
  effects: [
    todoGet$,
    todoPost$
  ]
})
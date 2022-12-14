import db from '../db'
import {either} from 'fp-ts'
// import * as E from '../models/Either'

import { Todo } from './todo.model'
import {Observable} from 'rxjs'
import * as crypto from 'crypto'

const tbl = 'todos'
export const fetchAllTodos$ = () => new Observable<either.Either<Error, Todo[]>>((sub) => {
  db.all(`SELECT * FROM ${tbl}`, (err: Error, rows: Todo[]) => {
    if (err) {
      sub.error(either.left(err))
    } else {
      sub.next(either.right(rows))
    }
    sub.complete()
  })
})

export const updateTodoName$ = (id: Todo['id'], name: Todo['name']) => new Observable<either.Either<Error, Todo>>((sub) => {
  db.get(
    `UPDATE ${tbl} SET name = ? WHERE id = ?; SELECT * FROM ${tbl} WHERE id = ?`,
    [name, id, id],
    (err: Error, row: Todo) => {
    if (err) {
      sub.error(either.left(err))
    } else if (!row) {
      sub.error(either.left(new Error('No record found!')))
    } else {
      sub.next(either.right(row))
    }
    sub.complete()
  })
})

export const addTodo$ = (name: Todo['name']) => new Observable<either.Either<Error, Todo>>(sub => {
  const id = crypto.randomUUID()
  db.get(
    `INSERT INTO ${tbl} {id, name, done} VALUES (?, ?, ?); SELECT * FROM ${tbl} WHERE id = ?`,
    [id, name, 0, id],
    (err, row) => {
      if (err) {
        sub.error(either.left(err))
      } else if (!row) {
        sub.error(either.left(new Error('Record not added!')))
      } else {
        sub.next(either.right(row))
      }
      sub.complete()
    }
  )
})

export const deleteTodo$ = (id: Todo['id']) => new Observable<either.Either<Error, boolean>>(sub => {
  db.run(
    `DELETE FROM ${tbl} WHERE id = ?`,
    [id],
    (err) => {
      if (err) {
        sub.error(either.left(err))
      } else {
        sub.next(either.right(true))
      }
      sub.complete()
    }
  )
})
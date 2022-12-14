// import fastifyDefault from 'fastify';
// import todosRoute from './todos/todos'

// const fastify = fastifyDefault({logger: true});

// fastify.get('/', async (req, res) => res.callNotFound());
// fastify.register(todosRoute)

// const start = async () => {
//   try {
//     await fastify.listen({port: 3001})
//   } catch (err) {
//     fastify.log.error(err)
//     process.exit(1)
//   }
// }
// start()

import {httpListener} from '@marblejs/http'
import {logger$} from '@marblejs/middleware-logger'
import {bodyParser$} from '@marblejs/middleware-body'
import { todoEffects$ } from './todos/todo.effect'
import { createServer } from '@marblejs/http'
import {IO} from 'fp-ts/lib/IO'
const middlewares = [
  logger$(),
  bodyParser$()
]

const effects = [
  todoEffects$
]
export const listener = httpListener({
  middlewares,
  effects
});

const server = createServer({
  port: 3001,
  hostname: '127.0.0.1',
  listener
})

const main: IO<void> = async () => await (await server)();

main();
import fastifyDefault from 'fastify';
import todosRoute from './todos/todos'

const fastify = fastifyDefault({logger: true});

fastify.get('/', async (req, res) => res.callNotFound());
fastify.register(todosRoute)

const start = async () => {
  try {
    await fastify.listen({port: 3001})
  } catch (err) {
    fastify.log.error(err)
    process.exit(1)
  }
}
start()
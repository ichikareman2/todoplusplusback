// import { FastifyPluginCallback } from "fastify"
// import {match} from 'ts-pattern'
// import { fetchAllTodos$ } from "./todo-data";

// const todosRoute:  FastifyPluginCallback =
//   (fastify, options) =>
//     fastify.get('/todos', (req, res) => {
//       fetchAllTodos$().subscribe(x => 
//         match(x)
//           .with({tag: 'left'}, either => res.status(500).send({message: either.value}))
//           .with({tag: 'right'}, either => res.send({data: either.value}))
//           .exhaustive()
//       )
//     })
// export default todosRoute
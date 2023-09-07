import { fastify } from 'fastify';
// import { DatabaseMemory } from './database-memory.js';
import { DatabasePostgres } from './database-postgres.js';

const server = fastify();

// const database = new DatabaseMemory();
const database = new DatabasePostgres();

server.post('/videos', async (request, response) => {
  const { title, description, duration } = request.body;

  await database.create({
    title: title,
    description: description,
    duration: duration
  })

  return response.status(201).send();
})

server.get('/videos', async (request, response) => {
  const search = request.query.search;

  const videos = await database.list(search);

  return videos;
})

server.put('/videos/:id', async (request, response) => {
  const videoId = request.params.id;
  const { title, description, duration } = request.body;

  await database.update(videoId, {
    title: title,
    description: description,
    duration: duration
  })

  return response.status(204).send();
})

server.delete('/videos/:id', async (request, response) => {
  const videoId = request.params.id;

  await database.delete(videoId);

  return response.status(204).send();
})

server.listen({
  host: '0.0.0.0',
  port: process.env.PORT ?? 3333
});
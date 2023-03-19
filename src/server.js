import { fastifyView } from '@fastify/view';
import fastifyStatic from '@fastify/static';
import fastifySecureSession from '@fastify/secure-session';
import fastify from 'fastify';
import ejs from 'ejs';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';
import { readFileSync } from 'node:fs';
import {
  createPost,
  deletePost,
  listPosts,
  showPost,
} from './actions/posts.js';
import { RecordNotFoundError } from './errors/RecordNotFoundError.js';
import fastifyFormbody from '@fastify/formbody';
import { logInAction, logOutAction } from './actions/auth.js';
import { NotAuthenticatedError } from './errors/NotAuthenticatedError.js';

const app = fastify();
const rootDir = dirname(dirname(fileURLToPath(import.meta.url)));

app.register(fastifyView, {
  engine: {
    ejs,
  },
});

app.register(fastifyStatic, {
  root: join(rootDir, 'public'),
});

app.register(fastifyFormbody);

app.register(fastifySecureSession, {
  cookieName: 'session',
  key: readFileSync(join(rootDir, 'secret_key')),
  cookie: {
    path: '/',
  },
});

app.get('/', listPosts);
app.post('/', createPost);
app.get('/login', logInAction);
app.post('/login', logInAction);
app.post('/logout', logOutAction);
app.get('/article/:id', showPost);
app.get('/supprimer/:id', deletePost);

app.setErrorHandler((error, req, res) => {
  if (error instanceof RecordNotFoundError) {
    res.statusCode = 404;
    return res.view('templates/404.ejs', {
      error: error.message,
    });
  } else if (error instanceof NotAuthenticatedError) {
    return res.redirect('/login');
  }
  console.error(error);
  return {
    error: error.message,
  };
});

const start = async () => {
  try {
    await app.listen({ port: 8888 });
  } catch (e) {
    console.error(e);
    process.exit(1);
  }
};

start();

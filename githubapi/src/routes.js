import { Router } from 'express';

import TokenController from './app/controllers/TokenController';
import UserController from './app/controllers/UserController';
import RepositoryController from './app/controllers/RepositoryController';
import FollowerController from './app/controllers/FollowerController';
import StarController from './app/controllers/StarController';

import tokenMiddleware from './app/middlewares/auth';

const routes = new Router();

routes.post('/login', TokenController.create);
routes.post('/users', UserController.create);

//Acessar perfil do usuário
routes.get('/users/:username', UserController.indexByName);

//Encontra todos os seguidores de um usuário
routes.get('/:id/followers', FollowerController.indexFollowers);

//Encontra todas as pessoas que o usuário segue
routes.get('/:id/following', FollowerController.indexFollowing);

//Buscar repositório
routes.get('/repository/:id', RepositoryController.getById);


//Apenas usuários logados podem acessar:
routes.use(tokenMiddleware);


//User
routes.put('/users', UserController.update);
routes.delete('/users', UserController.remove);

//Repository
routes.post('/repository', RepositoryController.create);
routes.put('/repository/:id', RepositoryController.update);
routes.delete('/repository/:id', RepositoryController.remove);

//Follower
routes.post('/follow/:id', FollowerController.create);
routes.delete('/followers/:id', FollowerController.remove);

//Star
routes.post('/repository/:id/star', StarController.create);
routes.delete('/repository/:id/star', StarController.remove);

export default routes;
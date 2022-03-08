import express, { response } from 'express';
import routes from './routes';
import cors from 'cors';

const app = express();

app.use(cors()); // frontend com endereço diferente acessar API
app.use(express.json());
app.use(routes);

app.listen(3333);

// Corpo (Request Body): Dados para criação ou atualização de um registro
// Route Params: Identificar qual recurso eu quero atualizar ou deletar /1 /:id
// Query params: Paginação, filtros, ordenação ?page=2&sort=name

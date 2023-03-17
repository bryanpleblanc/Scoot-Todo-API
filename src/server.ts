import App from '@/app';
import { IndexController } from '@controllers/index.controller';
import { TodosController } from '@controllers/todo.controller';
import validateEnv from '@utils/validateEnv';

validateEnv();

const app = new App([IndexController, TodosController]);
app.listen();

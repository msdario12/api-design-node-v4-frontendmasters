import express from 'express';
import router from './router';
import morgan from 'morgan';
import cors from 'cors';
import { protect } from './modules/auth';
import { createNewUser, signIn } from './handlers/user';
const app = express();
// Todos los middlewre van antes de las routes
app.use(cors());
app.use(morgan('dev'));
// Permite al cliente enviar JSON
app.use(express.json());
// Permite añadir parametros en las querys
app.use(express.urlencoded({ extended: true }));

// Todos los midleware que esten registrados despues del que creamos, tienen acceso adicho mdw
app.get('/', (req, res) => {
	console.log('hello from express');
	res.status(200);
	res.json({ message: 'hello' });
});

app.use('/api', protect, router); //Protect only below

app.post('/user', createNewUser);
app.post('/sigin', signIn);
export default app;

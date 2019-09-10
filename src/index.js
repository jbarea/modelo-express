import uuidv4 from 'uuid/v4';
import 'dotenv/config';
import cors from 'cors';
import express from 'express';
import models from './models';
import routes from './routes';

const app = express();
app.use(cors());

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use((req, res, next) => { //este middleware lo que hace es definir al usuario que tendra privilegios en las sesion(mas o menos)
    req.context = {
        models,
        me: models.users[2],
    };
    //req.me = users[1];
    next();
});

app.listen(process.env.PORT, () =>
    //las dos formas sirven para mostrare el contenido de la variable de entorno por consola 
    //console.log("Aplicacion escuchando en el puerto %s",process.env.PORT),
    console.log(`Aplicacion escuchando en el puerto ${process.env.PORT}!`),
);

app.use('/session', routes.session);
app.use('/users', routes.user);
app.use('/messages', routes.message);

/* app.get('/', (req,res) => 
    res.send('Hola mundo!!!!')
); */


//console.log("prueba server");
//console.log(process.env.PORT);

import uuidv4 from 'uuid/v4';
import 'dotenv/config';
import cors from 'cors';
import express from 'express';
import models, { connectDb } from './models';
import routes from './routes';

const app = express();
app.use(cors());

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

/* app.use((req, res, next) => { //este middleware lo que hace es definir al usuario que tendra privilegios en las sesion(mas o menos)
    req.context = {
        models,
        me: models.users[1],
    };
    //req.me = users[1];
    next();
}); */
app.use(async (req, res, next) => {
    req.context = {
        models,
        me: await models.User.findByLogin('rwieruch'),
    };
    next();
});

const eraseDatabaseOnSync = true;

connectDb().then(async () => {
    //esta condicional es por si queremos inicializar la base de datos cada vez que arrancamos la aplicacion
    if (eraseDatabaseOnSync) {
        await Promise.all([
            models.User.deleteMany({}),
            models.Message.deleteMany({}),
        ]);
        createUsersWithMessages();
    }

    app.listen(process.env.PORT, () => 
        console.log(`Aplicacion escuchando en el puerto ${process.env.PORT}!`),
    );
});

const createUsersWithMessages = async () => {
    const user1 = new models.User({
        username: 'rwieruch',
    });

    const user2 = new models.User({
        username: 'ddavids',
    });

    const message1 = new models.Message({
        text: 'Published the Road to learn React',
        user: user1.id,
    });

    const message2 = new models.Message({
        text: 'Happy to release ...',
        user: user2.id,
    });

    const message3 = new models.Message({
        text: 'Published a complete ...',
        user: user2.id,
    });

    await message1.save();
    await message2.save();
    await message3.save();

    await user1.save();
    await user2.save();
};

/* app.listen(process.env.PORT, () =>
    //las dos formas sirven para mostrare el contenido de la variable de entorno por consola 
    //console.log("Aplicacion escuchando en el puerto %s",process.env.PORT),
    console.log(`Aplicacion escuchando en el puerto ${process.env.PORT}!`),
); */

app.use('/session', routes.session);
app.use('/users', routes.user);
app.use('/messages', routes.message);

/* app.get('/', (req,res) => 
    res.send('Hola mundo!!!!')
); */


//console.log("prueba server");
//console.log(process.env.PORT);

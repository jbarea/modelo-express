import { Router } from 'express';

const router = Router();

/* router.get('/', (req, res) => {
    return res.send(Object.values(req.context.models.users));
}); */
router.get('/', async (req, res) => {
    const users = await req.context.models.User.find();
    return res.send(users);
});

/* router.get('/:userId', (req, res) => {
    return res.send(req.context.models.users[req.param.user.id]);
}); */
router.get('/:userId', async (req, res) => {
    const user = await req.context.models.User.findById(
        req.params.userId,
    );
    return res.send(user);
});

export default router;
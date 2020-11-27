import * as Yup from 'yup';

import User from '../models/User';
import Repository from '../models/Repository';
import Follower from '../models/Follower';
import Star from '../models/Star';

class UserController {
    async create(req, res) {
        const schema = Yup.object().shape({
            name: Yup.string().required(),
            username: Yup.string().required(),            
            email: Yup.string().email().required(),
            bio: Yup.string(),            
            avatar: Yup.string(),            
            local: Yup.string(),            
        });

        if (!(await schema.isValid(req.body)))
            return res.status(400).json({ error: 'Verifique todos os campos antes de enviar!' });

        const existingUser = await User.findOne({ where: { email: req.body.email } });

        if (existingUser)
            return res.status(400).json({ error: 'Usuário já está cadastrado!' });

        const { id, name, username, email, bio, avatar, local } = await User.create(req.body);

        return res.json({
            data: {
                user: {
                    id,
                    name,
                    username,
                },
                msg: "Usuário cadastrado com sucesso!"
            },
        })
    }

    async update(req, res) {
        const schema = Yup.object().shape({
            name: Yup.string(),
            username: Yup.string().required(),            
            email: Yup.string().email(),
            bio: Yup.string(),            
            avatar: Yup.string(),            
            local: Yup.string(),            
        });

        if (!(await schema.isValid(req.body)))
            return res.status(400).json({ error: 'Verifique todos os campos antes de enviar!' });

        const user = await User.findByPk(req.session.token.user_id);

        const { id, name, username } = await user.update(req.body);

        return res.json({
            id,
            name,
            username,
        })
    }

    async indexByName(req, res) {
        const username = req.params.username;

        const user = await User.findOne({
            where: { username: username },
            attributes: ['id', 'name', 'username', 'bio', 'email', 'avatar', 'local'],
        })

        const repositories = await Repository.findAndCountAll({
            where: { user_id: user.id },
            attributes: ['id', 'name', 'description'],
            include: [{
                model: Star,
                as: 'follower',
                attributes: ['id', 'follower_id'],
            }]
        })

        const following = await Follower.count({
            where: { follower_id: user.id }
        });

        const follower = await Follower.count({
            where: { user_id: user.id }
        });

        return res.json({
            user: user,
            repositories: repositories,
            following: following,
            follower: follower,
        })
    }

    async remove(req, res) {
        const user = await User.findByPk(req.session.token.user_id);

        const deletedUser = await user.destroy({
            where: { id: user.id },
        });

        return res.json({ msg: 'Usuário excluído com sucesso' })
    }
}

export default new UserController();
import * as Yup from 'yup';
import slugify from 'slugify';

import User from '../models/User';
import Repository from '../models/Repository';

class RepositoryController {
    async create(req, res) {
        const schema = Yup.object().shape({
            name: Yup.string().required(),
            description: Yup.string(),
            is_private: Yup.boolean(),        
        });

        const userId = req.session.token.user_id;

        if (!(await schema.isValid(req.body)))
            return res.status(400).json({ error: 'Preencha todos os campos' });

        const userFromDB = await User.findByPk(userId);

        const slugLink = `localhost:3333/${userFromDB.username}/${slugify(req.body.name)}`;
        
        const { id, name, description, is_private } = req.body

        const repoExists = await Repository.findOne({ where: { user_id: userId, slug: slugLink }});

        if (repoExists)
            return res.status(400).json({ error: 'Usuário já possui um repositório com esse nome' });

        const repository = await Repository.create({
            user_id: userId,
            name: name,
            description: description,
            is_private: is_private,
            slug: slugLink,
        })

        return res.json({
            id,
            userId,
            name,
            description,
            slugLink,
        })
    }

    async update(req, res) {
        const schema = Yup.object().shape({
            name: Yup.string().required(),
            description: Yup.string(),
            is_private: Yup.boolean(),        
        });

        const userId = req.session.token.user_id;
        const repoId = req.params.id;

        if (!(await schema.isValid(req.body)))
            return res.status(400).json({ error: 'Preencha todos os campos' });

        const userFromDB = await User.findByPk(userId);

        const slugLink = `localhost:3333/${userFromDB.username}/${slugify(req.body.name)}`;
        
        const { name, description, is_private } = req.body

        const repository = await Repository.update(req.body, {
            where: { id: repoId }
        })

        return res.json({
            userId,
            name,
            description,
            is_private,
            slugLink,
        })
    }

    async getById(req, res) {
        const repoId = req.params.id;

        const repository = await Repository.findOne({
            where: { id: repoId },
            attributes: ['id', 'name', 'description', 'slug'],
            include: [{
                model: User,
                as: 'user',
                attributes: ['id', 'name', 'username'],
            }]
        })

        return res.json(repository);
    }

    async remove(req, res) {
        const repoId = req.params.id;

        const deletedRepo = await Repository.destroy({
            where: { id: repoId },
        })

        return res.json({ msg: 'Repositório excluído com sucesso' });
    }
}

export default new RepositoryController();
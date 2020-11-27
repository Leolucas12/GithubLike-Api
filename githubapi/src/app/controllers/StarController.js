import Repository from '../models/Repository';
import Star from '../models/Star';
import User from '../models/User';
import Repository from '../models/Repository';

class StarController {
    async create(req, res) {
        const userId = req.session.token.user_id;

        const repositoryId =  parseInt(req.params.id);

        const star = await Star.create({
            follower_id: userId,
            repository_id: repositoryId,
        })

        return res.json({
            follower: userId,
            repository: repositoryId,
        });
    }

    async remove(req, res) {
        const repoId = req.params.id;

        const userId = req.session.token.user_id;

        const unstar = await Star.destroy({
            where: { follower_id: userId, repository_id: repoId },
        })

        return res.json({ msg: 'Ok' })
    }
}

export default new StarController();
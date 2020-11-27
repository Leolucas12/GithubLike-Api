import Follower from '../models/Follower';
import Following from '../models/Following';
import User from '../models/User';

class FollowerController {
    async create(req, res) {
        const userId = req.session.token.user_id;

        const newFollower = await Follower.create({
            user_id: req.params.id,
            follower_id: userId,
        })

        const newFollowing = await Following.create({
            user_id: userId,
            following_id: req.params.id,
        })

        return res.json({
            follower: newFollower.user_id,
            following: newFollower.follower_id,
        });
    }

    async indexFollowers(req, res) {
        const userId = req.params.id;

        const followers = await Follower.findAndCountAll({
            where: { user_id: userId },
            attributes: ['user_id', 'follower_id'],
            include: {
                model: User,
                as: 'follower',
                attributes: ['id', 'name', 'username'],
            }
        })

        return res.json(followers);
    }

    async indexFollowing(req, res) {
        const userId = req.params.id;

        const followers = await Following.findAndCountAll({
            where: { user_id: userId },
            attributes: ['user_id', 'following_id'],
            include: {
                model: User,
                as: 'following',
                attributes: ['id', 'name', 'username'],
            }
        })

        return res.json(followers);
    }

    async remove(req, res) {
        const userId = req.session.token.user_id;

        const unfollow = await Follower.destroy({
            where: { follower_id: userId },
        })

        const unfollowing = await Following.destroy({
            where: { user_id: userId },
        })

        return res.json({ msg: 'ok' });
    }
}

export default new FollowerController();
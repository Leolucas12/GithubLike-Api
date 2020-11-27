import * as Yup from 'yup';
import { formatRelative, subDays } from 'date-fns';
import pt from 'date-fns/locale/pt'

import Token from '../models/Token';
import User from '../models/User';

class TokenController {
    async create(req, res) {
        const schema = Yup.object().shape({
            username: Yup.string().required(),           
        });

        if (!(await schema.isValid(req.body)))
            return res.status(400).json({ error: 'Campo obrigatório' });

        const existingUser = await User.findOne({ where: { username: req.body.username } });

        if (!existingUser)
            return res.status(400).json({ error: 'Usuário não encontrado' });

        const token = await Token.create({
            user_id: existingUser.id,
            date: Date.now(),
        })

        req.session.token = token;

        return res.json({
            data: {
                token: {
                    user_id: token.user_id,
                    date: token.date,
                },
            },
        })
    }
}

export default new TokenController();
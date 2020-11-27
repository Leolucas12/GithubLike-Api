export default (req, res, next) => {
    if (req.session.token != undefined) {
        next();
    } else {
        res.status(401).json({ error: 'Faça login para continuar' });
    }
}
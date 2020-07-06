module.exports = async (req, res, next) => {
    req.query.page = parseInt(req.query.page) || 1;
    req.query.limit = 10;
    req.query.offset = (req.query.page - 1) * req.query.limit

    await next();
}

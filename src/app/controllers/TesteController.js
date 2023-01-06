class TesteController {
    async index(req, res){
        return res.json({
            teste: req.loggeds
        })
    }
}

module.exports = new TesteController()
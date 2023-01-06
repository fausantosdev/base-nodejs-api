class CustomException {
    constructor (message, code = 200) {
        this.message = message
        this.code = code
    }
}
module.exports = CustomException
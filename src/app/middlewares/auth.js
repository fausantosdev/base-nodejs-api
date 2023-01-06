const jwt = require('jsonwebtoken')
const { promisify } = require('util')

const authConfig  = require('../../config/auth')

const verifyToken = async (req, res, next) => {
  const authHeader = req.headers.authorization

  if (!authHeader) {
      return res.status(401).json({ 
          status: false,
          data: null,
          message: 'Token not provided' 
      })
  }

  const token = authHeader.split(' ')[1]

  try {
    const decoded = await promisify(jwt.verify)(token, authConfig.secret)

    req.user = decoded.user

    return next()
  } catch (err) {
    return res.status(401).json({
       status: false,
       data: null,
       message: err.message
    })
  }
}

const isAdmin = (req, res, next) => {
  verifyToken(req, res, () => {
    try {
      if(req.user.is_admin){
        return next()
      }else{
        return res.json({
          status: false,
          data: null,
          message: 'Restricted'
        })
      }
    } catch (err) {
      return res.status(401).json({
         status: false,  
         data: null,
         message: err.message
      })
    }
  })
}

const checkUserOrIsAdmin = (req, res, next) => {
  verifyToken(req, res, () => {
    try {
      if(req.user.id == req.params.id || req.user.is_admin){
        return next()
      }else{
        return res.json({
          status: false,
          data: null,
          message: 'Restricted'
        })
      }
    } catch (err) {
      return res.status(401).json({
         status: false,  
         data: null,
         message: err.message
      })
    }
  })
}

module.exports = {
  verifyToken,
  isAdmin,
  checkUserOrIsAdmin
}
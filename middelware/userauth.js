const checkAdmin = (req, res, next) => {
    if (req.user.role === 'admin') {
      next();
    } else {
      res.status(403).send('Not Allowed');
    }
  }


  
  const checkUser = (req, res, next) => {
    if  ( req.user.role=== 'user') {
      next();
    } else {
      res.status(403).send('Not Allowed');
    }
  }
  
  const checkRole = (req, res, next) => {
    if (req.user.role=== 'admin' ||   req.user.role === 'user') {
      next();
    } else {
      res.status(403).send('Not Allowed');
    }
  }
const checkS=(roles)=>async(req,res,next)=>{
!roles.includes(req.user.role)
?res.status(400).json('soryy u don not have access to this route'):next();


}

const roles={
  admin:['create','read','update','delete'],
  user:['read','update']
}
const checkPRole = (permission) => async (req, res, next) => {

  if (!roles[req.user.role].includes(permission)) {
    return res.status(403).send('Access denied');
  }
  next();
};
  module.exports={checkRole, checkUser ,checkAdmin,checkS,checkPRole} 
  
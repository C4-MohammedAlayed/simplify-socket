const connection =require(`../db/db`)
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
//login Function

const login =(req,res)=>{
  const password =req.body.password
    const email = req.body.email.toLowerCase();
    const data =[email]
const query = `SELECT * FROM user INNER JOIN roles ON user.roleId=roles.roleId WHERE email=?`;

connection.query(query, data, (err, results) => {
  if (err) {
    res.status(404).json({
      success: false,
      message: `The email doesn't exist`,
      err,
    });
  }
  // result are the data returned by mysql server
  if (results.length > 0) {
    bcrypt.compare(password, results[0].password, (err, respons) => {
      if (err) res.json(err);
      if (respons) {
        const paylod = {
          userId: results[0].userId,
          userName: results[0].userName,
          role: results[0].roleId,
        };

        const secret = process.env.SECRET;

        const token = jwt.sign(paylod, secret);

        res.status(200).json({
          success: true,
          message: "Valid login credentials",
          token,
          userName: results[0].userName,
          role: results[0].roleId,
          userId:results[0].userId,
        });
      } else {
        res.status(403).json({
          success: false,
          message: `The password you’ve entered is incorrect`,
          err,
        });
      }
    });
  } else {
    res
      .status(404)
      .json({ success: false, message: "The email doesn't exist", err });
  }
});
};

module.exports = {
login,
};

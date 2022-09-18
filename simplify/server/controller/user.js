const connection = require(`../db/db`);
const bcrypt = require("bcrypt");
//function to create user

const createUser = async (req, res) => {
  const { name, password, email, gender, roleId } = req.body;
  const salt = 10;
  const hashPassword = await bcrypt.hash(password, salt);

  const data = [name, hashPassword, email, gender, roleId];
  const query = `INSERT INTO user (name,password,email,gender,roleId) VALUES (?,?,?,?,?)`;
  connection.query(query, data, (err, result) => {
    if (err) {
      return res.status(500).json({
        success: "false",
        massage: "server error",
        err: err,
      });
    }
    return res.status(201).json({
      success: "true",
      massage: "Success user created",
      result: result,
    });
  });
};

const getAllUsers=(req,res)=>{
const query =`SELECT * FROM user WHERE is_deleted=0`;

connection.query(query,(err,results)=>{
    if (err) {
        return res.status(500).json({
            success:"false",
            message:"server err",
            err:err
        })
    }
    console.log(results);
    return res.status(200).json({
        success:"true",
        message:"All users",
        results:results
    })
})
}
module.exports = {
  createUser,
  getAllUsers
};

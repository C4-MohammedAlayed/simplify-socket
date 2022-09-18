const connection = require("../db/db");


//function to create a new role

const createRole =(req,res)=>{
    const {role}=req.body;
    const query =`INSERT INTO roles (role) VALUES (?)`;
    connection.query(query,role,(err,result)=>{
if (err) {
    return res.status(500).json({
        success: false,
        massage: "server error",
    })

}
return res.status(201).json({
    success: true,
    massage: "Success role created",
    results: result,
  });
    })
}

module.exports = {
    createRole,
  };
  
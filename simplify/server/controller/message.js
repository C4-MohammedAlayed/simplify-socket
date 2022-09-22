const connection = require(`../db/db`);

const getAllMessages=(req,res)=>{
    const query =`SELECT * FROM messages WHERE is_deleted=0`;
    connection.query(query,(err,result)=>{
        if (err) return res.status(500).json({
            success:"false",
            message:"server err"
        })
          return res.status(200).json({
            success:"true",
            message:"get all messages",
            result:result
          })     
    })
}

//function  to send massage
const sendMessage = (req, res) => {
  const sender_id = req.token.userId;
  const senderName =req.token.userName
  const receiver_id =req.params.id
  const { message } = req.body;
  const data = [message, receiver_id, sender_id,senderName];
  const query = `INSERT INTO messages (message,receiver_id,sender_id,senderName,sendingTime) VALUE (?,?,?,?,now())`;
  connection.query(query, data, (err, result) => {
    if (err)
      return res.status(500).json({
        success: "false",
        message: "server err",
        err: err,
      });
    return res.status(201).json({
      success: "true",
      message: "sending successfully",
      result: result,
    });
  });
};

const getMessageByUserId =(req,res)=>{
   const sender_id = req.token.userId
   const receiver_id =req.params.id
    const query =`SELECT * FROM messages  WHERE  sender_id = ? AND receiver_id = ? OR receiver_id= ? AND sender_id=? ORDER BY messages.sendingTime ASC`;
    const data =[sender_id,receiver_id,sender_id,receiver_id];
    connection.query(query,data,(err,result)=>{
        if (err) return res.status(500).json({
            success: "false",
            message: "server err",
            err: err,
          });
          return res.status(200).json({
            success: "true",
            message: "get all message",
            result: result,
          });
    })

}
//INNER JOIN user ON messages.messageReceive=user.userId
module.exports={
    sendMessage,
    getMessageByUserId,
    getAllMessages
}

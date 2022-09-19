const connection = require(`../db/db`);

//function  to send massage

const sendMessage = (req, res) => {
  const massageSender = req.token.userName;
  const messageReceive =req.params.id
  const { messageContent } = req.body;
  const data = [messageContent, messageReceive, massageSender];

  const query = `INSERT INTO messages (messageContent,messageReceive,messageSender,sendingTime) VALUE (?,?,?,now())`;
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
   const userId = req.params.id
    
    const query =`SELECT * FROM messages INNER JOIN user ON messages.messageReceive=user.userId WHERE messageReceive=?`;
    const data =[userId];
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

module.exports={
    sendMessage,
    getMessageByUserId
}

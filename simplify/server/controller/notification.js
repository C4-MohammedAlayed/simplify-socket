const connection = require(`../db/db`);

const createNotification = (req, res) => {
 
  const receiver_Id = req.params.id;
  const sender_Id = req.token.userId;
  const data = [receiver_Id, sender_Id];

  const query = `INSERT INTO notifications (receiver_Id,sender_Id) VALUES (?,?)`;
  connection.query(query, data, (err, result) => {
    if (err) {
      return res.status(500).json({
        success: false,
        massage: "server error",
        err: err,
      });
    }
    return res.status(201).json({
      success: true,
      message: "Success notification created",
      result: result,
    });
  });
};

const getNotification = (req, res) => {

  const receiver_Id = req.token.userId;
  const data = [receiver_Id];
  const query = `SELECT * FROM notifications WHERE receiver_Id=? `;
  connection.query(query, data, (err, results) => {
    if (err) {
      return res.status(500).json({
        success: false,
        massage: "server error",
        err: err,
      });
    }
    return res.status(201).json({
      success: true,
      message: "Done",
      results: results,
    });
  });
};

// const getNotification = (req, res) => {
//   const sender_Id = req.params.id;
//   const receiver_Id = req.token.userId;
//   const data = [sender_Id, receiver_Id,receiver_Id, sender_Id];
//   const query = `SELECT * FROM notifications WHERE sender_Id=? AND receiver_Id=? OR receiver_Id=? AND sender_Id=?`;
//   connection.query(query, data, (err, results) => {
//     if (err) {
//       return res.status(500).json({
//         success: false,
//         massage: "server error",
//         err: err,
//       });
//     }
//     return res.status(201).json({
//       success: true,
//       message: `All from senderId : ${sender_Id}`,
//       results: results,
//     });
//   });
// };

const DeleteNotification=(req,res)=>{
    const sender_Id = req.params.id;
    const receiver_Id = req.token.userId;
    const data = [sender_Id, receiver_Id,receiver_Id, sender_Id];
    const query =` DELETE FROM notifications WHERE sender_Id=? AND receiver_Id=? OR receiver_Id=? AND sender_Id=?`;  
    connection.query(query,data,(err,result)=>{
        if (err) {
            return res.status(404).json({
              success: false,
              massage: "notifications are not exist",
              err: err,
            });
          }
          return res.status(200).json({
            success: true,
            message: `"resource deleted successfully`,
            result: result,
          })
    })
}

module.exports = {
  createNotification,
  getNotification,
  DeleteNotification
};

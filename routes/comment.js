var express = require('express');
var router = express.Router();
var db = require('../model/userDB');

/* GET users listing. */
router.get('/comment',async function(req, res, next) {
  try {
    var Show = await db.commentModel.find();
    res.json({
     error:false,
     data:Show});
  } catch (error) {
    res.json({
      error:true,
      data:error});
  }
  
});
router.get('/comment/:idpost',async function(req, res, next) {
  var id = req.params.idpost
  try {
    var ShowId = await db.commentModel.findById(id);
   
       res.json({
         error:false,
         data:ShowId});
   
  } catch (error) {
    res.json({ 
      error: true, 
      data: error
  })
  }
   
});


router.post('/comment/:idpost', async (req, res) => { 
  let iduser = req.body.id
  let idpost = req.params.idpost
  const { content} = req.body;
//   if (req.type === 1) {
      const commentNew = await db.commentModel({ content, user: iduser ,post: idpost});
      commentNew
          .save()
          .then(result => {

              res.json({ 
                error: false, 
                data: "Thành Công"
            });
          })
          .catch(err => {
              res.json({                
                  error: true, 
                  data: err              
              });
          });
//   } else {
//       res.json({
//           message: 'You can not use this feature'
//       });    
//   }
});

module.exports = router;

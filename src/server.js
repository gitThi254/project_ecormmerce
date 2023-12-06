const app = require("./app");
const mongoose = require('mongoose');
require("dotenv").config();

const port = process.env.PORT || 4001;
mongoose.connect(process.env.MONGO_URI).then(conn => {
  console.log(`server connected`);
  app.listen(port, () => {
    console.log(`server running at ${port}`);
  });
  
}).catch(err => {
  console.log(`server disconnected`);
})

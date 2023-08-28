const express = require("express");
const { errorHandler } = require("./middleware/errorHandler");
const connectDb = require("./config/dbConnection");
const dotenv = require("dotenv").config();

// connect a database
connectDb();

// create a app of express using express function call
const app = express();

// define a port on which you want to run the project
// define port in env file
// -> intall dotenv for that using
// npm i dotenv
const port = process.env.PORT || "5000";

// for listening a api request need to define a
// app.get('/api/contacts',(req,res)=>{
//     // this was without status message
//     // res.json({
//     //     name:"viraj"
//     // });
//     // with stattus message
//     res.status(200).json({
//         name: "viraj"
//     })
// });

// need to add a middleware for the read a body
app.use(express.json());

// after create this create a rountes folder
// which used to handle a multiple apis
// follow contactRoute.js file
// now moving a previous api call to the contactroute.js
app.use("/api/contacts/", require("./routes/contactRoute"));

// add userroute 
// then create route file 
app.use("/api/users/", require("./routes/usersRoute"));

// use the error middleware
app.use(errorHandler)

// it was used to initialize the app with port number
// app.listen(port number, callback function)
// callback function will return what you want to return from that request

app.listen(port, () => {
  console.log(`server is running on ${port}`);
});

// for testing this apid we have to use http clients
// for these project use the thunder client

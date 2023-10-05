const express = require("express");
const { errorHandler } = require("./middleware/errorHandler");
const connectDb = require("./config/dbConnection");
const dotenv = require("dotenv").config();
var bodyParser = require("body-parser");
const cors = require("cors");

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

// Use the cors middleware to enable Cross-Origin Resource Sharing
app.use(cors());

// need to add a middleware for the read a body
app.use(bodyParser.json());

// after create this create a rountes folder
// which used to handle a multiple apis
// follow contactRoute.js file
// now moving a previous api call to the contactroute.js
app.use("/api/contacts/", require("./routes/contactRoute"));

// add userroute
// then create route file
app.use("/api/users/", require("./routes/usersRoute"));

// comedian route
app.use("/api/comedian/", require("./routes/comedianRoute"));

// video route
app.use("/api/videos/", require("./routes/videoRoute"));

// post route
app.use("/api/posts/", require("./routes/postRoute"));

// joke route
app.use("/api/jokes/", require("./routes/jokesRoute"));

// achivements route
app.use("/api/achievement/", require("./routes/achievementRoute"));

// feed route
app.use("/api/feed/", require("./routes/feedRoute"));

// authenticated feed route
app.use("/api/feed/user/", require("./routes/authFeedRoute"));

// search route
app.use("/api/search/", require("./routes/searchRoute"));

// use the error middleware
app.use(errorHandler);

// it was used to initialize the app with port number
// app.listen(port number, callback function)
// callback function will return what you want to return from that request

app.listen(port, () => {
  console.log(`server is running on ${port}`);
});

// for testing this apid we have to use http clients
// for these project use the thunder client

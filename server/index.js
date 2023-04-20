/*Import project dependencies*/
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

/*Initialize Express server*/
const app = express();
const db = require('./db/server.js');

/*Call body-parser and cors middleware*/
var corsOptions = {
  origin: 'http://localhost:4000'
}
app.use(cors(corsOptions));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));


/*Set PORT and listen for request*/
const PORT = process.env.PORT || 4000;
// const PORT = 4000;

app.listen(PORT, () => {
  console.log(`Server running on port: ${PORT}`);
});


db.mongoose
  .connect(db.url, {
     useNewUrlParser: true,
     useUnifiedTopology: true 
  })
  .then(() => {
     console.log("Connected to the database!");
  })
  .catch(err => {
     console.log("Cannot connect to the database!", err);
     process.exit();
  });



  
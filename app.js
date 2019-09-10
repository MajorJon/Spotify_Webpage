const express = require('express'),
  app = express();


app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');
app.use(express.static(__dirname + '/views'));


app.get('/',(req,res) => {
  res.sendFile(views + '/home.html');
});


//auth login
app.get('/login', (req, res) => {
  res.sendFile(__dirname + '/views/login.html');
});

//auth logout
app.get('/logout', (req,res) => {
  //handle with passport
  res.send('logging out');
})

//auth with google
app.get('/spotify', (req,res) => {
  // handle with passport
  res.send('logging in with google')
});

app.listen(3000, () => {
  console.log('app now listening for requests on port 3000');
});
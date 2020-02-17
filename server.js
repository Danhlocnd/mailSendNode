var express = require('express'),
  path = require('path'),
  nodeMailer = require('nodemailer'),
  bodyParser = require('body-parser');

var app = express();
// app.set('view engine', 'ejs');
// app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
var port = 3000;
//  app.use()

// imap 
// var Imap = require('imap'),
//     inspect = require('util').inspect;
// var fs = require('fs'), fileStream;

// var imap = new Imap({
//   user: 'locnd@seatechit.com.vn',
//   password: 'Seatech$123',
//   host:'mail.seatechit.com.vn',
//   port: 587,
//   // tls: true,
//   secure: false,
//   });
//   function openInbox(cb) {
//     imap.openBox('INBOX', true, cb);
//       }
//     imap.once('ready', function() {
//     openInbox(function(err, box) {
//     if (err) throw err;
//     imap.search([ 'UNSEEN', ['SINCE', 'June 15, 2018'] ], function(err, results) {
//     if (err) throw err;
//     var f = imap.fetch(results, { bodies: '' });
//     f.on('message', function(msg, seqno) {
//     console.log('Message #%d', seqno);
//     var prefix = '(#' + seqno + ') ';
//     msg.on('body', function(stream, info) {
//     console.log(prefix + 'Body');
//     stream.pipe(fs.createWriteStream('msg-' + seqno + '-body.txt'));
//     });
//     msg.once('attributes', function(attrs) {
//     console.log(prefix + 'Attributes: %s', inspect(attrs, false, 8));
//     });
//     msg.once('end', function() {
//     console.log(prefix + 'Finished');
//     });
//     });
//     f.once('error', function(err) {
//     console.log('Fetch error: ' + err);
//     });
//     f.once('end', function() {
//     console.log('Done fetching all messages!');
//     imap.end();});
//         });
//       });
//     });
//     imap.once('error', function(err) {
//     console.log(err);
//     });
//     imap.once('end', function() {
//     console.log('Connection ended');
//     });
//     imap.connect();



app.get('/', function (req, res) {
  res.render('index');


});
function sendding(dateTime, stringInOut) {
  var dates = new Date();
  var min=  "0" + dates.getMinutes()
  // app.post('/send-email', function (req, res) {
  let transporter = nodeMailer.createTransport({
    host: 'smtp.gmail.com',
    port: 465,
    secure: true,
    // tls: {ciphers: "SSLv3"},
    auth: {
      user: 'danhloc.nd@gmail.com',
      pass: 'Danhloc@95*'
    }
  });
  let mailOptions = {
    from: '"Nguyen Danh Loc" <danhloc.nd@gmail.com>,', // sender address
    to: "thegarden1995@gmail.com", // list of receivers
    subject:"Check "+ stringInOut +" ngày "+ dateTime, // Subject line
    html: '<b>Check ' + stringInOut + ' ngày ' + dateTime + ' </b><br/>'

      + 'Trân trọng cảm ơn ! <br/>' +
      '...........................' // html body
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      return console.log(error);
    }


    // console.log("Ngày" ,formattedTime)
    // console.log("Check", stringInOut)
    // console.log(dates.getHours() +":"+(min.substr(-2)))
    console.log('Message %s sent: %s', info.messageId, info.response);
    // console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));
    //     res.render('index');
    

  });
  // });
}

app.listen(port, function () {
  console.log('Server is running at port: ', port);
  // var timestamp = moment.unix(1293683278);
  // console.log( timestamp.format("HH/mm/ss") );

  // Create a new JavaScript Date object based on the timestamp
  function getRandomInt(max) {
    return Math.floor(Math.random() * Math.floor(max));
  }
  setInterval(() => {
    // multiplied by 1000 so that the argument is in milliseconds, not seconds.
    var date = new Date();
    // Hours part from the timestamp
    var hours = date.getHours();
    // Minutes part from the timestamp
    var minutes = "0" + date.getMinutes();


    // Will display time in 10:30:23 format
    var formattedTime = date.getDate() + '/' + (date.getMonth()+1) + '/' + date.getFullYear();
    if (hours == "23" && (minutes.substr(-2) <= 15)) {
      console.log("in")
      setTimeout(() => {
        sendding(formattedTime,"In")
      }, getRandomInt(10) * 60000);

    }
    if (hours == "1" && minutes.substr(-2) >= 30 &&  59 >= minutes.substr(-2)) {
      console.log("out")
      setTimeout(() => {
        sendding(formattedTime,"Out")
      }, getRandomInt(15) * 60000);
    }
  }, 1800000)
 

});

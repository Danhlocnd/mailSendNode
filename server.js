var express = require('express'),
    path = require('path'),
    nodeMailer = require('nodemailer'),
    bodyParser = require('body-parser');

    var app = express();
    app.use(express.static('public'));
    app.use(bodyParser.urlencoded({extended: true}));
    app.use(bodyParser.json());
    var port = 3000;
    app.get('/', function (req, res) {
      let transporter = nodeMailer.createTransport({
          host: '115.146.122.83',
          port: 587,
          secure: true,
          auth: {
              user: 'locnd@seatechit.com.vn',
              pass: 'Seatech$123'
          }
      });
      let mailOptions = {
          from: '"Krunal Lathiya" <locnd@seatechit.com.vn>', // sender address
          to: req.body.to, // list of receivers
          subject: req.body.subject, // Subject line
          text: req.body.body, // plain text body
          html: '<b>NodeJS Email Tutorial</b>' // html body
      };

      transporter.sendMail(mailOptions, (error, info) => {
          if (error) {
              return console.log(error);
          }
          console.log('Message %s sent: %s', info.messageId, info.response);
              res.render('index');
          });
      
    });
    // app.post('/send-email', function (req, res) {
    // });
          app.listen(port, function(){
            console.log('Server is running at port: ',port);
          });
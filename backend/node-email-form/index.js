const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const nodemailer = require('nodemailer');

const app = express();
const port = 3000;

app.use(bodyParser.json());
app.use(cors());

app.post('/send-email', (req, res) => {
	const name = req.body.name; 
	const email = req.body.email; 
	const message = req.body.message;

	const transporter = nodemail.createTransport({
		service: 'gmail', 
		auth: {
			user: 'servicedecontactformulaireci@gmail.com',
			pass: 'c3C13STL3M0TD3P4SS3'
		}
	});

	const mailOptions = {
		from: 'servicedecontactformulaireci@gmail.com', 
		to: 'bhadjaz@gmail.com',
		suject: 'Nouvelle demande de contact',
		text: `
			Nom: ${name}
			Email: ${email}
			Message: ${message}
		`
	};

	transporter.sendMail(mailOptions, (error, info) => {
		if (error) {
			console.log(error); 
			res.status(500).send('Error sending email');
		} else {
			console.log('Email sent:', info.response);
			res.status(200).send('Email sent successfully');
		}
	});
});

app.listen(port, () => {
	console.log(`Server listening at http://localhost:${port}`);
});

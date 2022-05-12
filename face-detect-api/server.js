const express = require('express');
const bcrypt = require('bcrypt-nodejs');
const cors = require('cors');
const knex = require('knex');
const { response } = require('express');

const register = require('./controllers/register');
const signIn = require('./controllers/signin');
const profile = require('./controllers/profile');
const image = require('./controllers/image');

const db = knex ({
	client: 'pg',
	connection: {
		// host : '127.0.0.1',		// home. localhost와 같다.
		connectionString: process.env.DATABASE_URL,
		ssl: {
			rejectUnauthorized: false
		}
	}
});


const app = express();
app.use(express.json());		// Front-end에서 받는 json데이터를 javascript 객체로 변환하기 위해. body-parse
app.use(cors());


// app.get('/', (req, res) => {
// 	res.send('success');
// })

app.get('/', (req, res) => { res.send('it is working!')})
app.post('/signin', (req, res) => signIn.handleSignIn(req, res, db, bcrypt))	// req, res는 자동으로 받아주기 때문에 생략가능하다.
app.post('/register', (req, res) => register.handleRegister(req, res, db, bcrypt))
app.get('/profile/:id', (req, res) => profile.handleProfileGet(req, res, db))
app.put('/image', (req, res) => image.handleImage(req, res, db))
app.post('/imageurl', (req, res) => image.handleApiCall(req, res))



app.listen(process.env.PORT || 3000, () => {
	console.log(`app is running on port ${process.env.PORT}`);
})


/*
/ --> res = this is working
/signin --> POST = success/fail		
// 새 유저를 등록하는 것이 아닌데 POST를 사용하는 것은 
	password 등이 querystring으로 전달되면 안되기 때문이다.
/register --> POST = user
/profile/:userId --> GET = user
/image --> PUT --> user

*/


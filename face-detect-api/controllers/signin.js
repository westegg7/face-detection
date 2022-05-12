const handleSignIn = (req, res, db, bcrypt) => {
		const { email, password } = req.body;

		if (!email || !password) {
			return res.status(400).json('incorrect form submission');
		}

    db.select('email', 'hash').from('login')	// 1번 작업
		.where('email', '=', email)
		.then(data => {
			const isValid = bcrypt.compareSync(password, data[0].hash);		// return boolean
			if (isValid) {
				return db.select('*').from('users')				// 2번 작업. 상위 1번작업에서 알게하기위해 return을 붙인다. if문이기 때문.
					.where('email', '=', email)
					.then(user => {
						res.json(user[0]);						// 배열이 반환되기 때문에 [0]을 붙여준다
					})
					.catch(err => res.status(400).json('unable to get user'))
			} else {
				res.status(400).json('wrong credentials');
			}
		})
		.catch(err => res.status(400).json('wrong credentials'))
}



module.exports = {
    handleSignIn: handleSignIn
};
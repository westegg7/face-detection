const handleRegister = (req, res, db, bcrypt) => {
	const { email, name, password } = req.body;
	
	// 공란으로 입력을 받았을 경우 처리.
	if (!email || !name || !password) {
		return res.status(400).json('incorrect form submission');
	}

	const hash = bcrypt.hashSync(password);
	db.transaction(trx => {
		trx.insert({
			hash: hash,
			email: email
		})
		.into('login')
		.returning('email')
		.then(loginEmail => {			// req.body의 email과 구분.
			return trx('users')
			.returning('*')
			.insert({
				email: loginEmail[0].email,
				name: name,
				joined: new Date()
			})
			.then(user => {
				res.json(user[0]);		// array를 반환한다.
			})
		})
		.then(trx.commit)					// 두 trx 다 성공해야 데이터베이스에 반영된다.
		.catch(trx.rollback)			// 하나라도 실패하면 롤백. 중요.
	})
		// .catch(err => res.status(400).json(err))		// 보안상 좋지않다.
		.catch(err => res.status(400).json('unable to register.'))
}

module.exports = {
	handleRegister: handleRegister
};

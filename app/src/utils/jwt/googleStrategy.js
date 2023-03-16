


const updateToken = (payload) => {
	const {
		sub,
		name,
		email
	} = payload;
	console.log(`id: ${sub}\n name:${name}\n, email:${email}`);
	const token = jwt.sign({
			id: sub,
			name,
			email
		},
		JWT_SECRET
	);

	connection.execute('UPDATE `innoboost_user` SET `TOKEN`= ? WHERE (`ID`= ?)', [token, sub], (err, results) => {
		console.log(results)
	});
	return token;
}

const insertUserIntoDB = (payload) => {
	const {
		sub,
		name,
		email
	} = payload;
	console.log(`id: ${sub}\n name:${name}\n, email:${email}`);
	const token = jwt.sign({
			id: sub,
			name,
			email
		},
		JWT_SECRET
	);

	connection.execute(
		'INSERT INTO `innoboost_user` (ID, EMAIL, NAME, TOKEN) VALUES (?, ?, ?, ?)',
		[sub, email, name, token],
		(err, results, fields) => {
			if (err) {
				console.log('fail');
				throw err;
			}

		}
	);
	return token;
};

module.exports ={updateToken,insertUserIntoDB};
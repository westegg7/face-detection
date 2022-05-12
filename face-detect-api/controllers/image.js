const clarifai = require('clarifai');

const app = new Clarifai.App({
  apiKey: 'ba23b616ab4e469a8eb2fd2d16bb151b'
});

const handleApiCall = (req, res) => {
	app.models
		.predict(Clarifai.FACE_DETECT_MODEL, req.body.input)
		.then(data => {
			res.json(data);
		})
		.catch(err => res.status(400).json('unable to work with API'))
}

const handleImage = (req, res, db) => {
	const { id } = req.body;
	db('users').where('id', '=', id)
		.increment('entries', 1)		// default = 1, === increment('entries')
		.returning('entries')
		.then(entries => {
			res.json(entries[0].entries);
		})
		.catch(err => res.status(400).json('unable to get entries'))
}

module.exports = {
	handleImage: handleImage,
	handleApiCall: handleApiCall
};
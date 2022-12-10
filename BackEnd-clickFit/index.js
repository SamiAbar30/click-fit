
const fs = require('fs');

const express = require('express');
const cors = require('cors');

const app = express();
app.use(cors())
app.use(express.json({ limit: '25mb' }));
app.use(express.urlencoded({ limit: '25mb' }));
app.post('/v1/upload-image', (req, res, next) => {
	try {
		// to declare some path to store your converted image
		const path = './images/' + req.body.targetedFileName;
		const imgdata = req.body.img;
		// to convert base64 format into random filename
		const base64Data = imgdata.replace(/^data:([A-Za-z-+/]+);base64,/, '');
		fs.writeFileSync(path, base64Data, { encoding: 'base64' });
		return res.status(200).send({ msg: 'your image uploadded with succses' });
	} catch (e) {
		console.log(e);
		return res
			.status(500)
			.send({ error: 'there is a problem try to upload an outher one' });
		next();
	}
});

app.listen(3001, () => {
	console.log(`server running on port 3001`);
});

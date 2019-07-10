/* eslint-disable no-console */
import express from 'express';
import bodyParser from 'body-parser';
import propertyRoute from './routes/property';
import userRoute from './routes/user';
// import { multerUploads, dataUri } from './middlewares/multer';



const PORT = process.env.PORT || 3000;
const app = express();


// cloudinary upload //


// app.use('*', cloudinaryConfig);

// app.post('/upload', multerUploads, uploadCloud);




app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.get('/', (req, res) => {
	res.status(200).json('Welcome to this Property World ');
});

app.use('/api/v1/property', propertyRoute);
app.use('/api/v1/auth', userRoute);


// app.post('/upload', multerUploads, (req, res) => {
// 	console.log('req.file :', req.file);
// 	});

app.listen(PORT, () => {
	console.log(`server listening on port ${PORT}...`);
});


export default app; 
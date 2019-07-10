import express from 'express';
import bodyParser from 'body-parser';
import PropertyModel from '../models/property';

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

const propertyController = {
	create(req, res) {
		const {status, code, data} =  PropertyModel.create(req.body);
		res.status(code).json({status,data});
	},

	findOne(req, res) {
		const property = PropertyModel.findOne(req.params.id);
		res.status(200).json(property);
	},

	search(req, res) {
		const { query } = req;
		if (query.keys) {
			const result = PropertyModel.search(query);
			res.status(200).json(result);
		} else {
			const property = PropertyModel.findAll();
			res.status(200).json(property);
		}
	},

	delete(req, res) {
		const property = PropertyModel.delete(req.params.id);
		res.status(200).json(property);
	},

	update(req, res) {
		const property = PropertyModel.update(req.params.id, req.body);
		res.status(200).json(property);
	},

	sold(req, res) {
		const property = PropertyModel.sold(req.params.id);
		res.status(200).json(property);
	},

	uploadCloud(req, res) {
		if(req.file) {
					const file = dataUri(req).content;
					return uploader.upload(file).then((result) => {
					const image = result.url;
					return res.status(200).json({
						messge: 'Your image has been uploded successfully to cloudinary',
			data: {
					image
					}
				})
				}).catch((err) => res.status(400).json({		
						messge: 'someting went wrong while processing your request',
			data: {
					err
					}
				}))
			}	
			}
};




export default propertyController;

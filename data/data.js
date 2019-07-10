/* eslint-disable no-tabs */
import uuid from 'uuid';
import moment from 'moment';

const data = {
	users: [
		{
			id: '001',
			email: 'claude@gmail.com',
			first_name: 'claude',
			last_name: 'Nizeyimana',
			password: '0000',
			phoneNumber: '+2507478911',
			address: 'Kigali/Rwanda',
			is_admin: true
		},

		{
			id: '002',
			email: 'nzapaul@gmail.com',
			first_name: 'Nza',
			last_name: 'Pual',
			password: '1111',
			phoneNumber: '+25075654931',
			address: 'Musanze/Rwanda',
			is_admin: false
		},
	],
	properties: [
		{
			id: uuid.v4(),// user id
			owner: 'desire',

			// status sold,available - default is available

			price: 200000.00,
			state: 'Nyarugenge', // State where property is located
			city: 'Kigali', // City where property is located
			address: 'Kigali/Rwanda',
			type: '2 bedroom', // 3 bedroom etc
			created_on: moment.now(),
			image_url: 'https: //www.imagesplaceholder.com/150/150',
		},

		{
			id: uuid.v4(), // user id
			owner: 'desore byamungu',
			// status sold,available - default is available
			price: 150000.00,
			state: 'KICUKIRO', // State where property is located
			city: 'Kigali', // City where property is located
			address: 'Kigali/Rwanda',
			type: '2beds', // 3 bedroom etc
			created_on: moment.now(),
			image_url: 'https: //www.images.com/300/340',
		}
	],
};

export default data;
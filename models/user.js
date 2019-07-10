/* eslint-disable no-lone-blocks */

import uuid from 'uuid';
import data from '../data/data';


class UserModel {
	signup(details) {
		const newUser = { details };

    const already = data.users.find(user => user.email === newUser.email);
		if (already) {
			return { status: 301, message: 'User already exist' };
		}
		newUser.id = uuid.v4();
		data.users.push(newUser);
		return data.users[data.users.indexOf(newUser)];
	}

	login({ email, password }) {

    const me = data.users.find(user => user.email === email);
		if (me) {
			if (me.password === password) {
				return me;
			}
			return { err: 'password incorrect' };
		}
		return { err: 'User not found' };
	}
}

export default  new UserModel();

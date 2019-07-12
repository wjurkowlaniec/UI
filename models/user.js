import passwordHash from 'password-hash'

// Define a class for creating a user
class user {
    constructor() {
        this.users = [
            {
                id: 1,
                email: 'nganatech@gmail.com',
                firstname: 'tech',
                lastname: 'ngana',
                password: '1',
                address: 'kigali',
                PhoneNumber: '08788787',
                status: 'Not login',
                isadmin: true,
            },
        ]
    }

    userEmail(data) {
        const findemail = this.users.find(oneusers => oneusers.email === data)
        return findemail
    }

    signupuser(info) {
        const insertuser = {
            id: this.users.length + 1,
            firstname: info.firstname,
            lastname: info.lastname,
            PhoneNumber: info.PhoneNumber,
            email: info.email,
            password: this.setPassword(info.password),
            address: info.address,
            status: 'Not login',
            isadmin: 'false',
        }
        this.users.push(insertuser)
        return insertuser
    }

    setPassword(password) {
        const hashedPassword = passwordHash.generate(password)
        return (this.password = hashedPassword)
    }
    getuser(id) {
        const finduser = this.users.find(fetchusers => fetchusers.id == id)
        return finduser
    }
}

export default new user()

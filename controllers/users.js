import passwordHash from 'password-hash'
import joi from 'joi'
import authentication from '../helpers/auth'
import users from '../models/user'
import mymodel from '../models/user'
import Schema from '../helpers/inpuValidation'
import server from '../helpers/response'

class userCtrl {
    static createUser(req, res) {
        const {
            email,
            firstname,
            lastname,
            password,
            PhoneNumber,
            address,
            isadmin,
        } = req.body
        const { error, value } = joi.validate(
            {
                email,
                firstname,
                lastname,
                PhoneNumber,
                password,
                address,
            },
            Schema.userSchema
        )
        if (error) {
            res.status(400).send({ error: error.details[0].message })
        } else {
            // generate the id and pass it to a user
            const id = parseInt(mymodel.users.length) + 1
            const token = authentication.encodeToken({
                email,
                firstname,
                lastname,
                password,
                address,
                PhoneNumber,
                userId: id,
                status: 'Not login',
                isadmin: 'false',
            })
            const checkemail = mymodel.userEmail(email)
            if (checkemail) {
                return server(
                    res,
                    400,
                    'email already exist please use another email!'
                )
            }
            mymodel.signupuser(req.body)

            res.status(201).send({
                message: 'user registered successfully',
                user: {
                    token,
                    id,
                    firstname,
                    lastname,
                    email,
                    PhoneNumber,
                    isadmin,
                },
            })
        }
    }

    static getuser(req, res) {
        return server(res, 200, 'List of all users', users)
    }

    // get user by id
    static getOneuser(req, res) {
        const { id } = req.params
        const user = mymodel.getuser(id)
        if (user) {
            return server(res, 200, 'one user found ', user)
        } else {
            return server(res, 400, 'No user found with that id')
        }
    }

    // Login functions
    static login(req, res) {
        const { email, password } = req.body
        const specificUser = mymodel.userEmail(email)
        if (!specificUser) {
            return server(res, 400, 'No user with that email !')
        }
        if (specificUser) {
            if (passwordHash.verify(password, specificUser.password)) {
                const {
                    firstname,
                    lastname,
                    PhoneNumber,
                    email,
                    password,
                    isadmin,
                } = specificUser
                const user = {
                    firstname,
                    lastname,
                    email,
                    PhoneNumber,
                    password,
                    status: 'login',
                    isadmin: specificUser.isadmin,
                    id: specificUser.id,
                }
                const token = authentication.encodeToken(user)
                res.status(200).send({
                    message: 'Logged in successfully',
                    token,
                    id: specificUser.id,
                    firstname,
                    lastname,
                    PhoneNumber,
                    email,
                    status: user.status,
                    isadmin,
                })
            } else {
                res.status(400).send({ error: 'incorrect Password !' })
            }
        }
    }

    // change password function
    static resetpassword(req, res) {
        const { email, newpassword } = req.body
        const { error, value } = joi.validate(
            {
                email,
                newpassword,
            },
            Schema.resetpassSchema
        )
        if (error) {
            res.status(400).send({ error: error.details[0].message })
        } else {
            const getuser = mymodel.userEmail(email)
            if (getuser) {
                getuser.password = mymodel.setPassword(newpassword)
                return server(res, 201, 'password updated  succesfully')
            }
            return server(res, 400, "can't find user with that email")
        }
    }
}

export default userCtrl

import express from 'express'
import Upload from 'express-fileupload'
import userCtrl from '../controllers/users'
import PropertyCtrl from '../controllers/property'
import auth from '../helpers/auth'

const router = express.Router()

router.use(
    Upload({
        createParentPath: true,
        useTempFiles: true,
    })
)
router.get('/api/v1/users', userCtrl.getuser)
router.get('/api/v1/property', PropertyCtrl.GetPropertyType)
router.post('/api/v1/property', auth.UseraccessRequired, PropertyCtrl.createPro)
router.post('/api/v1/auth/signup', userCtrl.createUser)
router.post('/api/v1/auth/signin', userCtrl.login)
router.get('/api/v1/users/:id', userCtrl.getOneuser)
router.get('/api/v1/property/:id', PropertyCtrl.getOneproperty)
router.patch('/api/v1/property/:id/sold', PropertyCtrl.markproperty)
router.patch('/api/v1/user/resetpassword', userCtrl.resetpassword)
router.patch('/api/v1/property/:id/', PropertyCtrl.updatePro)
router.delete('/api/v1/property/:id', PropertyCtrl.deletePro)

export default router

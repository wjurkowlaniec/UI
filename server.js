import express from 'express'
import router from './routes/routes'
import dotenv from 'dotenv'

dotenv.config()

const app = express()

app.use(express.urlencoded({ extended: false }))
app.use(express.json())

app.use(router)

app.get('/', (req, res) => {
    res.status(200).json({
        status: 200,
        message:
            'Welcome to Property Pro Lite you can search properties for sale or rent!',
    })
})

app.use('*', (req, res) => {
    res.status(400).json({
        status: 400,
        message: "Sorry this router doesn't exist !",
    })
})

const port = process.env.PORT || 3000
app.listen(port, () =>
    console.log('Welcome to MY Property Pro Lite Land Server!!....')
)

export default app

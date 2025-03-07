import jwt from 'jwt-simple'
import joi from 'joi'
import properties from '../models/property'
import Schema from '../helpers/inpuValidation'
import model from '../models/property'
import cloudinary from 'cloudinary'
import dotenv from 'dotenv'
import server from '../helpers/response'
dotenv.config()

/*configure helper s for cloudinary*/
cloudinary.config({
    cloud_name: 'byadiso',
    api_key: '956123683325355',
    api_secret: '21xmJx35BOeGavsijO2fL_aWAdg',

    // cloud_name: process.env.CLOUD_NAME,
    // api_key: process.env.API_ID,
    // api_secret: process.env.API_SECRET,
})

class PropertyCtrl {
    //get properties function

    static GetPropertyType(req, res) {
        const { type } = req.query
        const { error, value } = joi.validate(
            {
                type,
            },
            Schema.UpdateSchema
        )
        if (error) {
            res.status(400).send({ error: error.details[0].message })
        } else {
            const checkproperty = model.findall(req.query)
            if (checkproperty) {
                return server(res, 200, 'All properties', checkproperty)
            }
            if (!type) {
                return server(res, 200, 'All properties', properties)
            } else {
                return server(res, 404, "can't find any property")
            }
        }
    }

    // create  property function
    static createPro(req, res) {
        if (!req.files) {
            console.log(req.file)
            return server(res, 404, 'please upload image !')
        } else {
            let image = req.files.image
            cloudinary.uploader.upload(image, result => {
                const insertimage = {
                    image_url: result.url,
                }
                const decoded = jwt.decode(
                    req.headers.token,
                    process.env.SECRET_KEY
                )

                const { type, city, address, price } = req.body

                const { id, PhoneNumber, email } = decoded.sub
                const decodedData = { id, PhoneNumber, email }
                const { error, value } = joi.validate(
                    {
                        type,
                        city,
                        address,
                        price,
                    },
                    Schema.propertySchema
                )
                if (error) {
                    res.status(400).send({ error: error.details[0].message })
                } else {
                    const propapertydata = model.createproperty(
                        req.body,
                        decodedData,
                        insertimage
                    )
                    return server(
                        res,
                        200,
                        'property created successfully',
                        propapertydata
                    )
                }
            })
        }
    }

    // update property function (patch)
    static updatePro(req, res) {
        let image = req.files.image
        cloudinary.uploader.upload(image, result => {
            result.url

            const { id } = req.params
            const { type, price } = req.body
            const { error, value } = joi.validate(
                {
                    type,
                    price,
                },
                Schema.UpdateSchema
            )
            if (error) {
                res.status(400).send({ error: error.details[0].message })
            } else {
                const getproperty = model.findOne(id)
                if (getproperty) {
                    ;(getproperty.type = type),
                        (getproperty.price = price),
                        (getproperty.image_url = result.url)
                    return server(
                        res,
                        201,
                        'property updated succesfully',
                        getproperty
                    )
                } else {
                    return server(res, 400, 'could not find that property')
                }
            }
        })
    }

    //mark a property as sold function
    static markproperty(req, res) {
        const { id } = req.params
        const { status } = req.body
        const { error, value } = joi.validate(
            {
                status,
            },
            Schema.markSchema
        )
        if (error) {
            res.status(400).send({ error: error.details[0].message })
        } else {
            const getproperty = model.findOne(id)
            if (getproperty) {
                getproperty.status = status
                return server(
                    res,
                    201,
                    'property updated succesfully',
                    getproperty
                )
            } else {
                return server(res, 400, 'could not find that property')
            }
        }
    }

    // get property by id
    static getOneproperty(req, res) {
        const { id } = req.params
        const findproperty = model.findOne(id)

        if (findproperty) {
            return server(res, 200, 'property found', findproperty)
        }
        return server(res, 400, 'could not find that property')
    }
    //delete property function
    static deletePro(req, res) {
        const { id } = req.params
        const findloan = model.findPro(id)
        if (findloan > -1) {
            model.deletePro(id)
            return server(res, 200, 'property successfully deleted')
        } else {
            return server(res, 400, 'could not find that property')
        }
    }
}

export default PropertyCtrl

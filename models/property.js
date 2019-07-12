import moment from 'moment'

class Property {
    constructor() {
        this.properties = []
    }

    findall(query = {}) {
        if (query.type) {
            const propertytype = this.properties.find(
                oneproperty => oneproperty.type === query.type
            )
            return propertytype
        }
    }

    findOne(PropertyId) {
        const foundproperty = this.properties.find(
            property => property.id === parseInt(PropertyId)
        )
        return foundproperty
    }

    findPro(propertyid) {
        const property = this.properties.findIndex(
            property => property.id === parseInt(propertyid)
        )
        return property
    }

    deletePro(id) {
        const findproperty = this.findOne(id)
        const indexof = this.properties.indexOf(findproperty)
        const deletedproperty = this.properties.splice(indexof, 1)
        return deletedproperty
    }

    createPro(data, userInfo, url) {
        const inserProp = {
            id: this.properties.length + 1,
            created_On: moment.utc().format('DD-MM-YYYY HH:mm:ss'),
            owner: userInfo.id,
            ownerPhoneNumber: userInfo.PhoneNumber,
            ownerEmail: userInfo.email,
            status: 'available',
            type: data.type,
            city: data.city,
            address: data.address,
            price: data.price,
            image_url: url.image_url,
        }
        this.properties.push(inserProp)
        return inserProp
    }
}

export default new Property()

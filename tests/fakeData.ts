import {faker} from '@faker-js/faker'

class FakeData{
    
   static getEmailId(){
    return faker.internet.email()
    }

    static getFullName(){
        return faker.person.fullName()
    }

    static getWebsite(){
        return faker.internet.url()
    }

    static firstName(){
        return faker.person.firstName()
    }

    static lastName(){
        return faker.person.lastName()
    }

    static address(){
        return faker.location.streetAddress()
    }
}

export default FakeData

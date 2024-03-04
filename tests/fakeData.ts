import {faker} from '@faker-js/faker'

class FakeData{
    
   static getEmailId(){
    return faker.internet.email()
    }
}

export default FakeData;
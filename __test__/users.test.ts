import { createConnection, getConnection, getRepository } from 'typeorm'
import { User } from '../src/models/User';
import CreateUserService from '../src/services/CreateUserService';


describe('Users', () => {

    beforeEach(() =>{
        return createConnection({
            type: "sqlite",
            database: ":memory:",
            dropSchema: true,
            entities: [
                "./src/models/*.ts"
            ],
            synchronize: true,
            logging: false
        })
    })

    afterEach(()=>{
        let conn = getConnection()
        return conn.close()
    })

    test('it should create an user and fetch it', async () =>{
        
        await new CreateUserService().execute({ 
            email: 'test@test.com', 
            name: 'Teste Unitario', 
            password: 'Senha teste',
            picture:'imagem',
            status:'0'
        })

        const user = await getRepository(User).findOne({
            email:'test@test.com'
        })

        expect(user).toBeInstanceOf(User)
    })

})
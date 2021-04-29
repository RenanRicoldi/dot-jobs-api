import { createConnection, getConnection, getRepository } from 'typeorm'
import { User } from '../src/models/User';
import { Employer } from '../src/models/Employer';
import CreateUserService from '../src/services/CreateUserService';
import CreateEmployerService from '../src/services/CreateEmployerService';


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

    test('it should create an employer and fetch it', async () =>{
        
        const user = await new CreateUserService().execute({ 
            email: 'test@test.com', 
            name: 'Teste Unitario', 
            password: 'Senha teste',
            picture:'imagem',
            status:'0'
        })

        const employer = await new CreateEmployerService().execute({
            cep: '86055690',
            address: 'Rua Abc 123, Londrina - PR',
            phone: '43999999999',
            user_id: user.id
        })

        expect(employer).toBeInstanceOf(Employer)
    })

})
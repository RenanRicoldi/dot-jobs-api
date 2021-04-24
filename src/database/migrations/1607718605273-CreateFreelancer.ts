import {MigrationInterface, QueryRunner, Table} from 'typeorm'

export class CreateFreelancer1607718605273 implements MigrationInterface {
    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
                name: 'freelancers',
                columns: [
                    {
                        name: 'id',
                        type: 'uuid',
                        isPrimary: true,
                        generationStrategy: 'uuid',
                        default: 'uuid_generate_v4()',
                    },
                    {
                        name: 'user_id',
                        type: 'uuid',
                    },
                    {
                        name: 'cep',
                        type: 'varchar',
                        isNullable: false                        
                    },
                    {
                        name: 'address',
                        type: 'varchar',
                        isNullable: false                        
                    },
                    {
                        name: 'phone',
                        type: 'varchar',
                        isNullable: false                        
                    },
                    {
                        name: 'description',
                        type: 'varchar',
                        isNullable: false                        
                    },
                    {
                        name: 'rg',
                        type: 'varchar',
                        isNullable: false                        
                    },
                    {
                        name: 'cpf',
                        type: 'varchar',
                        isNullable: false                        
                    },
                    {
                        name: 'rg_picture',
                        type: 'varchar',
                        isNullable: false                        
                    },
                    {
                        name: 'cpf_picture',
                        type: 'varchar',
                        isNullable: false                        
                    }
                ]
            })
        )
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable('freelancers')
    }

}

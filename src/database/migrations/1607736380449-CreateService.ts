import {MigrationInterface, QueryRunner, Table} from 'typeorm'

export class CreateService1607736380449 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
                name: 'services',
                columns: [
                    {
                        name: 'id',
                        type: 'uuid',
                        isPrimary: true,
                        generationStrategy: 'uuid',
                        default: 'uuid_generate_v4()',
                    },
                    {
                        name: 'employer_id',
                        type: 'uuid',
                    },
                    {
                        name: 'description',
                        type: 'varchar'
                    },
                    {
                        name: 'price',
                        type: 'real'
                    },
                    {
                        name: 'localization',
                        type: 'varchar'
                    },
                    {
                        name: 'conclusion_date',
                        type: 'timestamp',
                        isNullable: true
                    }                    
                ]
            })
        )
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable('services')
    }

}

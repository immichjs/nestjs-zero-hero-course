import { DataSource } from 'typeorm';

export const databaseProviders = [
  {
    provide: 'DATA_SOURCE',
    useFactory: async () => {
      const dataSource = new DataSource({
        type: 'postgres',
        host: 'localhost',
        port: 5432,
        username: 'postgres',
        password: '7fyJPSX6@!flq%I7',
        database: 'task-management',
        entities: [__dirname + '/../**/*.entity.js'
        ],
        synchronize: true,
      });

      return dataSource.initialize();
    },
  },
];
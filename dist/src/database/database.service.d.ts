import { Connection, Repository } from 'typeorm';
export interface ICrud {
    build(args: any): any;
    rebuild(args: any): any;
    fetchById(args: any): any;
}
export declare class DatabaseService {
    connection: Connection;
    constructor(connection: Connection);
    getRepository<T>(entity: any): Promise<Repository<T>>;
    getCustomRepository<T>(entity: any): Promise<ICrud>;
}

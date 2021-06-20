import { DatabaseService } from "../database/database.service";
export declare class TestUtils {
    databaseService: DatabaseService;
    constructor(databaseService: DatabaseService);
    cleanEntities(): Promise<void>;
    cleanDB(): Promise<void>;
    cleanAllSamples(): Promise<void>;
    loadSampleByCustomRepository(wantedEntities: "*" | string[]): Promise<void>;
    loadSomeSample(wantedEntities: "*" | string[]): Promise<void>;
    loadAllSamples(): Promise<void>;
    cleanAllSamples0(): Promise<void>;
    reloadAllSamples(): Promise<void>;
    loadAllSamples1(): Promise<void>;
    loadAllSamples0(): Promise<void>;
    cleanAndLoadAllSamples(): Promise<void>;
    cleanTable(entityName: string, tableName: string): Promise<void>;
    closeDbConnection(): Promise<void>;
    shutdownServer(server: any): Promise<void>;
    getSampleData(entityName: string): void;
}

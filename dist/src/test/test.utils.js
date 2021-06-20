"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
const database_service_1 = require("../database/database.service");
const common_1 = require("@nestjs/common");
const _entities_1 = require("./fixtures/_entities");
let TestUtils = class TestUtils {
    constructor(databaseService) {
        if (process.env.NODE_ENV !== "test") {
            return null;
        }
        this.databaseService = databaseService;
    }
    async cleanEntities() {
        let tableQuery;
        let seqQuery;
        try {
            for (const data of _entities_1.EntitiesSeed.reverse()) {
                const repository = await this.databaseService.getRepository(data.entityMetaData.entityName);
                const table = data.entityMetaData.tableName;
                const id_title = data.entityMetaData.idTitle;
                tableQuery = `TRUNCATE "${table}" CASCADE;`;
                seqQuery = `ALTER SEQUENCE IF EXISTS ${table + "_" + id_title + "_seq"} RESTART`;
                await repository.query(tableQuery);
                await repository.query(seqQuery);
            }
        }
        catch (error) {
            throw new Error(`
      #tableQuery: ${tableQuery}
      #seqQuery: ${seqQuery}
      #ERROR: cleanAllSamples() => Cleaning seed entity: ${error.message} 
      `);
        }
    }
    async cleanDB() {
        let projectMetas = await (await this.databaseService.connection).entityMetadatas;
        console.assert(projectMetas.length > 0, "<<emd>> Error: projectMetas is EMPTY");
        const seedMetas = _entities_1.Seed.map(ent => ent.entityMetaData);
        console.assert(seedMetas, "<<cas>> Error: seedMetas is EMPTY");
        let truncateQuery;
        try {
            for (const meta of seedMetas) {
                const repository = await this.databaseService.getRepository(meta.entityName);
                truncateQuery = `TRUNCATE "${meta.tableName}" RESTART IDENTITY CASCADE;`;
                await repository.query(truncateQuery);
            }
        }
        catch (error) {
            throw new Error(`
        #truncateDB| Error: ${error.message} 
        #truncateQuery: ${truncateQuery}`);
        }
    }
    async cleanAllSamples() {
        let projectMetas = await (await this.databaseService.connection).entityMetadatas;
        console.assert(projectMetas.length > 0, "<<emd>> Error: projectMetas is EMPTY");
        const seedMetas = _entities_1.EntitiesSeed.map(ent => ent.entityMetaData);
        console.assert(seedMetas, "<<cas>> Error: seedMetas is EMPTY");
        let tableQuery;
        let seqQuery;
        let truncateQuery;
        try {
            for (const meta of seedMetas) {
                projectMetas = projectMetas.filter(m => m.name !== meta.entityName);
                const repository = await this.databaseService.getRepository(meta.entityName);
                truncateQuery = `TRUNCATE "${meta.tableName}" RESTART IDENTITY CASCADE;`;
                await repository.query(truncateQuery);
            }
        }
        catch (error) {
            throw new Error(`ERROR| cleanAllSamples| Error: ${error.message} 
       #truncateQuery: ${truncateQuery}
       #tableQuery: ${tableQuery}
       #seqQuery: ${seqQuery}`);
        }
        try {
            for (const meta of projectMetas) {
                const repository = await this.databaseService.getRepository(meta.name);
                await repository.query(`TRUNCATE "${meta.tableName}" RESTART IDENTITY CASCADE;`);
            }
        }
        catch (error) {
            throw new Error(`ERROR: cleanAllSamples() => Cleaning NOT seed entity: ${error.message}`);
        }
    }
    async loadSampleByCustomRepository(wantedEntities) {
        await this.cleanDB();
        for (const entityData of _entities_1.Seed) {
            const shouldLoad = wantedEntities.includes(entityData.entityMetaData.entityName);
            if (wantedEntities !== "*" && !shouldLoad)
                continue;
            try {
                console.assert(entityData, '<<test.util| entityData>>', entityData);
                const customRepository = await this.databaseService.getCustomRepository(entityData.customRepository);
                for (const sample of entityData.inputs.custom) {
                    let bSample;
                    try {
                        bSample = await customRepository.build(sample);
                    }
                    catch (error) {
                        console.error(`
              #Error happend while ${entityData.entityMetaData.tableName}Repository.save(${JSON.stringify(sample)}),
              #Error: ${error.message}`);
                    }
                }
            }
            catch (error) {
                throw new Error(`<test.utils| loadAllSamples| getCustomRepository(${entityData.entityMetaData.entityName})| error> ${error}`);
            }
        }
    }
    async loadSomeSample(wantedEntities) {
        await this.cleanAllSamples();
        for (const entityData of _entities_1.EntitiesSeed) {
            const shouldLoad = wantedEntities.includes(entityData.entityMetaData.entityName);
            if (wantedEntities !== "*" && !shouldLoad)
                continue;
            try {
                console.assert(entityData, '<<test.util| entityData>>', entityData);
                const repository = await this.databaseService.getRepository(entityData.entityMetaData.entityName);
                for (const sample of entityData.samples) {
                    let gSample;
                    try {
                        gSample = await repository.save(sample);
                    }
                    catch (error) {
                        console.log(`
              #Error happend while ${entityData.entityMetaData.tableName}Repository.save(${JSON.stringify(sample)}),
              #Error: ${error.message}`);
                    }
                }
            }
            catch (error) {
                throw new Error(`<test.utils| loadAllSamples| getRepository(${entityData.entityMetaData.entityName})| error> ${error}`);
            }
        }
    }
    async loadAllSamples() {
        await this.cleanAllSamples();
        const entitiesSeed = [..._entities_1.EntitiesSeed];
        const failedEntitiesSeed = [];
        for (const entityData of _entities_1.EntitiesSeed) {
            try {
                console.assert(entityData, '<<las1>> data: ', entityData);
                const repository = await this.databaseService.getRepository(entityData.entityMetaData.entityName);
                for (const sample of entityData.samples) {
                    let gSample;
                    try {
                        gSample = await repository.save(sample);
                    }
                    catch (error) {
                        failedEntitiesSeed.push(entityData);
                        console.log(`
                #Error happend while repository.save(${JSON.stringify(sample)}),
                #Error: ${error.message}`);
                    }
                }
            }
            catch (error) {
                throw new Error(`<test.utils| loadAllSamples| getRepository(${entityData.entityMetaData.entityName})| error> ${error}`);
            }
        }
    }
    async cleanAllSamples0() {
        const entityMetadatas = _entities_1.EntitiesSeed.map(ent => ent.entityMetaData);
        console.assert(entityMetadatas, "<<cas>> Error: entityMetadatas is EMPTY");
        try {
            for (const meta of entityMetadatas) {
                const repository = await this.databaseService.getRepository(meta.entityName);
                await repository.query(`TRUNCATE ${meta.tableName} CASCADE;`);
                await repository.query(`ALTER SEQUENCE IF EXISTS ${meta.tableName + "_" + meta.tableName + "_id_seq"} RESTART`);
            }
        }
        catch (error) {
            throw new Error(`ERROR: Cleaning test db: ${error}`);
        }
    }
    async reloadAllSamples() {
        try {
            await this.cleanAllSamples();
        }
        catch (error) {
            throw new Error(`ERROR [TestUtils][reloadAllSamples][cleanAllSamples]: cleanAllSamples : ${error}`);
        }
        try {
            await this.loadAllSamples();
        }
        catch (error) {
            throw new Error(`ERROR [TestUtils][reloadAllSamples][loadAllSamples]: loadAllSamples : ${error}`);
        }
    }
    async loadAllSamples1() {
        await this.cleanAllSamples();
        try {
            for (const data of _entities_1.EntitiesSeed) {
                console.assert(data, '<<las1>> data: ', data);
                for (const item of data.samples) {
                    console.assert(item, '<<las2>> item: ', item);
                    const nEntity = await data.entity.of(item);
                    console.assert(nEntity, '<<las3>> nEntity: ', nEntity);
                    const repository = await this.databaseService.getRepository(data.entityMetaData.entityName);
                    let gEnt;
                    try {
                        gEnt = await repository.save(nEntity);
                        console.log(gEnt);
                    }
                    catch (error) {
                        console.log('<<las4>> Error happend when saveing  nEntity: ', nEntity);
                        console.log('<<las4>> Error : ', error.message);
                        const fE = await repository.find();
                        console.log('<<las4>> Already we have  fE: ', fE);
                    }
                    console.assert(gEnt, '<<las4>> gEnt: ', gEnt);
                }
            }
        }
        catch (error) {
            throw new Error(`ERROR [TestUtils.loadAllSamples()]: Loading fixtures: ${error}`);
        }
    }
    async loadAllSamples0() {
        await this.cleanAllSamples();
        try {
            for (const data of _entities_1.EntitiesSeed) {
                console.assert(data, '<<las1>> data: ', data);
                for (const item of data.samples) {
                    console.assert(item, '<<las2>> item: ', item);
                    const nEntity = await data.entity.of(item);
                    console.assert(nEntity, '<<las3>> nEntity: ', nEntity);
                    const repository = await this.databaseService.getRepository(data.entityMetaData.entityName);
                    if (nEntity instanceof Array) {
                        for (const nE of nEntity) {
                            let gEnt;
                            try {
                                gEnt = await repository.save(nE);
                            }
                            catch (error) {
                                console.log('<<las4>> Error happend when saveing  nE: ', nE);
                                console.log('<<las4>> Error : ', error.message);
                                const fE = await repository.find();
                                console.log('<<las4>> Already we have  fE: ', fE);
                            }
                        }
                    }
                    else {
                        let gEnt;
                        try {
                            gEnt = await repository.save(nEntity);
                        }
                        catch (error) {
                            console.log('<<las4>> Error happend when saveing  nEntity: ', nEntity);
                            console.log('<<las4>> Error : ', error.message);
                            const fE = await repository.find();
                            console.log('<<las4>> Already we have  fE: ', fE);
                        }
                        console.assert(gEnt, '<<las4>> gEnt: ', gEnt);
                    }
                }
            }
        }
        catch (error) {
            throw new Error(`ERROR [TestUtils.loadAllSamples()]: Loading fixtures: ${error}`);
        }
    }
    async cleanAndLoadAllSamples() {
        await this.cleanAllSamples();
        try {
            for (const data of _entities_1.EntitiesSeed) {
                console.assert(data, '<<las1>> data: ', data);
                for (const item of data.samples) {
                    console.assert(item, '<<las2>> item: ', item);
                    const nEntity = await data.entity.of(item);
                    console.assert(nEntity, '<<las3>> nEntity: ', nEntity);
                    const repository = await this.databaseService.getRepository(data.entityMetaData.entityName);
                    if (nEntity instanceof Array) {
                        for (const nE of nEntity) {
                            let gEnt;
                            try {
                                gEnt = await repository.save(nE);
                            }
                            catch (error) {
                                console.log('<<las4>> Error happend when saveing  nE: ', nE);
                                console.log('<<las4>> Error : ', error.message);
                                const fE = await repository.find();
                                console.log('<<las4>> Already we have  fE: ', fE);
                            }
                        }
                    }
                    else {
                        let gEnt;
                        try {
                            gEnt = await repository.save(nEntity);
                        }
                        catch (error) {
                            console.log('<<las4>> Error happend when saveing  nEntity: ', nEntity);
                            console.log('<<las4>> Error : ', error.message);
                            const fE = await repository.find();
                            console.log('<<las4>> Already we have  fE: ', fE);
                        }
                        console.assert(gEnt, '<<las4>> gEnt: ', gEnt);
                    }
                }
            }
        }
        catch (error) {
            throw new Error(`ERROR [TestUtils.loadAllSamples()]: Loading fixtures: ${error}`);
        }
    }
    async cleanTable(entityName, tableName) {
        try {
            const repository = await this.databaseService.getRepository(entityName);
            await repository.query(`TRUNCATE ${tableName} CASCADE;`);
            await repository.query(`ALTER SEQUENCE IF EXISTS ${tableName + "_" + tableName + "_id_seq"} RESTART`);
        }
        catch (error) {
            throw new Error(`ERROR: Cleaning test db: ${error}`);
        }
    }
    async closeDbConnection() {
        const connection = await this.databaseService.connection;
        if (connection.isConnected) {
            await (await this.databaseService.connection).close();
        }
    }
    async shutdownServer(server) {
        await server.httpServer.close();
        await this.closeDbConnection();
    }
    getSampleData(entityName) {
    }
};
TestUtils = __decorate([
    common_1.Injectable(),
    __metadata("design:paramtypes", [database_service_1.DatabaseService])
], TestUtils);
exports.TestUtils = TestUtils;
//# sourceMappingURL=test.utils.js.map
import { DatabaseService } from "../database/database.service"
import { Injectable } from "@nestjs/common";
// import { entitiesSampelDto, EntitiesSeed, IEntityMetadata, Seed } from './fixtures/_entities';
import { EntitiesSeed, IEntityMetadata, Seed } from './fixtures/_entities';
import { format } from "url";


/**
 * This class is used to support database
 * tests with unit tests in NestJS.
 *
 * This class is inspired by https://github.com/jgordor
 * https://github.com/nestjs/nest/issues/409#issuecomment-364639051
 */
@Injectable()
export class TestUtils {
  databaseService: DatabaseService

  /**
   * Creates an instance of TestUtils
   */
  constructor(databaseService: DatabaseService) {
    if (process.env.NODE_ENV !== "test") {
      // TODO: un_comment
      // throw new Error("ERROR-TEST-UTILS-ONLY-FOR-TESTS");
      return null;
    }
    this.databaseService = databaseService;
  }

  
  /**
   * ✅ Cleans all the entities
   */
  async cleanEntities() {

    let tableQuery;
    let seqQuery;
    try {
      for (const data of EntitiesSeed.reverse()) {

        // console.assert(data ,'<<las1>> data: ', data);

        const repository = await this.databaseService.getRepository(data.entityMetaData.entityName);
        const table = data.entityMetaData.tableName;
        const id_title = data.entityMetaData.idTitle;

        tableQuery = `TRUNCATE "${table}" CASCADE;`;
        seqQuery = `ALTER SEQUENCE IF EXISTS ${table + "_" + id_title + "_seq"} RESTART`;
       
        await repository.query(tableQuery);
        await repository.query(seqQuery);

      }
    } catch (error) {
      throw new Error(`
      #tableQuery: ${tableQuery}
      #seqQuery: ${seqQuery}
      #ERROR: cleanAllSamples() => Cleaning seed entity: ${error.message} 
      ` )
    }
  }
  
  
  //! modifieng 
  async cleanDB() {

    let projectMetas = await (await this.databaseService.connection).entityMetadatas;
    
    console.assert(projectMetas.length > 0, "<<emd>> Error: projectMetas is EMPTY");

    const seedMetas: IEntityMetadata[] = Seed.map(ent =>  ent.entityMetaData);
    console.assert(seedMetas, "<<cas>> Error: seedMetas is EMPTY");

    let truncateQuery;
    try {
      for (const meta of seedMetas) {

        const repository = await this.databaseService.getRepository(meta.entityName);

        // * tabel and seq
        truncateQuery = `TRUNCATE "${meta.tableName}" RESTART IDENTITY CASCADE;`;
        // console.log('<truncateQuery>', truncateQuery);
        await repository.query(truncateQuery);

      }
    } catch (error) {
      throw new Error(`
        #truncateDB| Error: ${error.message} 
        #truncateQuery: ${truncateQuery}` )
    }
  }
  
  //TODO: working 
  async cleanAllSamples() {

    let projectMetas = await (await this.databaseService.connection).entityMetadatas;
    
    console.assert(projectMetas.length > 0, "<<emd>> Error: projectMetas is EMPTY");

    // correct order
    // some of entitis
    const seedMetas: IEntityMetadata[] = EntitiesSeed.map(ent =>  ent.entityMetaData);
    console.assert(seedMetas, "<<cas>> Error: seedMetas is EMPTY");

    // delete samples that we have inside _entitie.ts
    let tableQuery;
    let seqQuery;
    let truncateQuery;
    try {
      for (const meta of seedMetas) {
        
        // console.log('<meta>', meta);
        // allEntityMetadatas.
        projectMetas = projectMetas.filter(m => m.name !== meta.entityName);
        const repository = await this.databaseService.getRepository(meta.entityName);
        
        // tableQuery = `TRUNCATE "${meta.tableName}" CASCADE;`;
        // seqQuery = `ALTER SEQUENCE IF EXISTS ${meta.tableName + "_" + meta.idTitle + "_seq"} RESTART`;
        // // console.log('<tableQuery>', tableQuery);
        // // console.log('<seqQuery>', seqQuery);
        // await repository.query(tableQuery);
        // await repository.query(seqQuery);

        // * tabel and seq
        truncateQuery = `TRUNCATE "${meta.tableName}" RESTART IDENTITY CASCADE;`;
        // console.log('<truncateQuery>', truncateQuery);
        await repository.query(truncateQuery);

      }
    } catch (error) {
      throw new Error(`ERROR| cleanAllSamples| Error: ${error.message} 
       #truncateQuery: ${truncateQuery}
       #tableQuery: ${tableQuery}
       #seqQuery: ${seqQuery}` )
    }
    
    // delete samples that we Dont have inside _entitie.ts
    try {
      for (const meta of projectMetas) {

        const repository = await this.databaseService.getRepository(meta.name);
        // await repository.query(`TRUNCATE ${meta.tableName} CASCADE;`);
        // await repository.query(`ALTER SEQUENCE IF EXISTS ${meta.tableName + "_" + meta.tableName + "_id_seq"} RESTART`);
        await repository.query(`TRUNCATE "${meta.tableName}" RESTART IDENTITY CASCADE;`);

      }
    } catch (error) {
      throw new Error(`ERROR: cleanAllSamples() => Cleaning NOT seed entity: ${error.message}`)
    }
  }

  //TODO: do modification here
  async loadSampleByCustomRepository(wantedEntities: "*" | string[]) {

    // console.log("<loadSomeSample| wantedEntities>", wantedEntities);
    
    //* clean
    // await this.cleanAllSamples();
    // await this.cleanEntities();
    await this.cleanDB();

    //* load
    for(const entityData of Seed) {

      const shouldLoad = wantedEntities.includes(entityData.entityMetaData.entityName);
      // console.log("<shouldLoad>", shouldLoad);
      // console.log("<entityData.entityMetaData.entityName>", entityData.entityMetaData.entityName);
      
      if (wantedEntities !== "*" && !shouldLoad) continue;

      try {

        console.assert(entityData ,'<<test.util| entityData>>', entityData);
  
        const customRepository = await this.databaseService.getCustomRepository(entityData.customRepository);

        for (const sample of entityData.inputs.custom) {

          let bSample;
          try {

            bSample = await customRepository.build(sample);

          } catch (error) {

            console.error(`
              #Error happend while ${entityData.entityMetaData.tableName}Repository.save(${JSON.stringify(sample)}),
              #Error: ${error.message}`
            );
            
            // const fE = await repository.find();
            // console.log('<<las4>> Already we have  fE: ', fE);
          }
          // console.assert(gEnt ,'<<las4>> gEnt: ', gEnt);
          
        }
        
      } catch (error) {
        throw new Error(`<test.utils| loadAllSamples| getCustomRepository(${entityData.entityMetaData.entityName})| error> ${error}`);
      }
    }// end of inner for

  }
  
  //TODO: current using
  async loadSomeSample(wantedEntities: "*" | string[]) {

    // console.log("<loadSomeSample| wantedEntities>", wantedEntities);
    
    //* clean
    await this.cleanAllSamples();
    // await this.cleanEntities();

    //* load
    for(const entityData of EntitiesSeed) {
      const shouldLoad = wantedEntities.includes(entityData.entityMetaData.entityName);
      // console.log("<shouldLoad>", shouldLoad);
      // console.log("<entityData.entityMetaData.entityName>", entityData.entityMetaData.entityName);
      
      if (wantedEntities !== "*" && !shouldLoad) continue;

      try {

        console.assert(entityData ,'<<test.util| entityData>>', entityData);
  
        const repository = await this.databaseService.getRepository(entityData.entityMetaData.entityName);

        for (const sample of entityData.samples) {

          let gSample;
          try {

            gSample = await repository.save(sample);

          } catch (error) {

            console.log(`
              #Error happend while ${entityData.entityMetaData.tableName}Repository.save(${JSON.stringify(sample)}),
              #Error: ${error.message}`
            );
            
            // const fE = await repository.find();
            // console.log('<<las4>> Already we have  fE: ', fE);
          }
          // console.assert(gEnt ,'<<las4>> gEnt: ', gEnt);
          
        }
        
      } catch (error) {
        throw new Error(`<test.utils| loadAllSamples| getRepository(${entityData.entityMetaData.entityName})| error> ${error}`);
      }
    }// end of inner for


    
    
  }

  //TODO: v1
  async loadAllSamples() {
    
    await this.cleanAllSamples();
    // await this.cleanEntities();

    const entitiesSeed = [ ...EntitiesSeed ];
    const failedEntitiesSeed = [ ];

    // do {

      for(const entityData of EntitiesSeed) {
        try {
          console.assert(entityData ,'<<las1>> data: ', entityData);
    
          const repository = await this.databaseService.getRepository(entityData.entityMetaData.entityName);
  
          for (const sample of entityData.samples) {
  
            let gSample;
            try {
  
              gSample = await repository.save(sample);
  
            } catch (error) {

              //* add failed entity to failedEntitiesSeed
              failedEntitiesSeed.push(entityData);

              console.log(`
                #Error happend while repository.save(${JSON.stringify(sample)}),
                #Error: ${error.message}`
              );
              
              // const fE = await repository.find();
              // console.log('<<las4>> Already we have  fE: ', fE);
            }
            // console.assert(gEnt ,'<<las4>> gEnt: ', gEnt);
            
          }
          
        } catch (error) {
          throw new Error(`<test.utils| loadAllSamples| getRepository(${entityData.entityMetaData.entityName})| error> ${error}`);
        }
      }// end of inner for

    // } while(failedEntitiesSeed.length > 0 ); // do-while

    
    
  }

  async cleanAllSamples0() {
    const entityMetadatas: IEntityMetadata[] = EntitiesSeed.map(ent =>  ent.entityMetaData);
    console.assert(entityMetadatas, "<<cas>> Error: entityMetadatas is EMPTY");

    try {
      for (const meta of entityMetadatas) {
        const repository = await this.databaseService.getRepository(meta.entityName);
        await repository.query(`TRUNCATE ${meta.tableName} CASCADE;`);
        await repository.query(`ALTER SEQUENCE IF EXISTS ${meta.tableName + "_" + meta.tableName + "_id_seq"} RESTART`);

      }
    } catch (error) {
      throw new Error(`ERROR: Cleaning test db: ${error}`)
    }
  }

  

  /**
   * Cleans the database and reloads the entries
   */
  async reloadAllSamples() {
    try {
      await this.cleanAllSamples();
    } catch (error) {
      throw new Error(`ERROR [TestUtils][reloadAllSamples][cleanAllSamples]: cleanAllSamples : ${error}`);
    }
    
    try {
      await this.loadAllSamples();
    } catch (error) {
      throw new Error(`ERROR [TestUtils][reloadAllSamples][loadAllSamples]: loadAllSamples : ${error}`);
    }
    
  }
  
  async loadAllSamples1() {
    
    await this.cleanAllSamples();

    try {
      for (const data of EntitiesSeed) {

        console.assert(data ,'<<las1>> data: ', data);

        for (const item of data.samples) {

          console.assert(item ,'<<las2>> item: ', item);

          const nEntity = await data.entity.of(item);

          console.assert(nEntity ,'<<las3>> nEntity: ', nEntity);

          const repository = await this.databaseService.getRepository(data.entityMetaData.entityName);

          let gEnt;
          try {
            // gEnt = await nEntity.save();
            gEnt = await repository.save(nEntity);
            console.log(gEnt);

          } catch (error) {
            console.log('<<las4>> Error happend when saveing  nEntity: ', nEntity);
            console.log('<<las4>> Error : ', error.message);
            // console.assert(gEnt ,'<<las4>> gEnt: ', gEnt);
            const fE = await repository.find();
            console.log('<<las4>> Already we have  fE: ', fE);
          }
          console.assert(gEnt ,'<<las4>> gEnt: ', gEnt);
          
        }
      }
    } catch (error) {
      throw new Error(`ERROR [TestUtils.loadAllSamples()]: Loading fixtures: ${error}`)
    }
  }
  
  async loadAllSamples0() {
    
    await this.cleanAllSamples();

    try {
      for (const data of EntitiesSeed) {

        console.assert(data ,'<<las1>> data: ', data);

        for (const item of data.samples) {

          console.assert(item ,'<<las2>> item: ', item);

          const nEntity = await data.entity.of(item);

          console.assert(nEntity ,'<<las3>> nEntity: ', nEntity);

          const repository = await this.databaseService.getRepository(data.entityMetaData.entityName);

          if (nEntity instanceof Array) {

            for (const nE of nEntity) {

              let gEnt;
              try {
                // gEnt = await nE.save();
                gEnt = await repository.save(nE);
              } catch (error) {
                console.log('<<las4>> Error happend when saveing  nE: ', nE);
                console.log('<<las4>> Error : ', error.message);
                const fE = await repository.find();
                console.log('<<las4>> Already we have  fE: ', fE);
                // console.assert(gEnt ,'<<las4>> gEnt: ', gEnt);
              }
            }
          } else {

            let gEnt;
            try {
              // gEnt = await nEntity.save();
              gEnt = await repository.save(nEntity);

            } catch (error) {
              console.log('<<las4>> Error happend when saveing  nEntity: ', nEntity);
              console.log('<<las4>> Error : ', error.message);
              // console.assert(gEnt ,'<<las4>> gEnt: ', gEnt);
              const fE = await repository.find();
              console.log('<<las4>> Already we have  fE: ', fE);
            }
            console.assert(gEnt ,'<<las4>> gEnt: ', gEnt);
          }
        }
      }
    } catch (error) {
      throw new Error(`ERROR [TestUtils.loadAllSamples()]: Loading fixtures: ${error}`)
    }
  }
  
  async cleanAndLoadAllSamples() {

    await this.cleanAllSamples();

    try {
      for (const data of EntitiesSeed) {

        console.assert(data ,'<<las1>> data: ', data);

        for (const item of data.samples) {

          console.assert(item ,'<<las2>> item: ', item);

          const nEntity = await data.entity.of(item);

          console.assert(nEntity ,'<<las3>> nEntity: ', nEntity);

          const repository = await this.databaseService.getRepository(data.entityMetaData.entityName);

          if (nEntity instanceof Array) {

            for (const nE of nEntity) {

              let gEnt;
              try {
                // gEnt = await nE.save();
                gEnt = await repository.save(nE);
              } catch (error) {
                console.log('<<las4>> Error happend when saveing  nE: ', nE);
                console.log('<<las4>> Error : ', error.message);
                const fE = await repository.find();
                console.log('<<las4>> Already we have  fE: ', fE);
                // console.assert(gEnt ,'<<las4>> gEnt: ', gEnt);
              }
            }
          } else {

            let gEnt;
            try {
              // gEnt = await nEntity.save();
              gEnt = await repository.save(nEntity);

            } catch (error) {
              console.log('<<las4>> Error happend when saveing  nEntity: ', nEntity);
              console.log('<<las4>> Error : ', error.message);
              // console.assert(gEnt ,'<<las4>> gEnt: ', gEnt);
              const fE = await repository.find();
              console.log('<<las4>> Already we have  fE: ', fE);
            }
            console.assert(gEnt ,'<<las4>> gEnt: ', gEnt);
          }
        }
      }
    } catch (error) {
      throw new Error(`ERROR [TestUtils.loadAllSamples()]: Loading fixtures: ${error}`)
    }
  }

  async cleanTable(entityName: string, tableName: string) {
    // console.log('<<tce>> cleanEntity is run....');
    try {
      const repository = await this.databaseService.getRepository(entityName);
      // console.log('<<tca>> entity.tableName: ', tableName);
      // await repository.query(`DELETE FROM ${tableName};`);
      await repository.query(`TRUNCATE ${tableName} CASCADE;`);
      // Reset IDs
      // await repository.query(`DELETE FROM sqlite_sequence WHERE name='${tableName}'`);
      // await repository.query(`DROP SEQUENCE IF EXISTS ${tableName + "_" + tableName + "_id_seq"} CASCADE`);
      await repository.query(`ALTER SEQUENCE IF EXISTS ${tableName + "_" + tableName + "_id_seq"} RESTART`);
      
    } catch (error) {
      throw new Error(`ERROR: Cleaning test db: ${error}`)
    }
  }
  /**
   * Closes the database connections
   */
  async closeDbConnection() {
    const connection = await this.databaseService.connection
    if (connection.isConnected) {
      await (await this.databaseService.connection).close();
    }
  }
  /**
   * Shutdown the http server
   * and close database connections
   */
  async shutdownServer(server) {
    await server.httpServer.close();
    await this.closeDbConnection();
  }
  
  // ❌
  // async reloadFixtures() {

  //   const entities = await this.getEntities();
  //   console.assert(entities.length>0 ,'<<rF>>ERROR: entites is EMPTY'); 

  //   await this.cleanAll(entities);
  //   await this.loadAll(entities);
  // }

  /**
   * Returns the entites of the database
   */
  // ❌
  // async getEntities(): Promise<IEntityData[]> {
  //   // [
  //   //   {name: Client, tablename: client, order: 1, items: [{}, {}, {}] },
  //   //   {name: Room, tablename: room, order: 2, items: [{}, {}, {}] },
  //   // ]
  //   const entities = [];
  //   const entityMetadatas = await (await this.databaseService.connection).entityMetadatas;
    
  //   console.assert(entityMetadatas.length > 0, "<<emd>> Error: entityMetadatas is EMPTY");
  //   // console.log("<<emd>>entityMetadatas: ", entityMetadatas);

  //   entityMetadatas.forEach(entity =>{
  //       const sampleData = this.getSampleData(entity.name);

  //       if (!sampleData) return null;
        
  //       entities.push({ 
  //         name: entity.name, 
  //         tableName: entity.tableName, 
  //         order: sampleData.order,
  //         items: sampleData.items 
  //       });
  //     }
  //   );

  //   console.assert(entities.length > 0, '<<gEnt>> entities is EMPTY');
  //   console.log('<<gEnt>> entities: ', entities);

  //   return entities;
  // }

  /**
   * Cleans all the entities
   */
  // ❌
  // async cleanAll(entities: IEntityData[]) {
  //   try {
  //     for (const entity of entities.sort((a, b) => b.order - a.order)) {

  //       const repository = await this.databaseService.getRepository(entity.name);

  //       await repository.query(`TRUNCATE ${entity.tableName} CASCADE;`);
  //       await repository.query(`ALTER SEQUENCE IF EXISTS ${entity.tableName + "_" + entity.tableName + "_id_seq"} RESTART`);

  //     }
  //   } catch (error) {
  //     throw new Error(`ERROR: Cleaning test db: ${error}`)
  //   }
  // }
  
  

  /**
   * Insert the data from the src/test/fixtures folder
   */
  // async loadAllSamples(entities: IEntityData[]) {
  
  
  /**
   * Insert the data from the src/test/fixtures folder
   */
  // ❌
  // async loadAll(entities: IEntityData[]) {
  //   try {
  //     for (const entity of entities.sort((a, b) => a.order - b.order)) {
  //       let repository;
  //       try {
  //         repository = await this.databaseService.getRepository(entity.name);
  //       } catch (error) {
  //         console.log('<<tu2>> error: ', JSON.stringify(error));
  //       }
  //       console.log('<<lal>> entity:', entity);

  //       // Failed because we have some extra data that should be assign at run time; and there is not in Dtos
  //       try {
  //         const result = await repository
  //         .createQueryBuilder(entity.name)
  //         .insert()
  //         .values(entity.items)
  //         .execute();
  //       } catch (error) {
  //         console.error(`<<loadAll>> Error occourd while creating new rows for entity ${entity.name}`);
  //         console.log(error.message);
  //       }
        

  //       // const fixtureFile = Path.join(__dirname, `../test/fixtures/${entity.name}.ts`);...
  //       // if (fs.existsSync(fixtureFile)) {
  //       //   const items = JSON.parse(fs.readFileSync(fixtureFile, "utf8"))
  //       //   const result = await repository
  //       //     .createQueryBuilder(entity.name)
  //       //     .insert()
  //       //     .values(items)
  //       //     .execute();
  //       // }
  //     }
  //   } catch (error) {
  //     throw new Error(`ERROR [TestUtils.loadAll()]: Loading fixtures on test db: ${error}`)
  //   }
  // }

  /**
   * Returns the order id
   * @param entityName The entity name of which you want to have the order from
   */
  // getOrder(entityName) {
  //   const order: string[] = JSON.parse(
  //     fs.readFileSync(Path.join(__dirname, "../test/fixtures/_order.json"), "utf8")
  //   )
  //   return order.indexOf(entityName)
  // }

  // ❌
  // getSampleData(entityName: string): { entity: string, items: any[], order: number } {
  getSampleData(entityName: string) {

    // console.log('<<gsd>> entityName: ', entityName);

    // const sd = entitiesSampelDto
    // .map((sampleData , index) => {
    //   return { ...sampleData, order: index };
    // })
    // .find(sampleData => sampleData.entity === entityName );

    // // console.log('<<gsd>> sd: ', sd);
    // return sd;
  }

}

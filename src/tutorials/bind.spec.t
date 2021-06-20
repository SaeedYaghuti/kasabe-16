import { Test } from "@nestjs/testing";

jest.setTimeout(90000);

describe("Bind", () => {
    beforeEach(async done => {
        done();
    });
})

afterEach(async done => {
    done();
})

describe("jstutorial.net", () => {
    it("[4] Borrow method", async done => { 
        const runner = {
            name: 'runner',
            run: function(speed) {
                // console.log(this.name + " runs at " + speed + "Km/H");
                return (this.name + " runs at " + speed + "Km/H");
            }
        }
        const flyer = {
            name: 'flyer',
            fly: function(speed) {
                // console.log(this.name + " flies at " + speed + "Km/H");
                return (this.name + " flies at " + speed + "Km/H");
            }
        }
        
        const flyingRunner = runner.run.bind(flyer, 400);
        
        const res = flyingRunner();

        expect(res).toEqual('flyer runs at 400Km/H');

        done();
    }, 20000);

    it("[3] solution 2: bind", async done => { 
        let person = {
            name: 'Saeid',
            getName: function() {
                console.log("this.name: ", this.name);
            }
        }
        const f = person.getName.bind(person);
        
        await setTimeout(f, 1000);
        // expect(res).toBeUndefined();

        done();
    }, 20000);

    it("[2] solution 1: wrap with anonymous function", async done => { 
        let person = {
            name: 'Saeid',
            getName: function() {
                console.log("this.name: ", this.name);
            }
        }
        
        await setTimeout(function() { person.getName(); }, 1000);
        // expect(res).toBeUndefined();

        done();
    }, 20000);

    it("[1] lost this at callback", async done => { 
        let person = {
            name: 'Saeid',
            getName: function() {
                console.log("this.name: ", this.name);
                // return this.name;
            }
        }
        
        await setTimeout(person.getName, 1000);
        // expect(res).toBeUndefined();

        done();
    }, 20000);

    
    
})

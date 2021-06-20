import { Test } from "@nestjs/testing";

jest.setTimeout(90000);

describe("Tutorial Subject", () => {
    beforeEach(async done => {
        done();
    });
});

afterEach(async done => {
    done();
});

describe("Source of Tutorial", () => {
    it("[7] Object Method", async done => { 

        var obj = {
            bar: function() {
                var x = (() => this); // arrow.this = bar.this
                return x;
            }
        };
        const f1 = obj.bar(); 
        const r1 = f1(); // obj

        const f2 = obj.bar; 
        const r2 = f2()(); // windows

        expect(r1).toEqual(obj); 
        expect(r2).toEqual(undefined); // window 
        done();
    }, 2000);

    it("[7] Arrow function", async done => { 

        var obj = {
            bar: function() {
                var x = (() => this); // arrow.this = bar.this
                return x;
            }
        };
        const f1 = obj.bar(); 
        const r1 = f1(); // obj

        const f2 = obj.bar; 
        const r2 = f2()(); // windows

        expect(r1).toEqual(obj); 
        expect(r2).toEqual(undefined); // window 
        done();
    }, 2000);

    it("[6] warmup", async done => { 
        const arrow = (() => this.i) ; // this: window
        const getData = function() {
            var res = arrow; // this: window
            return res;
        }
        var i = 20;
        var obj = {
            i: 10,
            a: () => this.i,
            r: function() {
                return this.i;
            },
            getData: function() {
                var res = arrow(); // this: window
                return res;
            }
        };
        var data = {
            i: 100,
            getData: function() {
                var res = arrow(); // this: window
                return res;
            }
        };
        'theThis: {i: 20, data, obj, getData, arrow}'
        'every time we run a method that use arrow function and in arrow func it need to take this it willl be filled by theThis';
        const r1 = data.getData(); //20
        const r2 = obj.getData(); // 20
        const r3 = getData()(); // 20

        expect(r1).toEqual(undefined); // at non-strict mode it is 20
        expect(r2).toEqual(undefined); // at non-strict mode it is 20
        expect(r3).toEqual(undefined); // at non-strict mode it is 20
        done();
    }, 2000);
    
    it("[5] warmup", async done => { 
        const arrow = (() => this.i) ; // this: Global
        const getData = function() {
            var res = arrow(); // this: Global
            return res;
        }
        var i = 20;
        var obj = {
            i: 10,
            a: () => this.i,
            r: function() {
                return this.i;
            },
            getData: function() {
                var res = arrow(); // this: Global
                return res;
            }
        };
        var data = {
            i: 100,
            getData: function() {
                var res = arrow(); // this: Global
                return res;
            }
        };
        'theThis: {i: 20, data, obj, getData, arrow}'
        'every time we run a method that use arrow function and in arrow func it need to take this it willl be filled by theThis';
        const r1 = data.getData(); //20
        const r2 = obj.getData(); // 20
        const r3 = getData(); // 20

        expect(r1).toEqual(undefined); // at non-strict mode it is 20
        expect(r2).toEqual(undefined); // at non-strict mode it is 20
        expect(r3).toEqual(undefined); // at non-strict mode it is 20
        done();
    }, 2000);

    it("[4] warmup", async done => { 
        var i = 20;
        var obj = {
            i: 10,
            a: () => this.i,
            r: function() {
                return this.i;
            }
        };
        
        `How to know this comes from where?
        ## notice when you call method! (not where you define)
        ## regular function obj.r() is called by obj => so this in r()  is equal to obj`;
        var r = obj.r();
        `## notice to surrounding parameter around arrow obj.a(); they are this => here {i:20, obj}
        so this.i = 20 and this.obj.i = 10`
        var a = obj.a();
        expect(a).toEqual(undefined); // at non-strict mode it is 20
        expect(r).toEqual(10);
        done();
    }, 2000);

    it("[3] warmup", async done => { 
        var obj = {
            age4: 10,
            // person: async function() {
            //     this.age3 = 42;
            //     await setTimeout(() => {
            //         this.age2 = 52;
            //         const age1 = 52;
            //         return this;
            //     }, 1)
            // }
        }
        
        // var p = new obj.person();
        // expect(p).toBeDefined(); // {"age3": 42}
        // expect(p.age3).toEqual(42);
        // expect(p.age2).toEqual(52);
        done();
    }, 2000);

    it("[2] warmup", async done => { 
        // const age = 10;
        function Person() {
            // this.age = 42;
            setTimeout(() => {
                // this.age = 52;
                // console.log('this.age: ', this.age);
                return ('this.age: ' + this.age);
            }, 100)
        }

        var p = await new Person();
        done();
    }, 20000);
    it("[1] warmup", async done => { 
        
        expect(4).toEqual(4);
        expect(4).toBeDefined();
        expect(undefined).toBeUndefined();

        done();
    }, 20000);
});
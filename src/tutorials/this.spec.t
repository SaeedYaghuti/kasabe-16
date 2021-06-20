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
    it("[16] this in Classes", async done => { 
        class Car {
            constructor() {
                this.sayBye = this.sayBye.bind(this);
            }
            sayHi() {
                console.log(`Hello from ${this.name}`);
                return `Hello from ${this.name}`;
            }
            sayBye() {
                console.log(`Bye from ${this.name}`);
                return `Bye from ${this.name}`;
            }
            get name() {
                return 'Ferrari';
            }
        }
        class Bird {
            get name() {
                return 'Tweety';
            }
        }
        const car = new Car();
        const bird = new Bird();

        // bird.sayHi = car.sayHi;
        // bird.sayHi();
        
        // bird.sayBye = car.sayBye;
        // bird.sayBye();

        expect(car.sayHi()).toEqual('Hello from Ferrari');
        expect(car.sayHi()).toEqual('Hello from Ferrari');
        // expect(b.a).toEqual(38);


        done();
    }, 20000);

    it("[15] As a Constructor", async done => { 
        function C() {
            this.a = 37;
        }
        var c = new C();
        expect(c.a).toEqual(37);
        
        function B() {
            this.a = 37; // Discarded
            return { a: 38, b:40 }
        }
        // var b = new B();
        // expect(b.a).toEqual(38);


        done();
    }, 20000);

    it("[14] Prototype Chain", async done => { 
        function sum() {
            return this.a + this.b + this.c;
        }
        var o = {
            a:1,
            b:2,
            c:3,
            get average() {
                return (this.a + this.b + this.c)/3;
            },   
        }
        Object.defineProperty(o, 'sum', {
            get: sum,
            enumerable: true,
            configurable: true
        });
        expect(o.average).toEqual(2);
        // expect(o.sum()).toEqual(6);
        done();
    }, 20000);

    it("[13] Prototype Chain", async done => { 

        var o = {
            f: function() {
                return this.a + this.b
            }    
        }

        var p = Object.create(o);
        p.a = 1
        p.b = 4
        expect(p.f()).toEqual(5);
        done();
    }, 20000);

    it("[12] Independent Method", async done => { 

        var o = {
            prop: 37,
            
        }
        function independent() {
            return this.prop;
        }

        // o.f = independent;

        // expect(o.f()).toEqual(37);
        done();
    }, 20000);


    it("[11] Object Method", async done => { 
        var o = {
            prop: 37,
            f: function() {
                return this.prop;
            }
        }
        expect(o.f()).toEqual(37);
        done();
    }, 20000);
    
    it("[11] Arrow Function", async done => { 
        function Car() {
            this.speed = 120;
        }
        const speed = 270;
        Car.prototype.getSpeed = () => {
            return this.speed;
        }

        
        const car = new Car();
        const result = car.getSpeed();
        expect(result).toEqual(undefined);
        done();
    }, 20000);

    it("[10] Arrow Function", async done => { 
        function Car() {
            this.speed = 120;
        }
        Car.prototype.getSpeed = () => {
            return this.speed;
        }

        const car = new Car();
        const result = car.getSpeed();
        expect(result).toEqual(undefined);
        done();
    }, 20000);

    it("[9] Function context|4 Indirect Invocation ", async done => { 
        function getBrand(prefix: string) {
            return (prefix + " " + this.brand);
        }

        const honda = {
            brand: 'Honda'
        }
        const audi = {
            brand: 'Audi'
        }

        const result = getBrand.call(honda, "It is a");
        expect(result).toEqual('It is a Honda');
        
        const res = getBrand.call(audi, "It is an");
        expect(res).toEqual('It is an Audi');
        done();
    }, 20000);

    it("[8] Function context|3 only void function can be called with 'new' ", async done => { 
        function square(num:number) {
            console.log(num*num);
        }
        const s = new square(2);

        done();
    }, 20000);

    it("[7] Function context|3 only void function can be called with 'new' ", async done => { 
        function square(num:number) {
            return num * num;
        }

        'TS Error! Only a void function can be called with the "new" keyword.';
        // const s = new square(2);

        done();
    }, 20000);
    
    it("[6] Function context|3 without-new ", async done => { 
        function Car(brand: string) {
            'bcs instead of return-value we use "this": it is not usable in let res = Car() style; it shoud be used by new()';
            // if (!(this instanceof Car)) {
            if (!(new.target)) {
                throw Error('Must use the "new" operator to call Car function')
            }

            this.brand = brand;
        }
        
        Car.prototype.getBrand = function() {
            return this.brand;
        }

        try {
            const c = Car('Honda');
        } catch (error) {
            expect(error).toBeDefined();
            expect(error.message).toEqual('Must use the "new" operator to call Car function');
        }

        done();
    }, 20000);
    
    it("[5] Function context|3 new ", async done => { 
        function Car(brand: string) {
            this.brand = brand;
        }
        
        Car.prototype.getBrand = function() {
            return this.brand;
        }
        const car = new Car('Honda');
        const result = car.getBrand();
        expect(result).toEqual('Honda');

        done();
    }, 20000);

    it("[4] Function context|2 Method => bind", async done => { 
        const car = {
            brand: 'Honda',
            getBrand: function() {
                return this.brand;
            }
        }
        const bike = {
            brand: 'Harly Davidson',
        }
        
        const brand = car.getBrand.bind(bike);
        const result = brand();
        expect(result).toEqual('Harly Davidson');

        done();
    }, 20000);
    
    it("[3] Function context|2 Method => undefined", async done => { 
        const car = {
            brand: 'Honda',
            getBrand: function() {
                return this.brand;
            }
        }
        const res = car.getBrand();
        expect(res).toEqual('Honda');

        const brand = car.getBrand;
        // const result = brand();
        'TS error!'
        // expect(result).toEqual(undefined);

        done();
    }, 20000);
    
    it("[2] Function context|1 Global => undefined", async done => { 
        function show() {
            'at strict mode it is undefined';
            return (this );
        }
        const res = show();

        expect(res).toEqual(undefined);

        done();
    }, 20000);

    it("[1] start", async done => { 
        const counter = {
            count: 0,
            next: function() {
                return ++this.count;
            }
        }
        const res = counter.next();
        
        expect(res).toEqual(1);

        done();
    }, 20000);
});

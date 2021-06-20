import { Test } from "@nestjs/testing";
import { CallHandler } from '@nestjs/common';
import { filter } from 'rxjs/operators';

jest.setTimeout(90000);

describe("Prototype", () => {
    beforeEach(async done => {
        done();
    });
})

afterEach(async done => {
    done();
})

describe("javascripttutorial.net", () => {
    it("[7] w3schools.com", async done => {
        var person = {
            fullname: function() {
                return this.firstname + " " + this.lastname;
            }
        }
        var p1 = {
            firstname: 'saeid',
            lastname: 'yaghouti'
        }
        var p2 = {
            firstname: 'hasti',
            lastname: 'goonagoo'
        }

        expect(person.fullname.call(p1)).toEqual("saeid yaghouti");
        expect(person.fullname.call(p2)).toEqual("hasti goonagoo");
        done();
    }, 20000);
    
    it("[6] Borrowing slice method of Array", async done => {
        function getOddNumbers(argus: any[]) {
            // borrow slice method of Array 
            const args = Array.prototype.slice.call(argus);
            return args.filter((arg: number) => arg % 2)
        }

        let oddNumbers = getOddNumbers([10, 3, 1, 4, 8, 9]);

        expect(oddNumbers).toEqual([3, 1, 9]);
        done();
    }, 20000);

    it("[5] car.start.call(aircraft); Function Browing", async done => {
        const car = {
            name: 'car',
            start: function() {
                return `${this.name} has speed of 5`;
            },
            speedup: function() {
                return `${this.name} has speed of 90`;
            },
            stop: function() {
                return `${this.name} has speed of 0`;
            },
        }
        const aircraft = {
            name: 'aircraft',
            fly: function() {
                return `${this.name} is flying`;
            },
        }
        car.start()

        expect(car.start()).toEqual("car has speed of 5");
        expect(car.start.call(aircraft)).toEqual("aircraft has speed of 5");
        expect(aircraft.fly.call(car)).toEqual("car is flying");
        done();
    }, 20000);

    it("[4] this.height = height;", async done => {
        var o = {color: '', height: 0, width: 0} 
        function Box(height: any, width: any) {
            this.height = height;
            this.width = width;
        }
        function Widget(height: any, width: any, color: any) {
            Box.call(this, height, width);
            this.color = color;
        }

        let widget = Widget.call(o, 100, 200, 'red');

        expect(widget).toBeUndefined();
        expect(o.color).toEqual("red");
        expect(o.height).toEqual(100);
        expect(o.width).toEqual(200);
        done();
    }, 20000);
    
    it("[3] call(this, ...args)", async done => { 
        var greeting = "Hi";

        var messenger = {
            greeting: "Hello",
        }

        function say(name: string) {
            return this.greeting + " " + name + "!";
        }

        'In strict-mode we dont have this';
        // const _this = globalThis; // undefined
        // const _this = global; // TS error
        // console.log('greeting: ',greeting);

        const result = say.call(globalThis, "saeid");
        '!! Error: In strict-mode we dont have this';
        expect(result).toEqual("undefined saeid!");
        
        const res = say.call(messenger, "saeid");
        expect(res).toEqual("Hello saeid!");
        done();
    }, 20000);

    it("[2] call(this, ...args)", async done => { 
        var a = 10;

        function add(a: any, b: any) {
            return a + b;
        }

        const result = add.call(this, 10, 20);

        expect(result).toEqual(30);
        done();
    }, 20000);
    
    it("[1] this inside function is undefined", async done => { 
        var a = 10;

        function getThis() {
            return this;
        }

        const dis = getThis();

        '# In strict mode inside function this is undefined';
        expect(dis).toBeUndefined();
        done();
    }, 20000);

    
    
})

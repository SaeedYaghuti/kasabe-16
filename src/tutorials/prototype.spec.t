import { Test } from "@nestjs/testing";

jest.setTimeout(90000);

describe("Prototype", () => {
    beforeEach(async done => {
        done();
    });
})

afterEach(async done => {
    done();
})

describe("MDN inheritanc and chain", () => {
    it("[18] add extra prop to function", async done => {
        
        function Student() {
            this.name = 'John',
            this.gender = 'M'
        }
        var s1 = new Student();
        var s2 = new Student();
        
        Student.prototype.age = 3;
        
        expect(s1.age).toEqual(3);
        expect(s2.age).toEqual(3);

        done();
    }, 20000);

    it("[17] add romove to Array", async done => {
        
        // 'use strict';
        interface Array<T> {
            remove(elem: T): Array<T>;
        }

        // Array.prototype.remove = function<T>(elem: T): T[] {
        //     return this.filter(e => e !== elem);
        // }
        // let nums = new Array(3);
        // nums = [1,2,3];
        // nums.remove(3);

        done();
    }, 20000);

    it("[16] X extend prototype|8; __proto__", async done => {
        'Dont Use This Method!';
        'use strict';
        // function Foo() {}
        
        // Foo.prototype = {
        //     foo_prop: "foo value"
        // }
        // var g_prototype = {
        //     bar_prop: "bar value",
        //     __proto__: Foo.prototype
        // };

        // function Bar() {}
        // Bar.prototype = g_prototype;
        var b = {
            __proto__: {
                bar_prop: "bar value",
                __proto__: {
                    foo_prop: "foo value",
                    __prop__: Object.prototype
                }
            }
        };

        // accessable propety in b
        // expect(b.bar_prop).toEqual("bar value");
        // expect(b.foo_prop).toEqual("foo value");
        expect(b['bar_prop']).toEqual("bar value");
        expect(b['foo_prop']).toEqual("foo value");

        // B property
        expect(b.hasOwnProperty("bar_prop")).toEqual(false);
        expect(b.hasOwnProperty("foo_prop")).toEqual(false);
        expect(b.__proto__.hasOwnProperty("bar_prop")).toEqual(true);
        expect(b.__proto__.hasOwnProperty("foo_prop")).toEqual(false);
        expect(b.__proto__.__proto__.hasOwnProperty("foo_prop")).toEqual(true);

        done();
    }, 20000);

    it("[15] X extend prototype|7; __proto__", async done => {
        'Dont Use This Method!';
        'use strict';
        function Foo() {}
        
        Foo.prototype = {
            foo_prop: "foo value"
        }
        var g_prototype = {
            bar_prop: "bar value",
            __proto__: Foo.prototype
        };

        function Bar() {}
        Bar.prototype = g_prototype;
        var b = new Bar();

        // accessable propety in b
        expect(b.bar_prop).toEqual("bar value");
        expect(b.foo_prop).toEqual("foo value");

        // B property
        expect(b.hasOwnProperty("bar_prop")).toEqual(false);
        expect(b.hasOwnProperty("foo_prop")).toEqual(false);
        expect(b.__proto__.hasOwnProperty("bar_prop")).toEqual(true);
        expect(b.__proto__.hasOwnProperty("foo_prop")).toEqual(false);
        expect(b.__proto__.__proto__.hasOwnProperty("foo_prop")).toEqual(true);

        done();
    }, 20000);
    
    it("[14] X extend prototype|6; Object.setPrototypeOf()", async done => {
        'Dont Use This Method!';
        'use strict';
        function Foo() {}
        
        Foo.prototype = {
            foo_prop: "foo value"
        }
        var g_prototype = Object.setPrototypeOf({bar_prop: "bar value"}, Foo.prototype);

        function Bar() {}
        Bar.prototype = g_prototype;
        var b = new Bar();

        // accessable propety in b
        expect(b.bar_prop).toEqual("bar value");
        expect(b.foo_prop).toEqual("foo value");

        // B property
        expect(b.hasOwnProperty("bar_prop")).toEqual(false);
        expect(b.hasOwnProperty("foo_prop")).toEqual(false);
        expect(b.__proto__.hasOwnProperty("bar_prop")).toEqual(true);
        expect(b.__proto__.hasOwnProperty("foo_prop")).toEqual(false);
        expect(b.__proto__.__proto__.hasOwnProperty("foo_prop")).toEqual(true);

        done();
    }, 20000);
    
    it("[13] X extend prototype|5; Object.setPrototypeOf({}, )", async done => {
        'use strict';
        'Dont Use This Method!';
        function Foo() {}
        
        Foo.prototype = {
            foo_prop: "foo value"
        }
        var g_prototype = Object.setPrototypeOf({bar_prop: "bar value"}, Foo.prototype);

        function Bar() {}
        Bar.prototype = g_prototype;
        var b = new Bar();

        // accessable propety in b
        expect(b.bar_prop).toEqual("bar value");
        expect(b.foo_prop).toEqual("foo value");

        // B property
        expect(b.hasOwnProperty("bar_prop")).toEqual(false);
        expect(b.hasOwnProperty("foo_prop")).toEqual(false);
        expect(b.__proto__.hasOwnProperty("bar_prop")).toEqual(true);
        expect(b.__proto__.hasOwnProperty("foo_prop")).toEqual(false);
        expect(b.__proto__.__proto__.hasOwnProperty("foo_prop")).toEqual(true);

        done();
    }, 20000);
    
    it("[12] extend prototype|4; Object.setPrototypeOf()", async done => {
        'use strict';
        function Foo() {}
        
        Foo.prototype = {
            foo_prop: "foo value"
        }
        var g_prototype = {
            bar_prop: "bar value"
        }

        Object.setPrototypeOf(g_prototype, Foo.prototype);

        function Bar() {}
        Bar.prototype = g_prototype;
        var b = new Bar();

        // accessable propety in b
        expect(b.bar_prop).toEqual("bar value");
        expect(b.foo_prop).toEqual("foo value");

        // B property
        expect(b.hasOwnProperty("bar_prop")).toEqual(false);
        expect(b.hasOwnProperty("foo_prop")).toEqual(false);
        expect(b.__proto__.hasOwnProperty("bar_prop")).toEqual(true);
        expect(b.__proto__.hasOwnProperty("foo_prop")).toEqual(false);
        expect(b.__proto__.__proto__.hasOwnProperty("foo_prop")).toEqual(true);

        done();
    }, 20000);

    it("[11] extend prototype|3; Object.create(Foo.prototype, {...})", async done => {
        'use strict';
        function Foo() {}
        
        Foo.prototype = {
            foo_prop: "foo value"
        }
        var g_prototype = Object.create(
            Foo.prototype,
            {
                bar_prop: {
                    value: "bar value"
                }
            }
        );

        function Bar() {}
        Bar.prototype = g_prototype;
        var b = new Bar();

        // accessable propety in b
        expect(b.bar_prop).toEqual("bar value");
        expect(b.foo_prop).toEqual("foo value");

        // B property
        expect(b.hasOwnProperty("bar_prop")).toEqual(false);
        expect(b.hasOwnProperty("foo_prop")).toEqual(false);
        expect(b.__proto__.hasOwnProperty("bar_prop")).toEqual(true);
        expect(b.__proto__.hasOwnProperty("foo_prop")).toEqual(false);
        expect(b.__proto__.__proto__.hasOwnProperty("foo_prop")).toEqual(true);

        done();
    }, 20000); 

    it("[10] extend prototype|2; Object.create(Foo.prototype)", async done => {
        'use strict';
        function Foo() {}
        
        Foo.prototype = {
            foo_prop: "foo value"
        }
        var foo_prototype = Object.create(Foo.prototype);
        foo_prototype.bar_prop = "bar value";

        function Bar() {}
        Bar.prototype = foo_prototype;
        var b = new Bar();

        // accessable propety in b
        expect(b.bar_prop).toEqual("bar value");
        expect(b.foo_prop).toEqual("foo value");

        // B property
        expect(b.hasOwnProperty("bar_prop")).toEqual(false);
        expect(b.hasOwnProperty("foo_prop")).toEqual(false);
        expect(b.__proto__.hasOwnProperty("bar_prop")).toEqual(true);
        expect(b.__proto__.hasOwnProperty("foo_prop")).toEqual(false);
        expect(b.__proto__.__proto__.hasOwnProperty("foo_prop")).toEqual(true);

        done();
    }, 20000);
    
    it("[9] extend prototype|1; bar.prototype = f", async done => {
        'use strict';
        function Foo() {}

        Foo.prototype = {
            foo_prop: "foo value"
        }

        var f = new Foo();
        f.bar = "bar value";

        function Bar() {}
        Bar.prototype = f;

        var b = new Bar();

        // accessable propety in f
        expect(f.foo_prop).toEqual("foo value");
        expect(f.bar).toEqual("bar value");

        // accessable propety in b
        expect(b.foo_prop).toEqual("foo value");
        expect(b.bar).toEqual("bar value");

        // F property
        expect(f.hasOwnProperty("bar")).toEqual(true);
        expect(f.hasOwnProperty("foo_prop")).toEqual(false);
        expect(f.__proto__.hasOwnProperty("foo_prop")).toEqual(true);

        // B property
        expect(b.hasOwnProperty("bar")).toEqual(false);
        expect(b.hasOwnProperty("foo_prop")).toEqual(false);
        expect(b.__proto__.hasOwnProperty("bar")).toEqual(true);
        expect(b.__proto__.hasOwnProperty("foo_prop")).toEqual(false);
        expect(b.__proto__.__proto__.hasOwnProperty("foo_prop")).toEqual(true);

        done();
    }, 20000);
    
    it("[8] hasOwnProperty", async done => {
        'use strict';
        const G = function Graph() {
            this.vertices = [];
            this.edges = [];
        }

        G.prototype = {
            addVertex: function (v) {
                this.vertices.push(v);
            }
        }

        var g = new G();

        expect(g.hasOwnProperty('edges')).toEqual(true);
        expect(g.hasOwnProperty('addVertex')).toEqual(false);
        expect(g.__proto__.hasOwnProperty('addVertex')).toEqual(true);

        done();
    }, 20000);

    it("[7] __proto__ vs. prototype", async done => {
        'use strict';
        function Graph() {
            this.vertices = [];
            this.edges = [];
        }

        Graph.prototype = {
            addVertex: function (v) {
                this.vertices.push(v);
            }
        }

        var g = new Graph();

        //Difference between prototype and __proto__
        expect(g.prototype).toBeUndefined();
        expect(g.__proto__).toBeDefined();

        expect(Graph.prototype).toBeDefined();
        //TS error
        // expect(Graph.__proto__).toBeUndefined();
        
        done();
    }, 20000);

    it("[6] g.__proto__.vars has access to g.vars", async done => {
        'use strict';
        function Graph() {
            this.vertices = [];
            this.edges = [];
        }

        Graph.prototype = {
            addVertex: function (v) {
                this.vertices.push(v);
            }
        }

        var g = new Graph();

        // g has access to Graph prototype
        expect(g.addVertex).toBeDefined();
        expect(g.__proto__.addVertex).toBeDefined();

        // g.__proto__.addVertex has access to g.vertices
        g.addVertex(1);
        expect(g.vertices).toEqual([1]);
        
        done();
    }, 20000);

    it("[5] delete", async done => {
        'use strict';
        function Graph() {
            this.vertices = [4,4];
        }

        var g = new Graph();
        expect(g.vertices).toEqual([4,4]);
        
        g.vertices = 25;
        expect(g.vertices).toEqual(25);
        
        delete g.vertices;
        expect(g.vertices).toEqual(undefined);
        
        done();
    }, 20000);
    
    it("[4] Polygon", async done => {
        'use strict';
        class Polygon{
            height: number;
            width: number;
            constructor( height: number, width: number) {
                this.height = height;
                this.width = width;
            }

        }

        class Squarre extends Polygon{
            constructor(side: number) {
                super(side, side);
            }

            get area() {
                return this.height * this.width;
            }

            set side(side: number) {
                this.height = side;
                this.width = side;
            }
        }
        
        const s1 = new Squarre(2);
        expect(s1.area).toEqual(4);
        s1.side = 4;
        expect(s1.area).toEqual(16);

        done();
    }, 20000);

    it("[3] prototype in js", async done => {
        function doSomthing() {}
        doSomthing.prototype.foo = "bar";
        // console.log("1- doSomthing.prototype: ", JSON.stringify(doSomthing)); // { foo: 'ba/' }
        
        var doSomthin = function() {}
        // console.log("2- doSomthin.prototype: ", doSomthin.prototype); // doSomthin {}
        
        // arrow function don't have prototype
        var arrowFunc = () => {};
        expect(arrowFunc.prototype).toBeUndefined();
        done();
    }, 20000);

    it("[2] inheriting Methods", async done => {
        var o = {
            a: 2,
            m: function() {
                return this.a;
            }
        }

        expect(o.m()).toEqual(2);

        // p inherit from o
        var p = Object.create(o);
        p.a = 4;
        expect(p.m()).toEqual(4);
        done();
    }, 20000);

    it("[1] first method", async done => { 
        let f = function (this: any) {
            this.a = 1;
            this.b = 2;
        }
        
        let o = new f();
        expect(o).toBeDefined();
        expect(o).toBeInstanceOf(f);
        
        // add var to prototype
        f.prototype.b = 3;
        f.prototype.c = 4;
        // console.log(f.prototype); //f { b: 3, c: 4 }

        // access to new f() prototype var
        expect(o.c).toEqual(4);
        expect(o.b).toEqual(2);

        done();
    }, 20000);

    
    
})

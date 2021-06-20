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
    it("[1] first method", async done => { 
        
        expect(4).toEqual(4);
        expect(4).toBeDefined();
        expect(undefined).toBeUndefined();

        done();
    }, 20000);
});
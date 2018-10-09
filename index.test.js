const skeletorLocalServer = require('./index');

let express;
jest.mock('express');
jest.mock('opn');

const logger = {
    info: () => {},
    error: () => {}
};
const options = {logger};
let logInfoSpy;

describe('imagemin plugin', () => {

    beforeEach(() => {
        express = require('express');
        logInfoSpy = jest.spyOn(logger, 'info');
    });

    afterEach(() => {
        express.__resetServer();
        logInfoSpy.mockReset();
    });

    it('should something something', async () => {
        const something = "something";
        const config = {
            currentDirectory: 'testDir'
        };
    });
});
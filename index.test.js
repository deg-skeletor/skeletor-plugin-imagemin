const skeletorImageOptimizer = require('./index');

test('run() returns a complete status object', () => {
	const config = {};

	const expectedResponse = {
		status: 'complete',
		message: 'Sample plugin complete'
	};

    expect.assertions(1);

	return skeletorImageOptimizer().run(config).then(response => {
        expect(response).toEqual(expectedResponse);
    });
});
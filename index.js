const fs = require('fs');
const imagemin = require('image-min');
const path = require('path');

const run = (config, options) => {
    const sourceFile = options.source ? options.source.filename : null;
    return new Promise((resolve, reject) => {
        try {
            const src = fs.createReadStream(sourceFile);
            const ext = path.extname(src.path);
            src.pipe(imagemin({ext: ext})).pipe(fs.createWriteStream(`img-minified${ext}`));
            resolve({
				status: 'complete',
				message: 'Sample plugin complete'
			});
		} catch(e) {
			reject({
				status: 'error',
				message: e.message
			});
		}
    });
}

module.exports = skeletorImageOptimizer = () => (
    {
        run
    }
);
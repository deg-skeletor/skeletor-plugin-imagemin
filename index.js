const fs = require('fs');
const imagemin = require('image-min');
const path = require('path');


function run(config, options) {
    return new Promise((resolve, reject) => {
        const src = fs.createReadStream('img.gif');
        const ext = path.extname(src.path);
        src.pipe(imagemin({ext: ext})).pipe(fs.createWriteStream(`img-minified${ext}`));
    });
}

module.exports = skeletorImageOptimizer = () => (
    {
        run
    }
);
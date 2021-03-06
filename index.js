const imagemin = require('imagemin');
const imageminJpegtran = require('imagemin-jpegtran');
const imageminPngquant = require('imagemin-pngquant');
const imageminWebp = require('imagemin-webp');
const imageminSvgo = require('imagemin-svgo');
const imageminGiflossy = require('imagemin-giflossy');

const fs = require('fs-extra');
const path = require('path');

const run = (config, options) => {
    if (!Array.isArray(config.files)) {
        return Promise.resolve({
            status: 'error',
            message: 'Configuration does not contain a valid "files" property.'
        });
    }
    const promises = config.files.map(fileConfig => processFile(fileConfig, config.plugins, logger));

    return Promise.all(promises)
        .then(() => {
            const message = `${config.files.length} image(s) processed.`;
            logger.info(message);
            return {
                status: 'complete',
                message: message
            };
        })
        .catch(e => {
            logger.error(e);
            return {
                status: 'error',
                message: e.message
            };
        });
};

const processFile = (fileConfig, plugins, logger) => {
    const srcFilepath = path.resolve(process.cwd(), fileConfig.src);
    const destinationArray = getDestinations(fileConfig);
    const params = {plugins, logger, srcFilepath, destinationArray};
    const promises = initOutput(params);
    return Promise.all(promises);
};

const getDestinations = fileConfig => {
    if (Array.isArray(fileConfig.dest)) {
        return [...fileConfig.dest];
    }
    return [fileConfig.dest];
};

const initOutput = params => {
    const {plugins, logger, srcFilepath, destinationArray} = params;
    return destinationArray.map(dest => {
        const destFilepath = path.resolve(process.cwd(), dest);
        return fs
            .readFile(
                srcFilepath
            ).then(contents =>
                imagemin(
                    [srcFilepath + '/*.{jpg,png,svg,webp,gif}'],
                    destFilepath,
                    plugins
                );
            ).then(
                result => {
                    displayWarnings(result, logger);
                    return fs.ensureDir(path.dirname(destFilepath)).then(() => fs.writeFile(destFilepath, result.css));
            });
    });
};

const displayWarnings = (result, logger) => {
    const warnings = result.warnings();
    warnings.forEach(warning => logger.warn(`${warning.type}: ${warning.text}`));
};

module.exports = skeletorImageOptimizer = () => ({
    run
});
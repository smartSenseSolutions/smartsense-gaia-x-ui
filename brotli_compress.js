let fs = require('fs');
let zlib = require('zlib');

fs.readdirSync('dist/smartsense-gaia-x-ui').forEach((file) => {
    if (
        file.endsWith('.js') ||
        file.endsWith('.css') ||
        file.endsWith('.html')
    ) {
        const result = zlib.brotliCompressSync(
            fs.readFileSync('dist/smartsense-gaia-x-ui/' + file)
        );
        fs.writeFileSync('dist/smartsense-gaia-x-ui/' + file + '.br', result);
    }
});

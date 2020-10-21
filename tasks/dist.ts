import * as shell from 'shelljs';
import * as chalk from 'chalk';
import * as path from 'path';

const ROOT_DIR = path.resolve(__dirname, '..');
const DIST_DIR = path.join(ROOT_DIR, '.dist');

shell.set('-e')

function main(): number {
    console.log('clean');
    shell.exec('npm run clean');

    console.log('webpack');
    shell.exec('npm run webpack');

    return 0;
}

try {
    const retval = main();
    process.exit(retval);
} catch (e) {
    console.error(e);
    process.exit(1);
}

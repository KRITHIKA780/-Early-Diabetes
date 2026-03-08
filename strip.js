import fs from 'fs';
import path from 'path';
import stripComments from 'strip-comments';

const walkSync = (dir, filelist = []) => {
    fs.readdirSync(dir).forEach(file => {
        const dirFile = path.join(dir, file);
        if (fs.statSync(dirFile).isDirectory()) {
            if (!file.includes('node_modules') && !file.includes('.git')) {
                filelist = walkSync(dirFile, filelist);
            }
        } else {
            if (file.endsWith('.js') || file.endsWith('.jsx')) {
                filelist.push(dirFile);
            }
        }
    });
    return filelist;
};

const srcDir = path.join(process.cwd(), 'src');
const files = walkSync(srcDir);

files.forEach(file => {
    const code = fs.readFileSync(file, 'utf8');
    const stripped = stripComments(code);
    fs.writeFileSync(file, stripped);
    console.log('Stripped comments from:', file);
});

const fs = require('fs');
const path = require('path');
const matter = require('gray-matter');

const ROOT_FOLDER = '__posts';
const ALL_METADATA_LIST = [
  'title',
  'author',
  'date',
  'test',
];
const SLUG = 'slug';
const CONTENT = 'content';

function getAllDirectories() {
  return new Promise((resolve, reject) => {
    const postsDirectory = path.join(process.cwd(), ROOT_FOLDER);
    fs.readdir(postsDirectory, (error, fileList) => {
      if (error) {
        reject(error);
      }
      resolve(fileList);
    });
  });
}

function postData(segment) {
  const postsPath = `${ROOT_FOLDER}/${segment}`;
  const postsDirectory = path.join(process.cwd(), postsPath);
  const fileNames = fs.readdirSync(postsDirectory);
  const posts = fileNames.map(fileName => {
    const slug = fileName.replace(/\.md$/, '');
    const fullPath = path.join(postsDirectory, fileName);
    const fileContents = fs.readFileSync(fullPath, 'utf8');
    const matterResult = matter(fileContents);

    const result = {
      [SLUG]: slug,
      [CONTENT]: matterResult.content,
    };
    ALL_METADATA_LIST.forEach(metadata => {
      if (matterResult.data[metadata] !== undefined) {
        result[metadata] = matterResult.data[metadata];
      }
    });

    return result;
  });
  return `export const posts = ${JSON.stringify(posts)};`;
}

try {
  fs.readdirSync('cache');
} catch (e) {
  fs.mkdirSync('cache');
}

getAllDirectories()
  .then((directories) => {
    directories.forEach((directory) => {
      fs.writeFile(`cache/${directory}.js`, postData(directory), function(error) {
        if (error) return console.log(error);
        console.log(`${directory}/'s Posts cached.`);
      });
    });
  });

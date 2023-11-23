const fs = require('fs');
const path = require('path');
const matter = require('gray-matter');

const ROOT_FOLDER = '__posts';
const ALL_METADATA_LIST = [
  'title',
  'depth',
  'seq',
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

function recursive(destinationPath, result) {
  try {
    fs.readdirSync(destinationPath, { withFileTypes: true })
      .forEach((file) => {
        const path = `${destinationPath}/${file.name}`;
        if (file.isDirectory()) {
          recursive(path, result);
        } else {
          result.push(path);
        }
      });
  } catch (error) {
    return console.error('Read Error', error);
  }
}

function getLeafFiles(segment) {
  const postsPath = `${ROOT_FOLDER}/${segment}`;
  const postsDirectory = path.join(process.cwd(), postsPath);

  let result = [];
  recursive(postsDirectory, result);
  return result;
}

function postData(segment) {
  const leafFiles = getLeafFiles(segment);
  const posts = leafFiles.map(fullPath => {
    const slug = fullPath.replace(`${process.cwd()}/${ROOT_FOLDER}/${segment}/`, '').replace(/\.md$/, '');
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
  })
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

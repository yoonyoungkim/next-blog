import { join } from 'path';
import * as fs from 'fs';
import matter from 'gray-matter';

const postsDirectory = join(process.cwd(), '__posts');

type Items = {
  [key: string]: string;
}

export function getPostFileTitleListBySegment(segment: string = '') {
  return fs.readdirSync(`${postsDirectory}/${segment}`);
}

export function getPostBySlug(segment: string = '', postFileTitle: string, fields: string[] = []) {
  const slug = postFileTitle.replace(/\.md$/, '');
  const fullPath = join(`${postsDirectory}/${segment}`, `${slug}.md`);
  const fileContents = fs.readFileSync(fullPath, 'utf8');

  const { data, content } = matter(fileContents);

  const items: Items = {};

  items['slug'] = slug;

  fields.forEach((field) => {
    if (field === 'content') {
      items[field] = content;
    }

    // metadata
    if (typeof data[field] !== 'undefined') {
      items[field] = data[field];
    }
  });

  return items; // { slug, content, metadata1, metadata2, ... }
}

const getCachedPostsBySegment = async (segment: string) => {
  return await require((`../../cache/${segment}.js`)).posts;
};

export async function getAllPosts(segment: string, fields: string[] = []) {
  const cachedPostFileTitleList = (await getCachedPostsBySegment(segment));
  const postFileTitleList = getPostFileTitleListBySegment(segment)
    .map((postFileTitle) => getPostBySlug(segment, postFileTitle, fields));

  const posts = process.env.NODE_ENV === 'production' ?
    cachedPostFileTitleList : postFileTitleList;

  return posts
    .sort((post1: Items, post2: Items) => (post1.date > post2.date) ? -1 : 1);
}

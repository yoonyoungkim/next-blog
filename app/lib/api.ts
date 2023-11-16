import { join } from 'path';
import * as fs from 'fs';
import matter from 'gray-matter';

const postsDirectory = join(process.cwd(), '__posts');

export function getPostSlugs(segment: string = '') {
  return fs.readdirSync(`${postsDirectory}/${segment}`);
}

export function getPostBySlug(segment: string = '', slug: string, fields: string[] = []) {
  const realSlug = slug.replace(/\.md$/, '');
  const fullPath = join(`${postsDirectory}/${segment}`, `${realSlug}.md`);
  const fileContents = fs.readFileSync(fullPath, 'utf8');

  const { data, content } = matter(fileContents);

  type Items = {
    [key: string]: string;
  }

  const items: Items = {};

  fields.forEach((field) => {
    if (field === 'slug') {
      items[field] = realSlug;
    }

    if (field === 'content') {
      items[field] = content;
    }

    if (typeof data[field] !== 'undefined') {
      items[field] = data[field];
    }
  });

  return items;
}

export function getAllPosts(segment: string, fields: string[] = []) {
  const slugs = getPostSlugs(segment);
  return slugs
    .map((slug) => getPostBySlug(segment, slug, fields))
    .sort((post1, post2) => (post1.date > post2.date) ? -1 : 1);
}

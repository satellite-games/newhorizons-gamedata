import type { GameObjectName } from '@/registry';

/**
 * Takes a game object's or blueprint's name and returns the path
 * to the corresponding wiki article.
 * @param name The name of the game object or blueprint.
 * @returns The path to the wiki article. The first element is the book,
 * the second element is the chapter, and the third element is the article.
 */
export function getWikiPath(name: string): { book: string; chapter: string; article: string } {
  const [category, collection, blueprint] = name.split('.');
  let book, chapter: string;
  switch (category) {
    default:
      book = 'basic-rules';
      break;
  }
  switch (collection) {
    default:
      chapter = `${category}-${collection}`;
      break;
  }
  const result = { book, chapter, article: blueprint };
  return result;
}

/**
 * Reduces a game object's or blueprint's name to the corresponding collection name.
 * @param gameObjectName The name of the game object or blueprint.
 * @returns The collection name.
 */
export function getCollectionName(name: string): GameObjectName {
  const parts = name.split('.');
  let result = '';
  if (parts.length === 1) return parts[0] as GameObjectName;
  for (let i = 0; i < parts.length - 1; i++) {
    result += parts[i];
    if (i < parts.length - 2) result += '.';
  }
  return result as GameObjectName;
}

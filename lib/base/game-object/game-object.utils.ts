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
      chapter = `appendix-${category}-${collection}`;
      break;
  }
  const result = { book, chapter, article: blueprint };
  return result;
}

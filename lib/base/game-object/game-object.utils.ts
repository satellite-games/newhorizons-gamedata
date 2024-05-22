/**
 * Takes a game object's or blueprint's name and returns the path
 * to the corresponding wiki article.
 * @param name The name of the game object or blueprint.
 * @returns The path to the wiki article. The first element is the book,
 * the second element is the chapter, and the third element is the article.
 */
export function getWikiPath(name: string): [string, string, string] {
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
  const article = blueprint;
  return [book, chapter, article];
}

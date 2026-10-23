import { readFileSync } from 'node:fs';
import { describe, expect, it } from 'vitest';

/* Every Studio field either reaches a site query or is listed as editor-only.
   An editor who fills a field no query reads publishes and sees nothing
   change, so a field that queries.ts never names fails here.

   The Studio side is apps/studio/schema.json, the extracted schema that
   `pnpm generate:types` writes and typegen reads. The check is by field name
   against the GROQ in queries.ts: it catches a field no query mentions at
   all, but not one that shares a common name (title, href) with a read field,
   nor one a query fetches and a component then never renders. */

/** Fields the site never queries, kept for the Studio alone. */
const EDITOR_ONLY = new Map([
  ['projectImage.index', 'the plate follows array order; the index only labels the Studio list'],
  ['company.logo', 'shown as the media of an Experience in the Studio list'],
]);

/** Fields that live inside a value a query projects whole, so their own
 *  names never appear. Each names the projection that reads it. */
const READ_WHOLE = new Map<string, RegExp>([
  ['duration', /\bduration,/],
  ['cv.education', /\beducation,/],
  ['cv.skillGroups', /\bskillGroups\s*\}/],
  ['snippet', /content\[\]\{\s*\.\.\.,/],
  ['snippetGroup', /content\[\]\{\s*\.\.\.,/],
]);

type Node = {
  type?: string;
  name?: string;
  value?: unknown;
  attributes?: Record<string, { value: Node }>;
  rest?: Node;
  of?: Node | Node[];
};
type SchemaEntry = { name: string; type: string; value?: Node; attributes?: Node['attributes'] };

const read = (relative: string) =>
  readFileSync(new URL(relative, import.meta.url), 'utf8');

const schema = JSON.parse(read('../../../../studio/schema.json')) as SchemaEntry[];
const queries = read('./queries.ts')
  .replace(/\/\*[\s\S]*?\*\//g, '')
  .replace(/^\s*\/\/.*$/gm, '');

const isOwnType = ({ name }: SchemaEntry) =>
  !name.startsWith('sanity.') &&
  !name.endsWith('.reference') &&
  !['slug', 'code', 'geopoint'].includes(name);

/** Portable Text blocks and image values carry Sanity's own fields. */
const isSystemObject = (node: Node) => {
  const typeAttribute = node.attributes?._type?.value;
  return typeAttribute?.value === 'block' || typeAttribute?.value === 'image';
};

/** Field paths under a named type. Named types used as field values are
 *  walked once, from their own definition, rather than at every use. */
function fieldPaths(node: Node | undefined, prefix: string): string[] {
  if (!node) return [];
  if (node.type === 'array' || node.type === 'union') {
    const members = Array.isArray(node.of) ? node.of : node.of ? [node.of] : [];
    return members.flatMap((member) => fieldPaths(member, prefix));
  }
  if (node.type !== 'object' || isSystemObject(node)) return [];
  const own = Object.entries(node.attributes ?? {})
    .filter(([name]) => !name.startsWith('_'))
    .flatMap(([name, attribute]) => {
      const path = `${prefix}.${name}`;
      return [path, ...fieldPaths(attribute.value, path)];
    });
  return [...own, ...fieldPaths(node.rest, prefix)];
}

const allFieldPaths = schema
  .filter(isOwnType)
  .flatMap((entry) =>
    fieldPaths(
      entry.type === 'document' ? { type: 'object', attributes: entry.attributes } : entry.value,
      entry.name
    )
  );

const readWhole = (path: string) =>
  [...READ_WHOLE.keys()].some((owner) => path === owner || path.startsWith(`${owner}.`));

describe('Studio fields and site queries', () => {
  it('finds the schema it checks', () => {
    expect(allFieldPaths).toContain('project.images');
    expect(allFieldPaths).toContain('projectImage.caption');
  });

  it('reads every Studio field or lists it as editor-only', () => {
    const unread = allFieldPaths
      .filter((path) => !EDITOR_ONLY.has(path) && !readWhole(path))
      .filter((path) => {
        const name = path.split('.').pop() ?? '';
        return !new RegExp(`\\b${name}\\b`).test(queries);
      });

    expect(unread).toEqual([]);
  });

  it('keeps the editor-only and read-whole lists current', () => {
    for (const path of EDITOR_ONLY.keys()) expect(allFieldPaths, path).toContain(path);
    for (const [owner, projection] of READ_WHOLE) {
      expect(
        allFieldPaths.some((path) => path.startsWith(`${owner}.`)),
        owner
      ).toBe(true);
      expect(queries, owner).toMatch(projection);
    }
  });
});

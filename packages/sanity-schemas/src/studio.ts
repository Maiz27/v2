import type {Path, ReferenceFilterResolver} from 'sanity'

// Studio-only helpers shared by the schemas: they shape what an editor sees
// and is told, never what is stored.

type Keyed = {_key?: string}
type Ref = {_ref?: string}

/** The reference picker for an array of references: hide documents the array
 *  already holds, so the same tool or project cannot be added twice. */
export const excludeChosen: ReferenceFilterResolver = ({parent}) => {
  const ids = (Array.isArray(parent) ? (parent as Ref[]) : [])
    .map((item) => item?._ref)
    .filter((id): id is string => typeof id === 'string')
  return {
    filter: '!(_id in $ids)',
    params: {ids: [...ids, ...ids.map((id) => `drafts.${id}`)]},
  }
}

/** Read the value at a Studio path (string, index and `_key` segments). */
export function valueAtPath(root: unknown, path: Path): unknown {
  let current: unknown = root
  for (const segment of path) {
    if (current === null || current === undefined) return undefined
    if (typeof segment === 'string') {
      current = (current as Record<string, unknown>)[segment]
    } else if (typeof segment === 'number') {
      current = Array.isArray(current) ? current[segment] : undefined
    } else if (segment && typeof segment === 'object' && '_key' in segment) {
      current = Array.isArray(current)
        ? (current as Keyed[]).find((item) => item?._key === segment._key)
        : undefined
    } else {
      return undefined
    }
  }
  return current
}

/** Index of the `n`th (1-based) occurrence of `needle`, or -1. Mirrors the
 *  site's annotation resolver (apps/web/src/lib/annotations.ts). */
export function nthIndexOf(haystack: string, needle: string, n: number): number {
  let index = -1
  for (let i = 0; i < n; i++) {
    index = haystack.indexOf(needle, index + 1)
    if (index === -1) return -1
  }
  return index
}

/** Width and height encoded in a Sanity image asset id
 *  (`image-<hash>-<width>x<height>-<ext>`), without a round trip. */
export function assetDimensions(ref: unknown): {width: number; height: number} | null {
  if (typeof ref !== 'string') return null
  const match = /-(\d+)x(\d+)-[a-z0-9]+$/i.exec(ref)
  return match ? {width: Number(match[1]), height: Number(match[2])} : null
}

/** "2026" from a date string, or an empty string. */
export const yearOf = (date: unknown): string =>
  typeof date === 'string' && date.length >= 4 ? date.slice(0, 4) : ''

/** Join the non-empty parts of a preview subtitle. */
export const subtitle = (...parts: unknown[]): string =>
  parts.filter((part) => typeof part === 'string' && part.trim() !== '').join(' · ')

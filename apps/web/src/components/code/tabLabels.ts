const pathSuffix = (path: string, segments: number) =>
  path.split('/').slice(-segments).join('/');

/** Return the shortest path suffix that distinguishes each filename. */
export const tabLabels = (filenames: string[]): string[] =>
  filenames.map((name, index) => {
    const depth = name.split('/').length;
    for (let segments = 1; segments <= depth; segments++) {
      const candidate = pathSuffix(name, segments);
      const unique = filenames.every(
        (other, otherIndex) =>
          otherIndex === index || pathSuffix(other, segments) !== candidate
      );
      if (unique) return candidate;
    }
    return name;
  });

export const getDomain = (url: string) => {
  const { hostname } = new URL(url);
  const parts = hostname.split('.');
  if (parts.length > 2) {
    parts.shift();
  }
  return parts.join('.');
};

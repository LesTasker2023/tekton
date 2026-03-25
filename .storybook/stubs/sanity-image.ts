/**
 * Stub for @/sanity/image in Storybook.
 * Returns a chainable builder that produces a picsum placeholder URL.
 */
function createChain(w = 800, h = 600) {
  const chain = {
    width(v: number) { w = v; return chain; },
    height(v: number) { h = v; return chain; },
    auto(_f: string) { return chain; },
    quality(_q: number) { return chain; },
    url() { return `https://picsum.photos/${w}/${h}`; },
  };
  return chain;
}

export function urlFor(_source: unknown) {
  return createChain();
}

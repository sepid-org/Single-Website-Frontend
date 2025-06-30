import { useMemo } from 'react';
import { ContentNode, ContentType } from '../type';

export const useContentParser = (sanitizedContent: string): ContentNode[] => {
  return useMemo(() => {
    const parser = new DOMParser();
    const doc = parser.parseFromString(sanitizedContent, 'text/html');
    const body = doc.body;
    if (!body) {
      // if parsing really goes sideways, just return an empty array
      return [];
    }

    return Array.from(body.childNodes).map((node): ContentNode => {
      // 1) only treat bona‑fide Elements as Elements:
      if (node instanceof Element) {
        const tag = node.tagName.toLowerCase();
        if (tag === 'math-inline') {
          return { type: ContentType.MATH_INLINE, content: node.textContent || '' };
        }
        if (tag === 'math-block') {
          return { type: ContentType.MATH_BLOCK, content: node.textContent || '' };
        }
        // any other HTML gets serialized as-is
        return { type: ContentType.HTML, content: node.outerHTML };
      }

      // 2) text nodes become TEXT
      if (node.nodeType === Node.TEXT_NODE) {
        return { type: ContentType.TEXT, content: node.textContent || '' };
      }

      // 3) everything else (comments, etc.) → empty TEXT
      return { type: ContentType.TEXT, content: '' };
    });
  }, [sanitizedContent]);
};
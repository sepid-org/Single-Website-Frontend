import { useMemo } from 'react';
import { ContentNode, ContentType } from '../type';

export const useContentParser = (sanitizedContent: string): ContentNode[] => {
  return useMemo(() => {
    const parser = new DOMParser();
    const doc = parser.parseFromString(sanitizedContent, 'text/html');

    return Array.from(doc.body.childNodes).map((node): ContentNode => {
      if (node.nodeType === Node.ELEMENT_NODE) {
        const element = node as Element;
        switch (element.tagName.toLowerCase()) {
          case 'math-inline':
            return { type: ContentType.MATH_INLINE, content: element.textContent || '' };
          case 'math-block':
            return { type: ContentType.MATH_BLOCK, content: element.textContent || '' };
          default:
            return { type: ContentType.HTML, content: element.outerHTML };
        }
      } else if (node.nodeType === Node.TEXT_NODE) {
        return { type: ContentType.TEXT, content: node.textContent || '' };
      }
      return { type: ContentType.TEXT, content: '' };
    });
  }, [sanitizedContent]);
};
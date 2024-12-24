import React from 'react';
import { InlineMath, BlockMath } from 'react-katex';
import 'katex/dist/katex.min.css';
import { ContentNode, ContentType } from '../type';

interface ContentRendererProps {
  content: ContentNode[];
}

export const ContentRenderer: React.FC<ContentRendererProps> = ({ content }) => {
  return (
    <>
      {content.map((node, index) => {
        switch (node.type) {
          case ContentType.MATH_INLINE:
            try {
              return <InlineMath key={index} math={node.content} />;
            } catch {
              return <span key={index}>Invalid math-inline content</span>;
            }
          case ContentType.MATH_BLOCK:
            try {
              return <BlockMath key={index} math={node.content} />;
            } catch {
              return <div key={index}>Invalid math-block content</div>;
            }
          case ContentType.HTML:
            return (
              <div
                key={index}
                dangerouslySetInnerHTML={{ __html: node.content }}
                aria-label="HTML content"
              />
            );
          case ContentType.TEXT:
          default:
            return <span key={index}>{node.content}</span>;
        }
      })}
    </>
  );
};

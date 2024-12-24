export enum ContentType {
  TEXT = 'text',
  MATH_INLINE = 'math-inline',
  MATH_BLOCK = 'math-block',
  HTML = 'html',
}

export type ContentNode = {
  type: ContentType;
  content: string;
};
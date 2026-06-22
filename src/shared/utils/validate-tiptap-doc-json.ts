const MAX_JSON_LENGTH = 250_000;
const MAX_DEPTH = 50;
const MAX_NODES = 5_000;
const MAX_TEXT_LENGTH = 100_000;

const NODE_KEYS = new Set(['type', 'attrs', 'content', 'marks', 'text']);
const MARK_KEYS = new Set(['type', 'attrs']);

type JsonObject = Record<string, unknown>;

const isPlainObject = (value: unknown): value is JsonObject => {
  return typeof value === 'object' && value !== null && !Array.isArray(value);
};

const hasOnlyKeys = (value: JsonObject, allowedKeys: Set<string>) => {
  return Object.keys(value).every((key) => allowedKeys.has(key));
};

const isValidAttrs = (attrs: unknown) => {
  return attrs === undefined || isPlainObject(attrs);
};

const isValidMarks = (marks: unknown) => {
  if (marks === undefined) return true;
  if (!Array.isArray(marks)) return false;

  return marks.every((mark) => {
    if (!isPlainObject(mark)) return false;
    if (!hasOnlyKeys(mark, MARK_KEYS)) return false;
    if (typeof mark.type !== 'string' || mark.type.length === 0) return false;

    return isValidAttrs(mark.attrs);
  });
};

export const isValidTiptapDocJson = (value: unknown) => {
  if (!isPlainObject(value)) return false;

  try {
    if (JSON.stringify(value).length > MAX_JSON_LENGTH) return false;
  } catch {
    return false;
  }

  if (value.type !== 'doc') return false;
  if (!Array.isArray(value.content)) return false;

  const stack: Array<{ node: unknown; depth: number }> = [{ node: value, depth: 1 }];
  let nodeCount = 0;

  while (stack.length > 0) {
    const current = stack.pop();

    if (!current) return false;

    const { node, depth } = current;

    if (!isPlainObject(node)) return false;
    if (!hasOnlyKeys(node, NODE_KEYS)) return false;
    if (typeof node.type !== 'string' || node.type.length === 0) return false;
    if (!isValidAttrs(node.attrs)) return false;
    if (!isValidMarks(node.marks)) return false;

    nodeCount += 1;

    if (nodeCount > MAX_NODES || depth > MAX_DEPTH) return false;

    if (node.type === 'text') {
      if (typeof node.text !== 'string') return false;
      if (node.text.length > MAX_TEXT_LENGTH) return false;
      if (node.content !== undefined) return false;
    } else if (node.text !== undefined) {
      return false;
    }

    if (node.content === undefined) continue;
    if (!Array.isArray(node.content)) return false;

    for (const child of node.content) {
      stack.push({ node: child, depth: depth + 1 });
    }
  }

  return true;
};

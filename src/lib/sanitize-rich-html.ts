import DOMPurify from "isomorphic-dompurify";

const ALLOWED_RTE_CLASSES = new Set([
  "rte-fs-sm",
  "rte-fs-md",
  "rte-fs-lg",
  "rte-fs-xl",
  "rte-ul-disc",
  "rte-ul-circle",
  "rte-ul-square",
]);

const TAG_SET = new Set([
  "strong",
  "em",
  "ul",
  "ol",
  "li",
  "span",
  "p",
  "br",
  "h2",
  "h3",
]);

DOMPurify.addHook("uponSanitizeAttribute", (node, hookEvent) => {
  const el = node as Element;
  const name = hookEvent.attrName;
  if (name === "class") {
    const tokens = (hookEvent.attrValue || "")
      .split(/\s+/)
      .filter(Boolean)
      .filter((t) => ALLOWED_RTE_CLASSES.has(t));
    if (tokens.length === 0) {
      hookEvent.keepAttr = false;
    } else {
      hookEvent.attrValue = tokens.join(" ");
    }
    return;
  }
  if (name === "style" && el.tagName === "SPAN") {
    const s = String(hookEvent.attrValue ?? "").toLowerCase();
    const m = s.match(/font-size\s*:\s*([0-9]{1,3})\s*px/);
    if (!m) {
      hookEvent.keepAttr = false;
      return;
    }
    const px = Math.min(72, Math.max(10, Number(m[1] || 16)));
    hookEvent.attrValue = `font-size:${px}px`;
    return;
  }
  if (name === "type" && el.tagName === "OL") {
    const v = String(hookEvent.attrValue ?? "");
    if (!["1", "a", "A", "i", "I"].includes(v)) {
      hookEvent.keepAttr = false;
    }
  }
});

/** CMS: subset of HTML for body/excerpt fields. */
export function sanitizeRichHtml(dirty: string): string {
  return DOMPurify.sanitize(dirty, {
    ALLOWED_TAGS: [...TAG_SET],
    ALLOWED_ATTR: ["class", "style", "type"],
  });
}

/** Strips tags for list previews / SEO after sanitization. */
export function richToPlainText(html: string): string {
  const safe = sanitizeRichHtml(html);
  return safe
    .replace(/<[^>]+>/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

/**
 * Legacy posts: plain text paragraphs split by blank lines.
 * New posts: may include `<ul>`, `<ol>`, `<p>`, headings — sanitize as one fragment.
 */
export function normalizeBlogBody(raw: string): string {
  const t = raw.trim();
  if (!t) return "";
  const hasBlockHtml = /<(ul|ol|p|h2|h3)\b/i.test(t);
  const hasInlineHtml = /<(strong|em|span)\b/i.test(t);

  // If it has block-level HTML, render as-is (sanitized).
  if (hasBlockHtml) return sanitizeRichHtml(t);

  // Inline-only HTML (e.g. font-size spans) still needs newline preservation.
  // Turn single newlines into <br> inside each paragraph block.
  if (hasInlineHtml) {
    return t
      .split(/\n\n+/)
      .map((b) => b.trim())
      .filter(Boolean)
      .map((block) => block.replace(/\n/g, "<br />"))
      .map(
        (block) =>
          `<p class="mb-6 text-body-lg leading-relaxed text-[var(--color-void)] last:mb-0 [&_em]:italic [&_strong]:font-bold">${sanitizeRichHtml(block)}</p>`,
      )
      .join("");
  }

  return t
    .split(/\n\n+/)
    .map((b) => b.trim())
    .filter(Boolean)
    .map(
      (block) =>
        `<p class="mb-6 whitespace-pre-wrap text-body-lg leading-relaxed text-[var(--color-void)] last:mb-0 [&_em]:italic [&_strong]:font-bold">${sanitizeRichHtml(block)}</p>`,
    )
    .join("");
}

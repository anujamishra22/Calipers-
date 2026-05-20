/**
 * Wrap the textarea selection with <strong> or <em>. Inserts empty tags at cursor if nothing selected.
 * @param {string} textareaId
 * @param {"strong"|"em"} tag
 */
function rteWrap(textareaId, tag) {
  const el = document.getElementById(textareaId);
  if (!el || el.tagName !== "TEXTAREA") return;
  const ta = /** @type {HTMLTextAreaElement} */ (el);
  const prevScrollTop = ta.scrollTop;
  const prevScrollLeft = ta.scrollLeft;
  const open = "<" + tag + ">";
  const close = "</" + tag + ">";
  const start = ta.selectionStart;
  const end = ta.selectionEnd;
  const val = ta.value;
  const selected = val.slice(start, end);
  const wrapped = open + selected + close;
  ta.value = val.slice(0, start) + wrapped + val.slice(end);
  ta.focus();
  if (start === end) {
    ta.setSelectionRange(start + open.length, start + open.length);
  } else {
    ta.setSelectionRange(start + open.length, start + open.length + selected.length);
  }
  // Prevent textarea viewport jump after value/selection updates.
  ta.scrollTop = prevScrollTop;
  ta.scrollLeft = prevScrollLeft;
}

window.rteWrap = rteWrap;

function rteWrapSpan(textareaId, className) {
  const el = document.getElementById(textareaId);
  if (!el || el.tagName !== "TEXTAREA") return;
  const ta = /** @type {HTMLTextAreaElement} */ (el);
  const prevScrollTop = ta.scrollTop;
  const prevScrollLeft = ta.scrollLeft;
  const open = '<span class="' + className + '">';
  const close = "</span>";
  const start = ta.selectionStart;
  const end = ta.selectionEnd;
  const val = ta.value;
  const selected = val.slice(start, end);
  const wrapped = open + selected + close;
  ta.value = val.slice(0, start) + wrapped + val.slice(end);
  ta.focus();
  if (start === end) {
    ta.setSelectionRange(start + open.length, start + open.length);
  } else {
    ta.setSelectionRange(start + open.length, start + open.length + selected.length);
  }
  ta.scrollTop = prevScrollTop;
  ta.scrollLeft = prevScrollLeft;
}

function rteFontSize(textareaId, size) {
  rteWrapSpan(textareaId, "rte-fs-" + size);
}

function rteWrapSpanStyle(textareaId, styleText) {
  const el = document.getElementById(textareaId);
  if (!el || el.tagName !== "TEXTAREA") return;
  const ta = /** @type {HTMLTextAreaElement} */ (el);
  const prevScrollTop = ta.scrollTop;
  const prevScrollLeft = ta.scrollLeft;
  const open = '<span style="' + styleText + '">';
  const close = "</span>";
  const start = ta.selectionStart;
  const end = ta.selectionEnd;
  const val = ta.value;
  const selected = val.slice(start, end);
  const wrapped = open + selected + close;
  ta.value = val.slice(0, start) + wrapped + val.slice(end);
  ta.focus();
  if (start === end) {
    ta.setSelectionRange(start + open.length, start + open.length);
  } else {
    ta.setSelectionRange(start + open.length, start + open.length + selected.length);
  }
  ta.scrollTop = prevScrollTop;
  ta.scrollLeft = prevScrollLeft;
}

function rteFontSizePx(textareaId, inputId) {
  const input = document.getElementById(inputId);
  const raw = input && "value" in input ? String(input.value) : "";
  const n = Math.round(Number(raw));
  // Bound to safe range used by sanitizer.
  const px = Number.isFinite(n) ? Math.min(72, Math.max(10, n)) : 16;
  rteWrapSpanStyle(textareaId, "font-size:" + px + "px");
}

/**
 * Insert unordered / ordered list. Each selected line becomes a `<li>`; empty selection inserts a template.
 * @param {string} textareaId
 * @param {string} variant ul-disc | ul-circle | ul-square | ol-1 | ol-a | ol-A | ol-i | ol-I
 */
function rteInsertList(textareaId, variant) {
  const el = document.getElementById(textareaId);
  if (!el || el.tagName !== "TEXTAREA") return;
  const ta = /** @type {HTMLTextAreaElement} */ (el);
  const start = ta.selectionStart ?? 0;
  const end = ta.selectionEnd ?? start;
  const val = ta.value ?? "";
  const sel = val.slice(start, end);
  const lines = sel ? normalizeNewlines(sel).split("\n") : [];
  const items = lines.map((l) => l.trim()).filter(Boolean);
  const body = items.length ? items.map((l) => `<li>${l}</li>`).join("") : "<li>List item</li>";
  let html = "";
  if (variant.startsWith("ul-")) {
    const cls =
      variant === "ul-circle"
        ? "rte-ul-circle"
        : variant === "ul-square"
          ? "rte-ul-square"
          : "rte-ul-disc";
    html = `<ul class="${cls}">${body}</ul>`;
  } else if (variant.startsWith("ol-")) {
    const t = variant.slice(3);
    html = `<ol type="${t}">${body}</ol>`;
  }
  insertAtSelection(ta, html);
}

window.rteWrapSpan = rteWrapSpan;
window.rteFontSize = rteFontSize;
window.rteInsertList = rteInsertList;
window.rteFontSizePx = rteFontSizePx;

function normalizeNewlines(s) {
  return String(s ?? "").replace(/\r\n/g, "\n").replace(/\r/g, "\n");
}

function collapseParagraphBreaks(s) {
  // Keep user spacing stable while avoiding runaway blank lines from HTML paste.
  return s.replace(/\n{4,}/g, "\n\n\n");
}

/**
 * Converts clipboard HTML into a textarea-friendly string that preserves:
 * - bold/italic (as <strong>/<em>)
 * - line breaks / paragraph spacing (as \n and \n\n)
 */
function htmlToTextareaRich(html) {
  const parser = new DOMParser();
  const doc = parser.parseFromString(String(html ?? ""), "text/html");

  /** @param {Node} node */
  function walk(node) {
    if (node.nodeType === Node.TEXT_NODE) {
      return normalizeNewlines(node.nodeValue ?? "").replace(/\u00A0/g, " ");
    }
    if (node.nodeType !== Node.ELEMENT_NODE) return "";

    /** @type {HTMLElement} */
    const el = /** @type {any} */ (node);
    const tag = (el.tagName || "").toLowerCase();

    if (tag === "br") return "\n";

    // Inline emphasis
    if (tag === "strong" || tag === "b") {
      return "<strong>" + Array.from(el.childNodes).map(walk).join("") + "</strong>";
    }
    if (tag === "em" || tag === "i") {
      return "<em>" + Array.from(el.childNodes).map(walk).join("") + "</em>";
    }

    if (tag === "span") {
      const style = String(el.getAttribute("style") || "").toLowerCase();
      const m = style.match(/font-size\s*:\s*([0-9]{1,3})\s*px/);
      if (m) {
        const px = Math.min(72, Math.max(10, Number(m[1] || 16)));
        const inner = Array.from(el.childNodes).map(walk).join("");
        return `<span style="font-size:${px}px">${inner}</span>`;
      }
      return Array.from(el.childNodes).map(walk).join("");
    }

    if (tag === "ul") {
      const style = (el.getAttribute("style") || "").toLowerCase();
      let cls = "rte-ul-disc";
      if (style.includes("circle")) cls = "rte-ul-circle";
      if (style.includes("square")) cls = "rte-ul-square";
      const lis = [];
      for (const child of el.children) {
        if (child.tagName.toLowerCase() === "li") {
          const inner = Array.from(child.childNodes).map(walk).join("").trim();
          if (inner) lis.push("<li>" + inner + "</li>");
        }
      }
      const inner = lis.join("");
      return inner ? `<ul class="${cls}">${inner}</ul>\n\n` : "";
    }

    if (tag === "ol") {
      let type = String(el.getAttribute("type") || "1").trim();
      if (!["1", "a", "A", "i", "I"].includes(type)) type = "1";
      const lis = [];
      for (const child of el.children) {
        if (child.tagName.toLowerCase() === "li") {
          const inner = Array.from(child.childNodes).map(walk).join("").trim();
          if (inner) lis.push("<li>" + inner + "</li>");
        }
      }
      const inner = lis.join("");
      return inner ? `<ol type="${type}">${inner}</ol>\n\n` : "";
    }

    // List items behave like a paragraph line.
    if (tag === "li") {
      const inner = Array.from(el.childNodes).map(walk).join("").trim();
      return inner ? inner + "\n" : "";
    }

    // Block-ish elements: keep as paragraphs separated by blank lines.
    if (
      tag === "p" ||
      tag === "div" ||
      tag === "section" ||
      tag === "article" ||
      tag === "header" ||
      tag === "footer" ||
      tag === "blockquote" ||
      tag === "h1" ||
      tag === "h2" ||
      tag === "h3" ||
      tag === "h4" ||
      tag === "h5" ||
      tag === "h6"
    ) {
      const inner = Array.from(el.childNodes).map(walk).join("").trim();
      return inner ? inner + "\n\n" : "";
    }

    // Default: unwrap element but keep its text/inline emphasis.
    return Array.from(el.childNodes).map(walk).join("");
  }

  const raw = Array.from(doc.body.childNodes).map(walk).join("");
  const normalized = collapseParagraphBreaks(normalizeNewlines(raw)).trimEnd();
  return normalized;
}

function insertAtSelection(ta, text) {
  const prevScrollTop = ta.scrollTop;
  const prevScrollLeft = ta.scrollLeft;
  const start = ta.selectionStart ?? 0;
  const end = ta.selectionEnd ?? start;
  const val = ta.value ?? "";
  ta.value = val.slice(0, start) + text + val.slice(end);
  const next = start + text.length;
  ta.focus();
  ta.setSelectionRange(next, next);
  ta.scrollTop = prevScrollTop;
  ta.scrollLeft = prevScrollLeft;
}

function shouldHandleHtmlPaste(html) {
  const s = String(html ?? "");
  // Handle when HTML contains formatting or structure (paragraphs/lists).
  return /<(strong|b|em|i|p|div|br|li|ul|ol|h[1-6])[\s>]/i.test(s);
}

function bindRichPasteHandlers() {
  const fields = document.querySelectorAll("textarea.rte-input");
  fields.forEach((ta) => {
    ta.addEventListener("paste", (e) => {
      const ev = /** @type {ClipboardEvent} */ (e);
      const cd = ev.clipboardData;
      if (!cd) return;
      const html = cd.getData("text/html");
      if (!html || !shouldHandleHtmlPaste(html)) return;

      ev.preventDefault();
      const rich = htmlToTextareaRich(html);
      insertAtSelection(/** @type {HTMLTextAreaElement} */ (ta), rich);
    });
  });
}

if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", bindRichPasteHandlers);
} else {
  bindRichPasteHandlers();
}

async function uploadCover(inputId, targetInputId) {
  const input = document.getElementById(inputId);
  const target = document.getElementById(targetInputId);
  if (!input || !input.files || !input.files[0] || !target) return;
  const fd = new FormData();
  fd.append("file", input.files[0]);
  const res = await fetch("/api/uploads", { method: "POST", body: fd, credentials: "include" });
  if (!res.ok) {
    alert("Upload failed");
    return;
  }
  const data = await res.json();
  target.value = data.url;
}

window.uploadCover = uploadCover;

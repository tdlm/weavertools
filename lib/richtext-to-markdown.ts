import TurndownService from "turndown";

/**
 * Converts HTML/RichText content to Markdown format
 * @param html - The HTML string to convert
 * @returns The converted Markdown string
 */
export function convertHtmlToMarkdown(html: string): string {
  if (!html || html.trim().length === 0) {
    return "";
  }

  const turndownService = new TurndownService({
    headingStyle: "atx",
    codeBlockStyle: "fenced",
    bulletListMarker: "-",
    emDelimiter: "*",
    strongDelimiter: "**",
  });

  // Add rule for horizontal rules (dividing lines)
  turndownService.addRule("horizontalRule", {
    filter: "hr",
    replacement: () => "\n---\n",
  });

  // Handle horizontal rules that might be styled divs or borders (common in Slack Canvas)
  turndownService.addRule("horizontalRuleDiv", {
    filter: (node) => {
      if (node.nodeName === "DIV" || node.nodeName === "HR") {
        const element = node as HTMLElement;
        const style = element.getAttribute("style") || "";
        const className = element.getAttribute("class") || "";
        // Check for border-bottom, border-top, or hr-like styling
        return (
          style.includes("border-bottom") ||
          style.includes("border-top") ||
          style.includes("border:") ||
          className.toLowerCase().includes("divider") ||
          className.toLowerCase().includes("separator") ||
          className.toLowerCase().includes("hr")
        );
      }
      return false;
    },
    replacement: () => "\n---\n",
  });

  // Configure turndown to handle common HTML elements
  turndownService.addRule("strikethrough", {
    filter: ["del", "s", "strike"],
    replacement: (content) => `~~${content}~~`,
  });

  turndownService.addRule("underline", {
    filter: ["u"],
    replacement: (content) => content,
  });

  // Custom rule for headings to prevent bullets from being added
  turndownService.addRule("headings", {
    filter: ["h1", "h2", "h3", "h4", "h5", "h6"],
    replacement: (content, node) => {
      const level = (node as HTMLElement).tagName.toLowerCase().replace("h", "");
      const hashes = "#".repeat(parseInt(level, 10));
      return `\n${hashes} ${content.trim()}\n`;
    },
  });

  try {
    let markdown = turndownService.turndown(html);

    // Remove list markers (bullets) that appear before headings
    // This handles cases where headings are incorrectly treated as list items
    markdown = markdown.replace(/^[\s]*[-*+]\s+(#{1,6}\s+)/gm, "$1");

    // Clean up spacing around horizontal rules (both --- and === styles)
    markdown = markdown.replace(/\n\s*---+\s*\n/g, "\n---\n");
    markdown = markdown.replace(/\n\s*===+\s*\n/g, "\n===\n");

    // Preserve blank lines between list items, but clean up excessive blank lines
    // Only remove 3+ consecutive blank lines, preserving 1-2 blank lines
    // This maintains spacing between list items while cleaning up excessive spacing
    markdown = markdown.replace(/\n{4,}/g, "\n\n\n");

    // Remove leading/trailing whitespace from each line (but preserve intentional spacing)
    markdown = markdown
      .split("\n")
      .map((line) => {
        // Don't trim lines that are just whitespace if they're between list items
        const trimmed = line.trimEnd();
        // If the line is empty or just whitespace, return empty string
        // The split/join will handle the newlines
        return trimmed === "" ? "" : trimmed;
      })
      .join("\n");

    // Clean up any remaining excessive blank lines (more than 2 consecutive)
    markdown = markdown.replace(/\n{3,}/g, "\n\n");

    // Remove leading/trailing whitespace from the entire output
    markdown = markdown.trim();

    return markdown;
  } catch (error) {
    throw new Error(`Failed to convert HTML to Markdown: ${(error as Error).message}`);
  }
}


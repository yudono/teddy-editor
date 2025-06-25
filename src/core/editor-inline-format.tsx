import { Bold, Italic, Underline, Strikethrough } from "lucide-react";
import type { RefObject } from "react";

interface InlineFormatProps {
  editorRef: RefObject<HTMLDivElement | null>;
  activeFormats: {
    bold: boolean;
    italic: boolean;
    underline: boolean;
    strikethrough: boolean;
  };
  updateActiveFormats: () => void;
  getButtonClass: (isActive: boolean) => string;
}

export const applyInlineFormat = (
  tagName: string,
  editorRef: RefObject<HTMLDivElement | null>,
  updateActiveFormats: () => void
) => {
  const selection = window.getSelection();
  if (!selection || selection.rangeCount === 0 || !editorRef.current) return;

  const range = selection.getRangeAt(0);
  if (!range.toString()) return; // No text selected

  try {
    // Store the selected text content
    const selectedText = range.toString();

    // Check if the selection is already wrapped in the target tag by traversing up the DOM
    const isFormatted = () => {
      let element = range.commonAncestorContainer;
      while (element && element !== editorRef.current) {
        if (element.nodeType === Node.ELEMENT_NODE) {
          const el = element as HTMLElement;
          if (el.tagName.toLowerCase() === tagName.toLowerCase()) {
            return { isFormatted: true, formatElement: el };
          }
        }
        element = element.parentNode as Node;
      }
      return { isFormatted: false, formatElement: null };
    };

    const { isFormatted: hasFormat, formatElement } = isFormatted();
    let newElement: HTMLElement | null = null;

    if (hasFormat && formatElement) {
      // Remove formatting by unwrapping
      const parent = formatElement.parentNode;
      const textNode = document.createTextNode(formatElement.textContent || "");

      parent?.replaceChild(textNode, formatElement);
      parent?.normalize();

      // Create new range for the unwrapped text
      const newRange = document.createRange();
      newRange.selectNodeContents(textNode);
      selection.removeAllRanges();
      selection.addRange(newRange);
    } else {
      // Apply formatting by wrapping
      newElement = document.createElement(tagName);

      try {
        range.surroundContents(newElement);

        // Select the content inside the new element
        const newRange = document.createRange();
        newRange.selectNodeContents(newElement);
        selection.removeAllRanges();
        selection.addRange(newRange);
      } catch (e) {
        // If surroundContents fails, use extract and insert method
        const contents = range.extractContents();
        newElement.appendChild(contents);
        range.insertNode(newElement);

        // Select the content inside the new element
        const newRange = document.createRange();
        newRange.selectNodeContents(newElement);
        selection.removeAllRanges();
        selection.addRange(newRange);
      }
    }

    // Update active formats immediately
    updateActiveFormats();
  } catch (error) {
    console.warn("Error applying format:", error);
    // Fallback: just update active formats
    updateActiveFormats();
  }
};

const EditorInlineFormat: React.FC<InlineFormatProps> = ({
  editorRef,
  activeFormats,
  updateActiveFormats,
  getButtonClass,
}) => {
  return (
    <div className="flex gap-1">
      <button
        onClick={() =>
          applyInlineFormat("strong", editorRef, updateActiveFormats)
        }
        className={getButtonClass(activeFormats.bold)}
        title="Bold"
      >
        <Bold size={18} />
      </button>
      <button
        onClick={() => applyInlineFormat("em", editorRef, updateActiveFormats)}
        className={getButtonClass(activeFormats.italic)}
        title="Italic"
      >
        <Italic size={18} />
      </button>
      <button
        onClick={() => applyInlineFormat("u", editorRef, updateActiveFormats)}
        className={getButtonClass(activeFormats.underline)}
        title="Underline"
      >
        <Underline size={18} />
      </button>
      <button
        onClick={() => applyInlineFormat("s", editorRef, updateActiveFormats)}
        className={getButtonClass(activeFormats.strikethrough)}
        title="Strikethrough"
      >
        <Strikethrough size={18} />
      </button>
    </div>
  );
};

export default EditorInlineFormat;

import { List, ListOrdered } from "lucide-react";
import type { RefObject } from "react";

interface ListProps {
  editorRef: RefObject<HTMLDivElement | null>;
  activeFormats: {
    bulletList: boolean;
    numberedList: boolean;
  };
  updateActiveFormats: () => void;
  getButtonClass: (isActive: boolean) => string;
}

export const applyListFormat = (
  listType: "ul" | "ol",
  editorRef: RefObject<HTMLDivElement | null>,
  updateActiveFormats: () => void
) => {
  const selection = window.getSelection();
  if (!selection || selection.rangeCount === 0 || !editorRef.current) return;

  const range = selection.getRangeAt(0);
  let element = range.commonAncestorContainer;

  // If we're in a text node, get its parent
  if (element.nodeType === Node.TEXT_NODE) {
    element = element.parentNode as Node;
  }

  // Find the closest block element or list item
  let blockElement = element as HTMLElement;
  while (blockElement && blockElement !== editorRef.current) {
    if (
      ["P", "H1", "H2", "H3", "H4", "H5", "H6", "LI", "UL", "OL"].includes(
        blockElement.tagName
      )
    ) {
      break;
    }
    blockElement = blockElement.parentElement as HTMLElement;
  }

  if (!blockElement || blockElement === editorRef.current) {
    // Create new list if no block element found
    const listElement = document.createElement(listType);
    const listItem = document.createElement("li");
    listItem.textContent = selection.toString() || "List item";
    listElement.appendChild(listItem);

    range.deleteContents();
    range.insertNode(listElement);

    // Set cursor in the list item
    const newRange = document.createRange();
    newRange.setStart(listItem, 0);
    newRange.setEnd(listItem, listItem.childNodes.length);
    selection.removeAllRanges();
    selection.addRange(newRange);
  } else if (blockElement.tagName === "LI") {
    // Already in a list item, toggle list type or remove list
    const currentList = blockElement.parentElement as HTMLElement;
    if (currentList.tagName.toLowerCase() === listType) {
      // Remove list formatting
      const paragraph = document.createElement("p");
      paragraph.innerHTML = blockElement.innerHTML;
      currentList.parentNode?.replaceChild(paragraph, currentList);
    } else {
      // Change list type
      const newList = document.createElement(listType);
      newList.innerHTML = currentList.innerHTML;
      currentList.parentNode?.replaceChild(newList, currentList);
    }
  } else {
    // Convert block element to list
    const listElement = document.createElement(listType);
    const listItem = document.createElement("li");
    listItem.innerHTML = blockElement.innerHTML;
    listElement.appendChild(listItem);
    blockElement.parentNode?.replaceChild(listElement, blockElement);
  }

  updateActiveFormats();
};

const EditorList: React.FC<ListProps> = ({
  editorRef,
  activeFormats,
  updateActiveFormats,
  getButtonClass,
}) => {
  return (
    <div className="flex gap-1">
      <button
        onClick={() => {
          if (editorRef?.current) {
            applyListFormat("ul", editorRef, updateActiveFormats);
          }
        }}
        className={getButtonClass(activeFormats.bulletList)}
        title="Bullet List"
      >
        <List size={18} />
      </button>
      <button
        onClick={() => {
          if (editorRef?.current) {
            applyListFormat("ol", editorRef, updateActiveFormats);
          }
        }}
        className={getButtonClass(activeFormats.numberedList)}
        title="Numbered List"
      >
        <ListOrdered size={18} />
      </button>
    </div>
  );
};

export default EditorList;

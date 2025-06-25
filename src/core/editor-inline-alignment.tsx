import { AlignLeft, AlignCenter, AlignRight, AlignJustify } from "lucide-react";

interface AlignmentProps {
  activeFormats: {
    alignLeft: boolean;
    alignCenter: boolean;
    alignRight: boolean;
    alignJustify: boolean;
  };
  updateActiveFormats: () => void;
  getButtonClass: (isActive: boolean) => string;
}

export const applyAlignment = (
  alignment: "left" | "center" | "right" | "justify",
  updateActiveFormats: () => void
) => {
  const selection = window.getSelection();
  if (!selection || selection.rangeCount === 0) return;

  const range = selection.getRangeAt(0);
  let element: Node | null = range.commonAncestorContainer;

  // Find the closest block element
  while (element && element.nodeType !== Node.ELEMENT_NODE) {
    element = element.parentNode;
  }

  if (element && element.nodeType === Node.ELEMENT_NODE) {
    const blockElement = element as HTMLElement;

    // Remove existing alignment classes
    blockElement.style.textAlign = alignment === "left" ? "" : alignment;

    updateActiveFormats();
  }
};

const EditorInlineAlignment: React.FC<AlignmentProps> = ({
  activeFormats,
  updateActiveFormats,
  getButtonClass,
}) => {
  return (
    <div className="flex gap-1">
      <button
        onClick={() => applyAlignment("left", updateActiveFormats)}
        className={getButtonClass(activeFormats.alignLeft)}
        title="Align Left"
      >
        <AlignLeft size={18} />
      </button>
      <button
        onClick={() => applyAlignment("center", updateActiveFormats)}
        className={getButtonClass(activeFormats.alignCenter)}
        title="Align Center"
      >
        <AlignCenter size={18} />
      </button>
      <button
        onClick={() => applyAlignment("right", updateActiveFormats)}
        className={getButtonClass(activeFormats.alignRight)}
        title="Align Right"
      >
        <AlignRight size={18} />
      </button>
      <button
        onClick={() => applyAlignment("justify", updateActiveFormats)}
        className={getButtonClass(activeFormats.alignJustify)}
        title="Justify"
      >
        <AlignJustify size={18} />
      </button>
    </div>
  );
};

export default EditorInlineAlignment;

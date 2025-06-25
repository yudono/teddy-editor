import {
  Bold,
  Italic,
  Underline,
  Strikethrough,
  AlignLeft,
  AlignCenter,
  AlignRight,
  AlignJustify,
  ChevronDown,
} from "lucide-react";
import { useRef, useState, useEffect } from "react";

const Editor = () => {
  const editorRef = useRef<HTMLDivElement>(null);
  const [activeFormats, setActiveFormats] = useState({
    bold: false,
    italic: false,
    underline: false,
    strikethrough: false,
    alignLeft: false,
    alignCenter: false,
    alignRight: false,
    alignJustify: false,
  });
  const [currentTextFormat, setCurrentTextFormat] = useState("p");
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const textFormats = [
    { value: "p", label: "Paragraph", tag: "p" },
    { value: "h1", label: "Heading 1", tag: "h1" },
    { value: "h2", label: "Heading 2", tag: "h2" },
    { value: "h3", label: "Heading 3", tag: "h3" },
    { value: "h4", label: "Heading 4", tag: "h4" },
    { value: "h5", label: "Heading 5", tag: "h5" },
    { value: "h6", label: "Heading 6", tag: "h6" },
  ];

  const applyTextFormat = (tagName: string) => {
    const selection = window.getSelection();
    if (!selection || selection.rangeCount === 0) return;

    const range = selection.getRangeAt(0);
    let element = range.commonAncestorContainer;

    // If we're in a text node, get its parent
    if (element.nodeType === Node.TEXT_NODE) {
      element = element.parentNode as Node;
    }

    // Find the closest block element, but don't go beyond the editor
    let blockElement: HTMLElement | null = null;
    let current = element;

    while (current && current !== editorRef.current) {
      if (current.nodeType === Node.ELEMENT_NODE) {
        const el = current as HTMLElement;
        const tagName = el.tagName.toLowerCase();
        if (
          ["p", "h1", "h2", "h3", "h4", "h5", "h6", "div"].includes(tagName)
        ) {
          blockElement = el;
          break;
        }
      }
      current = current.parentNode as Node;
    }

    // If we found a valid block element and it's not the editor itself
    if (blockElement && blockElement !== editorRef.current) {
      // Create new element with the desired tag
      const newElement = document.createElement(tagName);
      newElement.innerHTML = blockElement.innerHTML;

      // Copy any existing styles (like text-align)
      if (blockElement.style.textAlign) {
        newElement.style.textAlign = blockElement.style.textAlign;
      }

      // Replace the old element
      blockElement.parentNode?.replaceChild(newElement, blockElement);

      // Update current format
      setCurrentTextFormat(tagName);
      setIsDropdownOpen(false);

      // Restore selection
      const newRange = document.createRange();
      newRange.selectNodeContents(newElement);
      selection.removeAllRanges();
      selection.addRange(newRange);
    } else {
      // No existing block element found, or we're at the editor level
      // Create a new element and insert it
      const newElement = document.createElement(tagName);

      if (range.toString()) {
        // There's selected text, wrap it
        try {
          range.surroundContents(newElement);
        } catch (e) {
          // If surroundContents fails, extract and insert
          const contents = range.extractContents();
          newElement.appendChild(contents);
          range.insertNode(newElement);
        }
      } else {
        // No selection, create empty element
        newElement.innerHTML = "<br>"; // Add line break for empty elements
        range.insertNode(newElement);

        // Place cursor inside the new element
        const newRange = document.createRange();
        newRange.setStart(newElement, 0);
        newRange.collapse(true);
        selection.removeAllRanges();
        selection.addRange(newRange);
      }

      // Update current format
      setCurrentTextFormat(tagName);
      setIsDropdownOpen(false);
    }

    // Update active formats after a short delay
    setTimeout(() => updateActiveFormats(), 10);
  };

  const applyInlineFormat = (tagName: string) => {
    const selection = window.getSelection();
    if (!selection || selection.rangeCount === 0) return;

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
        const textNode = document.createTextNode(
          formatElement.textContent || ""
        );

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

  const applyAlignment = (
    alignment: "left" | "center" | "right" | "justify"
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

  const updateActiveFormats = () => {
    const selection = window.getSelection();
    if (!selection || selection.rangeCount === 0) {
      setActiveFormats({
        bold: false,
        italic: false,
        underline: false,
        strikethrough: false,
        alignLeft: true, // Default to left align
        alignCenter: false,
        alignRight: false,
        alignJustify: false,
      });
      setCurrentTextFormat("p");
      return;
    }

    const range = selection.getRangeAt(0);
    let element = range.commonAncestorContainer;

    // If we're in a text node, get its parent
    if (element.nodeType === Node.TEXT_NODE) {
      element = element.parentNode as Node;
    }

    // Check for inline formatting
    const hasFormat = (tagName: string) => {
      let current: Node | null = element;
      while (current && current !== editorRef.current) {
        if (current.nodeType === Node.ELEMENT_NODE) {
          const el = current as HTMLElement;
          if (el.tagName.toLowerCase() === tagName.toLowerCase()) {
            return true;
          }
        }
        current = current.parentNode;
      }
      return false;
    };

    // Check for text format (block elements)
    let blockElement: Node | null = element;
    while (blockElement && blockElement !== editorRef.current) {
      if (blockElement.nodeType === Node.ELEMENT_NODE) {
        const tagName = (blockElement as HTMLElement).tagName.toLowerCase();
        if (["h1", "h2", "h3", "h4", "h5", "h6", "p"].includes(tagName)) {
          setCurrentTextFormat(tagName);
          break;
        }
      }
      blockElement = blockElement.parentNode;
    }

    // If no block element found, default to paragraph
    if (blockElement === editorRef.current || !blockElement) {
      setCurrentTextFormat("p");
    }

    // Check for alignment
    let alignElement: Node | null = element;
    while (
      alignElement &&
      alignElement !== editorRef.current &&
      alignElement.nodeType !== Node.ELEMENT_NODE
    ) {
      alignElement = alignElement.parentNode;
    }

    const textAlign =
      alignElement && alignElement.nodeType === Node.ELEMENT_NODE
        ? (alignElement as HTMLElement).style.textAlign
        : "";

    setActiveFormats({
      bold: hasFormat("strong") || hasFormat("b"),
      italic: hasFormat("em") || hasFormat("i"),
      underline: hasFormat("u"),
      strikethrough: hasFormat("s") || hasFormat("strike") || hasFormat("del"),
      alignLeft: textAlign === "" || textAlign === "left",
      alignCenter: textAlign === "center",
      alignRight: textAlign === "right",
      alignJustify: textAlign === "justify",
    });
  };

  const handleSelectionChange = () => {
    const selection = window.getSelection();
    if (selection && selection.rangeCount > 0) {
      const range = selection.getRangeAt(0);
      if (editorRef.current?.contains(range.commonAncestorContainer)) {
        updateActiveFormats();
      }
    }
  };

  useEffect(() => {
    document.addEventListener("selectionchange", handleSelectionChange);
    return () => {
      document.removeEventListener("selectionchange", handleSelectionChange);
    };
  }, []);

  const getButtonClass = (isActive: boolean) => {
    return `p-2 rounded transition-colors ${
      isActive
        ? "bg-blue-500 text-white hover:bg-blue-600"
        : "hover:bg-gray-200"
    }`;
  };

  const Divider = () => <div className="w-px h-6 bg-gray-300 mx-1" />;

  return (
    <div className="w-full max-w-4xl mx-auto p-4">
      {/* Toolbar */}
      <div className="flex items-center gap-1 p-2 border border-gray-300 rounded-t-lg bg-gray-50">
        {/* Text Format Dropdown */}
        <div className="relative">
          <button
            onClick={() => setIsDropdownOpen(!isDropdownOpen)}
            className="flex items-center gap-2 px-3 py-2 border border-gray-300 rounded hover:bg-gray-100 min-w-[120px] justify-between"
          >
            <span className="text-sm">
              {textFormats.find((f) => f.value === currentTextFormat)?.label ||
                "Paragraph"}
            </span>
            <ChevronDown size={14} />
          </button>

          {isDropdownOpen && (
            <div className="absolute top-full left-0 mt-1 bg-white border border-gray-300 rounded shadow-lg z-10 min-w-[120px]">
              {textFormats.map((format) => (
                <button
                  key={format.value}
                  onClick={() => applyTextFormat(format.tag)}
                  className={`w-full text-left px-3 py-2 text-sm hover:bg-gray-100 ${
                    currentTextFormat === format.value
                      ? "bg-blue-50 text-blue-600"
                      : ""
                  }`}
                >
                  {format.label}
                </button>
              ))}
            </div>
          )}
        </div>

        <Divider />

        {/* Font Style Group */}
        <div className="flex gap-1">
          <button
            onClick={() => applyInlineFormat("strong")}
            className={getButtonClass(activeFormats.bold)}
            title="Bold"
          >
            <Bold size={18} />
          </button>
          <button
            onClick={() => applyInlineFormat("em")}
            className={getButtonClass(activeFormats.italic)}
            title="Italic"
          >
            <Italic size={18} />
          </button>
          <button
            onClick={() => applyInlineFormat("u")}
            className={getButtonClass(activeFormats.underline)}
            title="Underline"
          >
            <Underline size={18} />
          </button>
          <button
            onClick={() => applyInlineFormat("s")}
            className={getButtonClass(activeFormats.strikethrough)}
            title="Strikethrough"
          >
            <Strikethrough size={18} />
          </button>
        </div>

        <Divider />

        {/* Alignment Group */}
        <div className="flex gap-1">
          <button
            onClick={() => applyAlignment("left")}
            className={getButtonClass(activeFormats.alignLeft)}
            title="Align Left"
          >
            <AlignLeft size={18} />
          </button>
          <button
            onClick={() => applyAlignment("center")}
            className={getButtonClass(activeFormats.alignCenter)}
            title="Align Center"
          >
            <AlignCenter size={18} />
          </button>
          <button
            onClick={() => applyAlignment("right")}
            className={getButtonClass(activeFormats.alignRight)}
            title="Align Right"
          >
            <AlignRight size={18} />
          </button>
          <button
            onClick={() => applyAlignment("justify")}
            className={getButtonClass(activeFormats.alignJustify)}
            title="Justify"
          >
            <AlignJustify size={18} />
          </button>
        </div>
      </div>

      {/* Editor */}
      <div
        ref={editorRef}
        contentEditable
        className="min-h-[300px] p-4 border border-gray-300 border-t-0 rounded-b-lg focus:outline-none focus:ring-2 focus:ring-blue-500 prose prose-headings:mt-0 prose-headings:mb-2"
        style={{
          whiteSpace: "pre-wrap",
        }}
        onMouseUp={updateActiveFormats}
        onKeyUp={updateActiveFormats}
        onClick={() => setIsDropdownOpen(false)}
      />
    </div>
  );
};

export default Editor;

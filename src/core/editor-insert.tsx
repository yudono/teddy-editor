import { Link, Image, Video, X } from "lucide-react";
import { useState, useRef, useEffect } from "react";

// Store the selection globally to preserve it across popup interactions
let savedSelection: Range | null = null;

const saveSelection = () => {
  const selection = window.getSelection();
  if (selection && selection.rangeCount > 0) {
    savedSelection = selection.getRangeAt(0).cloneRange();
  }
};

const restoreSelection = () => {
  if (savedSelection) {
    const selection = window.getSelection();
    selection?.removeAllRanges();
    selection?.addRange(savedSelection);
  }
};

// Helper function to detect selected element data
const getSelectedElementData = () => {
  const selection = window.getSelection();
  if (!selection || selection.rangeCount === 0) return null;

  const range = selection.getRangeAt(0);
  let element = range.commonAncestorContainer;

  // If we're in a text node, get its parent
  if (element.nodeType === Node.TEXT_NODE) {
    element = element.parentNode as Node;
  }

  // Check if the element or its parent is a link, image, or video
  let current = element;
  while (current && current !== document.body) {
    if (current.nodeType === Node.ELEMENT_NODE) {
      const el = current as HTMLElement;
      const tagName = el.tagName.toLowerCase();

      if (tagName === "a") {
        return {
          type: "link",
          url: el.getAttribute("href") || "",
          text: el.textContent || "",
        };
      }

      if (tagName === "img") {
        return {
          type: "image",
          src: el.getAttribute("src") || "",
          alt: el.getAttribute("alt") || "",
        };
      }

      if (tagName === "iframe") {
        return {
          type: "video",
          src: el.getAttribute("src") || "",
        };
      }
    }
    current = current.parentNode as Node;
  }

  return null;
};

export const insertLink = (url: string, text: string) => {
  // Restore the saved selection first
  restoreSelection();

  const selection = window.getSelection();
  if (!selection || selection.rangeCount === 0) {
    // If no selection, insert at the end of the editor
    const editor = document.querySelector(
      '[contenteditable="true"]'
    ) as HTMLElement;
    if (editor) {
      const link = document.createElement("a");
      link.href = url;
      link.textContent = text || url;
      link.target = "_blank";
      link.rel = "noopener noreferrer";
      link.className = "text-blue-600 underline hover:text-blue-800";

      editor.appendChild(link);

      // Add a space after the link
      const space = document.createTextNode(" ");
      editor.appendChild(space);

      // Set cursor after the link
      const range = document.createRange();
      range.setStartAfter(space);
      range.collapse(true);
      if (selection) {
        selection.removeAllRanges();
        selection.addRange(range);
      }
    }
    return;
  }

  const range = selection.getRangeAt(0);

  // Check if we're editing an existing link
  let linkElement = null;
  let current = range.commonAncestorContainer;

  // Find existing link element
  while (current && current !== document.body) {
    if (
      current.nodeType === Node.ELEMENT_NODE &&
      (current as HTMLElement).tagName.toLowerCase() === "a"
    ) {
      linkElement = current as HTMLElement;
      break;
    }
    current = current.parentNode as Node;
  }

  if (linkElement) {
    // Update existing link
    linkElement.setAttribute("href", url);
    linkElement.textContent = text || url;
  } else {
    // Create new link
    const link = document.createElement("a");
    link.href = url;
    link.textContent = text || url;
    link.target = "_blank";
    link.rel = "noopener noreferrer";
    link.className = "text-blue-600 underline hover:text-blue-800";

    range.deleteContents();
    range.insertNode(link);

    // Set cursor after the link
    const newRange = document.createRange();
    newRange.setStartAfter(link);
    newRange.collapse(true);
    selection.removeAllRanges();
    selection.addRange(newRange);
  }

  // Clear saved selection
  savedSelection = null;
};

export const insertImage = (base64: string, alt: string = "Inserted image") => {
  // Restore the saved selection first
  restoreSelection();

  const selection = window.getSelection();
  if (!selection || selection.rangeCount === 0) {
    // If no selection, insert at the end of the editor
    const editor = document.querySelector(
      '[contenteditable="true"]'
    ) as HTMLElement;
    if (editor) {
      const img = document.createElement("img");
      img.src = base64;
      img.alt = alt;
      img.className = "max-w-full h-auto rounded shadow-sm";

      editor.appendChild(img);

      // Add a line break after the image
      const br = document.createElement("br");
      editor.appendChild(br);

      // Set cursor after the image
      const range = document.createRange();
      range.setStartAfter(br);
      range.collapse(true);
      if (selection) {
        selection.removeAllRanges();
        selection.addRange(range);
      }
    }
    return;
  }

  const range = selection.getRangeAt(0);

  // Check if we're editing an existing image
  let imgElement = null;
  let current = range.commonAncestorContainer;

  // Find existing image element
  while (current && current !== document.body) {
    if (
      current.nodeType === Node.ELEMENT_NODE &&
      (current as HTMLElement).tagName.toLowerCase() === "img"
    ) {
      imgElement = current as HTMLElement;
      break;
    }
    current = current.parentNode as Node;
  }

  if (imgElement) {
    // Update existing image
    imgElement.setAttribute("src", base64);
    imgElement.setAttribute("alt", alt);
  } else {
    // Create new image
    const img = document.createElement("img");
    img.src = base64;
    img.alt = alt;
    img.className = "max-w-full h-auto rounded shadow-sm";

    range.deleteContents();
    range.insertNode(img);

    // Set cursor after the image
    const newRange = document.createRange();
    newRange.setStartAfter(img);
    newRange.collapse(true);
    selection.removeAllRanges();
    selection.addRange(newRange);
  }

  // Clear saved selection
  savedSelection = null;
};

export const insertVideo = (embedUrl: string) => {
  // Restore the saved selection first
  restoreSelection();

  const selection = window.getSelection();
  if (!selection || selection.rangeCount === 0) {
    // If no selection, insert at the end of the editor
    const editor = document.querySelector(
      '[contenteditable="true"]'
    ) as HTMLElement;
    if (editor) {
      const iframe = document.createElement("iframe");
      iframe.src = embedUrl;
      iframe.width = "560";
      iframe.height = "315";
      iframe.className = "max-w-full rounded shadow-sm";
      iframe.setAttribute("frameborder", "0");
      iframe.setAttribute("allowfullscreen", "true");

      editor.appendChild(iframe);

      // Add a line break after the video
      const br = document.createElement("br");
      editor.appendChild(br);

      // Set cursor after the video
      const range = document.createRange();
      range.setStartAfter(br);
      range.collapse(true);
      if (selection) {
        selection.removeAllRanges();
        selection.addRange(range);
      }
    }
    return;
  }

  const range = selection.getRangeAt(0);

  // Check if we're editing an existing video
  let iframeElement = null;
  let current = range.commonAncestorContainer;

  // Find existing iframe element
  while (current && current !== document.body) {
    if (
      current.nodeType === Node.ELEMENT_NODE &&
      (current as HTMLElement).tagName.toLowerCase() === "iframe"
    ) {
      iframeElement = current as HTMLElement;
      break;
    }
    current = current.parentNode as Node;
  }

  if (iframeElement) {
    // Update existing video
    iframeElement.setAttribute("src", embedUrl);
  } else {
    // Create new video
    const iframe = document.createElement("iframe");
    iframe.src = embedUrl;
    iframe.width = "560";
    iframe.height = "315";
    iframe.className = "max-w-full rounded shadow-sm";
    iframe.setAttribute("frameborder", "0");
    iframe.setAttribute("allowfullscreen", "true");

    range.deleteContents();
    range.insertNode(iframe);

    // Set cursor after the video
    const newRange = document.createRange();
    newRange.setStartAfter(iframe);
    newRange.collapse(true);
    selection.removeAllRanges();
    selection.addRange(newRange);
  }

  // Clear saved selection
  savedSelection = null;
};

const LinkPopup = ({
  isOpen,
  onClose,
  onInsert,
  initialData,
}: {
  isOpen: boolean;
  onClose: () => void;
  onInsert: (url: string, text: string) => void;
  initialData?: { url: string; text: string } | null;
}) => {
  const [url, setUrl] = useState("");
  const [text, setText] = useState("");

  // Populate fields when popup opens with existing data
  useEffect(() => {
    if (isOpen && initialData) {
      setUrl(initialData.url);
      setText(initialData.text);
    } else if (isOpen && !initialData) {
      setUrl("");
      setText("");
    }
  }, [isOpen, initialData]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (url.trim()) {
      onInsert(url.trim(), text.trim());
      setUrl("");
      setText("");
      onClose();
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 w-96 max-w-full mx-4">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-semibold">
            {initialData ? "Edit Link" : "Insert Link"}
          </h3>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700"
          >
            <X size={20} />
          </button>
        </div>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              URL
            </label>
            <input
              type="url"
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="https://example.com"
              required
              autoFocus
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Link Text (optional)
            </label>
            <input
              type="text"
              value={text}
              onChange={(e) => setText(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Link text"
            />
          </div>
          <div className="flex gap-2 justify-end">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-gray-600 border border-gray-300 rounded-md hover:bg-gray-50"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
            >
              {initialData ? "Update Link" : "Insert Link"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

const ImagePopup = ({
  isOpen,
  onClose,
  onInsert,
  initialData,
}: {
  isOpen: boolean;
  onClose: () => void;
  onInsert: (base64: string, alt: string) => void;
  initialData?: { src: string; alt: string } | null;
}) => {
  const [alt, setAlt] = useState("");
  const [currentSrc, setCurrentSrc] = useState("");
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Populate fields when popup opens with existing data
  useEffect(() => {
    if (isOpen && initialData) {
      setAlt(initialData.alt);
      setCurrentSrc(initialData.src);
    } else if (isOpen && !initialData) {
      setAlt("");
      setCurrentSrc("");
    }
  }, [isOpen, initialData]);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        const base64 = event.target?.result as string;
        onInsert(base64, alt || file.name);
        setAlt("");
        setCurrentSrc("");
        onClose();
        // Reset file input
        if (fileInputRef.current) {
          fileInputRef.current.value = "";
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const handleUpdateAlt = () => {
    if (initialData && currentSrc) {
      onInsert(currentSrc, alt);
      setAlt("");
      setCurrentSrc("");
      onClose();
    }
  };

  const handleReplaceImage = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 w-96 max-w-full mx-4">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-semibold">
            {initialData ? "Edit Image" : "Insert Image"}
          </h3>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700"
          >
            <X size={20} />
          </button>
        </div>

        {initialData && (
          <div className="mb-4">
            <img
              src={currentSrc}
              alt={alt}
              className="max-w-full h-32 object-contain rounded border"
            />
            <button
              type="button"
              onClick={handleReplaceImage}
              className="mt-2 px-3 py-1 text-sm bg-gray-100 text-gray-700 rounded hover:bg-gray-200"
            >
              Replace Image
            </button>
          </div>
        )}

        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          onChange={handleFileChange}
          className="hidden"
        />

        {!initialData && (
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Select Image File
            </label>
            <input
              type="file"
              accept="image/*"
              onChange={handleFileChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
        )}

        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Alt Text (optional)
          </label>
          <input
            type="text"
            value={alt}
            onChange={(e) => setAlt(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Image description"
            autoFocus={!!initialData}
          />
        </div>

        <div className="flex gap-2 justify-end">
          <button
            onClick={onClose}
            className="px-4 py-2 text-gray-600 border border-gray-300 rounded-md hover:bg-gray-50"
          >
            Cancel
          </button>
          {initialData && (
            <button
              onClick={handleUpdateAlt}
              className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
            >
              Update Image
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

const VideoPopup = ({
  isOpen,
  onClose,
  onInsert,
  initialData,
}: {
  isOpen: boolean;
  onClose: () => void;
  onInsert: (embedUrl: string) => void;
  initialData?: { src: string } | null;
}) => {
  const [url, setUrl] = useState("");

  // Populate fields when popup opens with existing data
  useEffect(() => {
    if (isOpen && initialData) {
      setUrl(initialData.src);
    } else if (isOpen && !initialData) {
      setUrl("");
    }
  }, [isOpen, initialData]);

  const convertToEmbedUrl = (inputUrl: string): string => {
    // YouTube conversion
    const youtubeMatch = inputUrl.match(
      /(?:youtube\.com\/watch\?v=|youtu\.be\/|youtube\.com\/embed\/)([\w-]+)/
    );
    if (youtubeMatch) {
      return `https://www.youtube.com/embed/${youtubeMatch[1]}`;
    }

    // Vimeo conversion
    const vimeoMatch = inputUrl.match(/vimeo\.com\/(?:video\/)?(\d+)/);
    if (vimeoMatch) {
      return `https://player.vimeo.com/video/${vimeoMatch[1]}`;
    }

    // Return as-is if already an embed URL or unknown format
    return inputUrl;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (url.trim()) {
      const embedUrl = convertToEmbedUrl(url.trim());
      onInsert(embedUrl);
      setUrl("");
      onClose();
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 w-96 max-w-full mx-4">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-semibold">
            {initialData ? "Edit Video" : "Insert Video"}
          </h3>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700"
          >
            <X size={20} />
          </button>
        </div>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Video URL
            </label>
            <input
              type="url"
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="YouTube, Vimeo, or embed URL"
              required
              autoFocus
            />
            <p className="text-sm text-gray-500 mt-1">
              Supports YouTube, Vimeo, and direct embed URLs
            </p>
          </div>
          <div className="flex gap-2 justify-end">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-gray-600 border border-gray-300 rounded-md hover:bg-gray-50"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
            >
              {initialData ? "Update Video" : "Insert Video"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

const EditorInsert: React.FC = () => {
  const [linkPopupOpen, setLinkPopupOpen] = useState(false);
  const [imagePopupOpen, setImagePopupOpen] = useState(false);
  const [videoPopupOpen, setVideoPopupOpen] = useState(false);
  const [selectedElementData, setSelectedElementData] = useState<any>(null);

  const handleLinkClick = () => {
    saveSelection();
    const elementData = getSelectedElementData();
    setSelectedElementData(elementData?.type === "link" ? elementData : null);
    setLinkPopupOpen(true);
  };

  const handleImageClick = () => {
    saveSelection();
    const elementData = getSelectedElementData();
    setSelectedElementData(elementData?.type === "image" ? elementData : null);
    setImagePopupOpen(true);
  };

  const handleVideoClick = () => {
    saveSelection();
    const elementData = getSelectedElementData();
    setSelectedElementData(elementData?.type === "video" ? elementData : null);
    setVideoPopupOpen(true);
  };

  return (
    <>
      <div className="flex gap-1">
        <button
          onClick={handleLinkClick}
          className="p-2 rounded transition-colors hover:bg-gray-200"
          title="Insert Link"
        >
          <Link size={18} />
        </button>
        <button
          onClick={handleImageClick}
          className="p-2 rounded transition-colors hover:bg-gray-200"
          title="Insert Image"
        >
          <Image size={18} />
        </button>
        <button
          onClick={handleVideoClick}
          className="p-2 rounded transition-colors hover:bg-gray-200"
          title="Insert Video"
        >
          <Video size={18} />
        </button>
      </div>

      <LinkPopup
        isOpen={linkPopupOpen}
        onClose={() => {
          setLinkPopupOpen(false);
          setSelectedElementData(null);
        }}
        onInsert={insertLink}
        initialData={
          selectedElementData?.type === "link"
            ? {
                url: selectedElementData.url,
                text: selectedElementData.text,
              }
            : null
        }
      />

      <ImagePopup
        isOpen={imagePopupOpen}
        onClose={() => {
          setImagePopupOpen(false);
          setSelectedElementData(null);
        }}
        onInsert={insertImage}
        initialData={
          selectedElementData?.type === "image"
            ? {
                src: selectedElementData.src,
                alt: selectedElementData.alt,
              }
            : null
        }
      />

      <VideoPopup
        isOpen={videoPopupOpen}
        onClose={() => {
          setVideoPopupOpen(false);
          setSelectedElementData(null);
        }}
        onInsert={insertVideo}
        initialData={
          selectedElementData?.type === "video"
            ? {
                src: selectedElementData.src,
              }
            : null
        }
      />
    </>
  );
};

export default EditorInsert;

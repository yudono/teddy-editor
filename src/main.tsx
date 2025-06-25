import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import TeddyEditor from "./TeddyEditor.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <TeddyEditor />
  </StrictMode>
);

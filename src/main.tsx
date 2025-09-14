import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { QueryClientProvider } from "@tanstack/react-query";
import { queryClient } from "./lib/utils.ts";
import { UsersProvider } from "./Context/UsersContext.tsx";
import App from "./App.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <UsersProvider>
        <App />
      </UsersProvider>
    </QueryClientProvider>
  </StrictMode>
);

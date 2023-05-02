import React from "react";
import ReactDOM from "react-dom/client";
import { App } from "./App.tsx";
import { Routes, Route, BrowserRouter } from "react-router-dom";
import { PageHook } from "./pages/PageHook.tsx";
import { UserPage } from "./pages/UserPage.tsx";
import { AppLayout } from "./layouts/AppLayout.tsx";
import { CssBaseline } from "@mui/material";
import { route, routes } from "./routes/index";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <CssBaseline />
    <BrowserRouter>
      <Routes>
        <Route element={<AppLayout />}>
          <Route path={route(routes.root)} element={<App />} />
          <Route path={route(routes.pageHook)} element={<PageHook />} />
          <Route path={route(routes.userById, ["id"])} element={<UserPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);

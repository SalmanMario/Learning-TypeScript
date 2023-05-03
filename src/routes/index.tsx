import { Route, Routes } from "react-router-dom";
import { AppLayout } from "../layouts/AppLayout";
import { PageHook } from "../pages/PageHook";
import { UserPage } from "../pages/UserPage";
import { TestPage } from "../pages/TestPage";
import { route, routes } from "../routes/index";
import { MainPage } from "../pages/MainPage";

export function RoutesPages() {
  return (
    <Routes>
      <Route element={<AppLayout />}>
        <Route path={route(routes.root)} element={<MainPage />} />
        <Route path={route(routes.pageHook)} element={<PageHook />} />
        <Route path={route(routes.userById, ["id", "name"])} element={<UserPage />} />
        <Route path={route(routes.testPage, ["id"])} element={<TestPage />} />
      </Route>
    </Routes>
  );
}

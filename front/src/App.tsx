import { Route, Routes } from "react-router";
import { Home } from "@/pages/Home";
import { AppLayout } from "@/components/app-layout";

export function App() {
  return (
    <Routes>
      <Route element={<AppLayout />}>
        <Route path="/" element={<Home />} />
        <Route path="/processos/:id" element={"daf"} />
      </Route>
    </Routes>
  );
}

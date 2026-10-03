import { Route, Routes } from "react-router";
import { Home } from "@/pages/Home";
import { AppLayout } from "@/components/app-layout";
import { DetailsSteps } from "@/pages/DetailsSteps";

export function App() {
  return (
    <Routes>
      <Route element={<AppLayout />}>
        <Route path="/" element={<Home />} />
        <Route path="/processos/:id" element={<DetailsSteps />} />
      </Route>
    </Routes>
  );
}

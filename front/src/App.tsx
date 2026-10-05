import { AppLayout } from "@/components/app-layout";
import { DetailsSteps } from "@/pages/DetailsSteps";
import { Home } from "@/pages/Home";
import { Route, Routes } from "react-router";

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

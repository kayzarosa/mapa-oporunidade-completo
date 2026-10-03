import { Outlet } from "react-router";
import Logo from "@/assets/logo.svg";

export function AppLayout() {
  return (
    <div className="min-h-screen bg-surface-2">
      <header className="border-b border-line bg-surface">
        <div className="mx-auto flex max-w-5xl items-center gap-2 px-5 py-3">
          <img src={Logo} alt="" className="size-8" />
          <span className="text-[18px] font-semibold">
            Mapa de Oportunidades
          </span>
        </div>
      </header>

      <main className="mx-auto max-w-5xl px-5 pt-10 pb-16">
        <Outlet />
      </main>
    </div>
  );
}

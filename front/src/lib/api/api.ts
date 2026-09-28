const BASE_URL = import.meta.env.VITE_BACKEND_URL;

export async function api<T>(path: string, init?: RequestInit): Promise<T> {
  const response = await fetch(`${BASE_URL}${path}`, {
    headers: { "Content-Type": "application/json" },
    ...init,
  });

  if (!response.ok) {
    throw new Error("Não foi possível completar a ação");
  }

  return response.json();
}

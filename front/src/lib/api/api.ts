const BASE_URL = import.meta.env.VITE_BACKEND_URL;

export async function api<T>(path: string, init?: RequestInit): Promise<T> {
  const response = await fetch(`${BASE_URL}${path}`, {
    headers: init?.body ? { "Content-Type": "application/json" } : undefined,
    ...init,
  });

  if (!response.ok) {
    throw new Error("Não foi possível completar a ação");
  }

  if (response.status === 204) return undefined as T;

  return response.json();
}

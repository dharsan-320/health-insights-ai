import axios from "axios";

/**
 * Axios instance for the future FastAPI backend.
 * Endpoints are placeholders — swap the baseURL and wire real handlers later.
 */
export const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL ?? "/api",
  headers: { "Content-Type": "application/json" },
});

api.interceptors.request.use((config) => {
  const token = typeof window !== "undefined" ? window.localStorage.getItem("ms_token") : null;
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

// --- Placeholder service methods (not implemented) ------------------------

export const authService = {
  register: (_data: { name: string; email: string; password: string }) =>
    Promise.resolve({ ok: true }),
  login: (_data: { email: string; password: string }) => Promise.resolve({ ok: true, token: "" }),
  forgotPassword: (_data: { email: string }) => Promise.resolve({ ok: true }),
  resetPassword: (_data: { token: string; password: string }) => Promise.resolve({ ok: true }),
};

export const profileService = {
  getProfile: () => Promise.resolve(null),
  updateProfile: (_data: unknown) => Promise.resolve({ ok: true }),
};

export const reportService = {
  upload: (_file: File) => Promise.resolve({ id: "pending" }),
  list: () => Promise.resolve([]),
  analysis: (_id: string) => Promise.resolve(null),
};

export const chatService = {
  send: (_message: string) =>
    Promise.resolve({
      reply:
        "This is a mock reply. Connect the FastAPI /chat endpoint to get real AI responses.",
    }),
};

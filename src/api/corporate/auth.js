import api from "../../lib/axios";

export const login = (credentials) =>
  api.post("/api/v1/corporate/login", credentials);

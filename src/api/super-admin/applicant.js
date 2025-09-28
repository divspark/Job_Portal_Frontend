import api from "../../lib/axios";

export const getAllApplicants = async ({ signal, ...params } = {}) => {
  const response = await api.get("/api/v1/admin/applicants", {
    signal,
    params,
  });
  return response.data;
};

export const getApplicantById = async ({ signal, id } = {}) => {
  const response = await api.get(`/api/v1/admin/applicants/${id}`, { signal });
  return response.data;
};

export const createApplicant = async (data) => {
  const response = await api.post("/api/v1/admin/applicants", data);
  return response.data;
};

export const updateApplicant = async ({ id, data }) => {
  const response = await api.put(`/api/v1/admin/applicants/${id}`, data);
  return response.data;
};

export const deleteApplicant = async (id) => {
  const response = await api.delete(`/api/v1/admin/applicants/${id}`);
  return response.data;
};

import api from "@/lib/axios";

export const getApplicantsById = async ({ id, signal }) => {
  const response = await api.get(`/corporate/jobseeker/${id}`, { signal });
  return response.data;
};

export const updateStatusOfApplicant = async ({ applicationId, data }) => {
  const response = await api.patch(
    `/corporate/applications/${applicationId}/status`,
    data
  );
  return response.data;
};

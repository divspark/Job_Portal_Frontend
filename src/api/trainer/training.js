import api from "@/lib/axios";

export const getAllTrainings = async ({}) => {
  const response = await api.get("/trainer/trainings");
  return response.data;
};

export const getTrainingbtId = async ({ id }) => {
  const response = await api.get(`/trainer/trainings/${id}`);
  return response.data;
};

export const applyForTraining = async (data) => {
  const response = await api.post(`/applications/trainings/apply`, data);
  return response.data;
};

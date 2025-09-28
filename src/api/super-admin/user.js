import api from "../../lib/axios";

export const getUserDetails = ({ signal }) =>
  api.get("/api/v1/superAdmin/profile", { signal });

export const updateBasicInfo = (data) =>
  api.put("/api/v1/superAdmin/profile/basic-info", data);

export const updateQualificationInfo = (data) =>
  api.put("/api/v1/superAdmin/profile/qualification-info", data);

export const getJobseekersList = (params = {}) =>
  api.get("/api/v1/admin/jobseekers/list", { params });

export const getCandidateDetails = async (jobseekerId, { signal } = {}) => {
  const response = await api.get(`/api/v1/admin/jobseekers/${jobseekerId}`, {
    signal,
  });
  return response.data;
};

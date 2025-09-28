import api from "../../lib/axios";

export const reviewApproval = (approvalId, data) =>
  api.patch(`/api/v1/admin/approvals/${approvalId}/review`, data);

export const getApprovalsList = (type, params = {}) =>
  api.get(`/api/v1/admin/approvals/list`, { params: { type, ...params } });

export const getApprovalDetails = (approvalId) =>
  api.get(`/api/v1/admin/approvals/${approvalId}`);

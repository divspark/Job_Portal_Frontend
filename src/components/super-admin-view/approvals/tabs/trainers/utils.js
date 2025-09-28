export const trainersFilters = [
  {
    label: "Status",
    componentType: "select",
    placeholder: "Select Status",
    name: "status",
    options: [
      { id: "approved", label: "Approved" },
      { id: "pending", label: "Pending" },
      { id: "rejected", label: "Rejected" },
    ],
  },
  {
    label: "Date From",
    componentType: "calendar",
    placeholder: "Select From Date",
    name: "dateFrom",
  },
  {
    label: "Date To",
    componentType: "calendar",
    placeholder: "Select To Date",
    name: "dateTo",
  },
  {
    label: "Sort By",
    componentType: "select",
    placeholder: "Select Sort By",
    name: "sortBy",
    options: [
      { id: "submittedAt", label: "Submitted At" },
      { id: "createdAt", label: "Created At" },
      { id: "updatedAt", label: "Updated At" },
      { id: "name", label: "Name" },
      { id: "email", label: "Email" },
    ],
  },
  {
    label: "Sort Order",
    componentType: "select",
    placeholder: "Select Sort Order",
    name: "sortOrder",
    options: [
      { id: "asc", label: "Ascending" },
      { id: "desc", label: "Descending" },
    ],
  },
];

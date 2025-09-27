export const jobsApprovalFilters = [
  {
    name: "status",
    label: "Status",
    type: "multiselect",
    options: [
      { value: "pending", label: "Pending" },
      { value: "approved", label: "Approved" },
      { value: "rejected", label: "Rejected" },
      { value: "on_hold", label: "On Hold" },
    ],
  },
  {
    name: "location",
    label: "Location",
    type: "multiselect",
    options: [
      { value: "remote", label: "Remote" },
      { value: "hybrid", label: "Hybrid" },
      { value: "onsite", label: "Onsite" },
    ],
  },
  {
    name: "industry",
    label: "Industry",
    type: "multiselect",
    options: [
      { value: "technology", label: "Technology" },
      { value: "finance", label: "Finance" },
      { value: "healthcare", label: "Healthcare" },
      { value: "education", label: "Education" },
      { value: "manufacturing", label: "Manufacturing" },
    ],
  },
  {
    name: "experience",
    label: "Experience Level",
    type: "multiselect",
    options: [
      { value: "entry", label: "Entry Level" },
      { value: "mid", label: "Mid Level" },
      { value: "senior", label: "Senior Level" },
      { value: "executive", label: "Executive" },
    ],
  },
  {
    name: "postedDate",
    label: "Posted Date",
    type: "daterange",
  },
];

export const trainingsApprovalFilters = [
  {
    name: "status",
    label: "Status",
    type: "multiselect",
    options: [
      { value: "pending", label: "Pending" },
      { value: "approved", label: "Approved" },
      { value: "rejected", label: "Rejected" },
      { value: "on_hold", label: "On Hold" },
    ],
  },
  {
    name: "category",
    label: "Category",
    type: "multiselect",
    options: [
      { value: "technical", label: "Technical" },
      { value: "soft_skills", label: "Soft Skills" },
      { value: "leadership", label: "Leadership" },
      { value: "certification", label: "Certification" },
    ],
  },
  {
    name: "duration",
    label: "Duration",
    type: "multiselect",
    options: [
      { value: "short", label: "Short (< 1 week)" },
      { value: "medium", label: "Medium (1-4 weeks)" },
      { value: "long", label: "Long (> 4 weeks)" },
    ],
  },
  {
    name: "level",
    label: "Level",
    type: "multiselect",
    options: [
      { value: "beginner", label: "Beginner" },
      { value: "intermediate", label: "Intermediate" },
      { value: "advanced", label: "Advanced" },
    ],
  },
  {
    name: "postedDate",
    label: "Posted Date",
    type: "daterange",
  },
];

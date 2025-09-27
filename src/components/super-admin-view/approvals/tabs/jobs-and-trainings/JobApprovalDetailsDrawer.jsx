import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { LocationIcon } from "@/utils/icon";
import {
  ClockIcon,
  DollarSignIcon,
  CalendarIcon,
  FacebookIcon,
  TwitterIcon,
  LinkedinIcon,
  CheckCircle,
  XCircle,
  Clock,
  Building2,
} from "lucide-react";
import {
  useApprovals,
  useGetApprovalDetails,
} from "../../../../../hooks/superAdmin/useApprovals";

const JobApprovalDetailsDrawer = ({
  jobId: approvalId, // This is actually the approval ID
  areApprovalBtnsVisible = false,
}) => {
  const {
    isLoading: isLoadingApprovals,
    approveApplication,
    rejectApplication,
    holdApplication,
  } = useApprovals();
  const { data: jobData, isLoading, error } = useGetApprovalDetails(approvalId);

  const handleApprove = async () => {
    try {
      await approveApplication(approvalId);
      // Optionally refresh the job data or close the drawer
    } catch (error) {
      console.error("Failed to approve job:", error);
    }
  };

  const handleReject = async () => {
    try {
      await rejectApplication(approvalId);
      // Optionally refresh the job data or close the drawer
    } catch (error) {
      console.error("Failed to reject job:", error);
    }
  };

  const handleHold = async () => {
    try {
      await holdApplication(approvalId);
      // Optionally refresh the job data or close the drawer
    } catch (error) {
      console.error("Failed to hold job:", error);
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-full flex flex-col bg-white p-6">
        <div className="flex justify-center items-center h-64">
          <div className="text-lg text-gray-500">Loading job details...</div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-full flex flex-col bg-white p-6">
        <div className="flex justify-center items-center h-64">
          <div className="text-lg text-red-500">
            Error loading job details: {error.message}
          </div>
        </div>
      </div>
    );
  }

  if (!jobData?.data?.data) {
    return (
      <div className="min-h-full flex flex-col bg-white p-6">
        <div className="flex justify-center items-center h-64">
          <div className="text-lg text-gray-500">No job details found</div>
        </div>
      </div>
    );
  }

  const approvalData = jobData.data;
  const job = approvalData.data;
  const applicant = approvalData.applicant;

  // Mock data for testing when API data is not available
  const mockJob = {
    jobTitle: "Senior Software Engineer",
    jobType: "Full-time",
    workingHours: "9 AM - 6 PM",
    workingDays: "Monday to Friday",
    officeLocation: "Tech Park, Sector 5",
    city: "Bangalore",
    state: "Karnataka",
    pincode: "560001",
    modeOfWork: "Hybrid",
    experienceLevel: "3-5 years",
    genderPreference: "No Preference",
    minimumEducation: "Bachelor of Technology",
    englishLevel: "Fluent",
    preferredAgeRange: "25-35 years",
    jobDescription:
      "We are looking for a Senior Software Engineer with strong experience in JavaScript and React. The ideal candidate should have 3-5 years of experience in full-stack development and be comfortable working in a fast-paced environment.",
    twoWheelerMandatory: false,
    isWalkInInterview: false,
    requiredSkills: ["JavaScript", "React", "Node.js", "MongoDB"],
    createdAt: new Date().toISOString(),
    salary: "₹8,00,000 - ₹12,00,000",
    company: "TechCorp Solutions",
    companyLogo: null,
    responsibilities: [
      "Develop and maintain web applications using React and Node.js",
      "Collaborate with cross-functional teams to deliver high-quality software",
      "Write clean, maintainable, and efficient code",
      "Participate in code reviews and technical discussions",
    ],
    contactEmail: "hr@techcorp.com",
    skills: ["JavaScript", "React", "Node.js", "MongoDB", "Express", "Git"],
  };

  const mockApplicant = {
    name: "John Doe",
    email: "john.doe@email.com",
    type: "job",
    status: "active",
  };

  const mockApprovalData = {
    submittedAt: new Date().toISOString(),
    status: "pending",
  };

  // Use mock data if API data is not available
  const displayJob = job || mockJob;
  const displayApplicant = applicant || mockApplicant;
  const displayApprovalData = approvalData || mockApprovalData;
  console.log(displayApprovalData);

  return (
    <div className="min-h-full flex flex-col bg-white p-6">
      {/* Header */}
      <div className="flex justify-between gap-4 p-6 border-1 border-gray2 rounded-lg">
        {displayJob.companyLogo ? (
          <img
            src={displayJob.companyLogo}
            alt={displayJob.company || displayApplicant.name}
            className="h-10 w-10 rounded-md"
          />
        ) : (
          <img
            src="/google.png"
            alt="Company Logo"
            className="h-6 w-6 text-gray-400"
          />
        )}
        <div className="flex-1">
          <p>{displayJob?.company || "Google"}</p>
          <div className="flex items-center gap-4">
            <p className="text-xl font-medium">
              {displayJob.jobTitle || "Data Engineer"}
            </p>

            <Badge className="text-primary-purple bg-light-purple text-xs">
              {displayJob.applicationsCount || displayJob.candidates || 2}{" "}
              Applied
            </Badge>
          </div>
          <div className="text-gray1 flex items-center gap-6 mt-2">
            <div className="flex items-center gap-2">
              <LocationIcon className="h-4 w-4 text-gray1" />
              {displayJob.officeLocation || "Mumbai, India"}
            </div>

            <div className="flex items-center gap-2">
              <ClockIcon className="h-4 w-4 text-gray1" />
              {displayJob.jobType || "Full-time"}
            </div>

            <div className="flex items-center gap-2">
              {displayJob.salary || "$80K - $120K"}
            </div>
          </div>

          {displayJob.createdAt && (
            <div className="text-gray1 flex items-center gap-2 mt-2">
              <CalendarIcon className="h-4 w-4 text-gray1" />
              {new Date(displayJob.createdAt).toLocaleDateString()}
            </div>
          )}
        </div>
        {/* Show approval buttons only when status is pending */}
        {areApprovalBtnsVisible &&
        displayApprovalData?.data?.status === "pending" ? (
          <div className="flex flex-col gap-2">
            <Button
              variant={"purple"}
              onClick={handleApprove}
              disabled={isLoadingApprovals}
            >
              {isLoadingApprovals ? "Processing..." : "Approve Job"}
            </Button>
            <Button
              variant={"destructive"}
              onClick={handleReject}
              disabled={isLoadingApprovals}
            >
              {isLoadingApprovals ? "Processing..." : "Reject Job"}
            </Button>
            <Button
              variant={"black"}
              onClick={handleHold}
              disabled={isLoadingApprovals}
            >
              {isLoadingApprovals ? "Processing..." : "Hold Job"}
            </Button>
          </div>
        ) : (
          <Badge
            className={`${
              displayApprovalData?.data?.status === "approved"
                ? "bg-green-100 text-green-800 hover:bg-green-200"
                : "bg-red-100 text-red-800 hover:bg-red-200"
            } text-sm h-fit capitalize`}
          >
            {displayApprovalData?.data?.status}
          </Badge>
        )}
      </div>

      {/* Content */}
      <div className="p-6 border-1 border-gray2 rounded-lg mt-6">
        <div>
          <h3 className="text-lg font-semibold">About the job</h3>
          <div className="text-gray1 mt-4 space-y-2">
            {/* {displayJob.jobDescription && ( */}
            <>
              <h4 className="font-semibold">Job Description</h4>
              <p>
                {displayJob.jobDescription} Lorem ipsum dolor sit amet
                consectetur adipisicing elit. Amet distinctio similique
                voluptatum accusamus, eos aperiam rerum harum ab molestiae porro
                atque illo, sint numquam. Officiis, a quas molestias deserunt
                dicta impedit? Assumenda culpa cupiditate, autem facilis neque
                quisquam quis sed recusandae! Porro autem aliquid doloremque
                assumenda sequi quidem tenetur molestiae.
              </p>
            </>
            {/* )} */}

            {displayJob.responsibilities && (
              <>
                <h4 className="font-semibold">Key Responsibilities</h4>
                <ul className="list-disc list-inside">
                  {Array.isArray(displayJob.responsibilities) ? (
                    displayJob.responsibilities.map((resp, index) => (
                      <li key={index}>{resp}</li>
                    ))
                  ) : (
                    <li>{displayJob.responsibilities}</li>
                  )}
                </ul>
              </>
            )}

            {displayJob.requiredSkills && (
              <>
                <h4 className="font-semibold">Required Skills</h4>
                <ul className="list-disc list-inside">
                  {Array.isArray(displayJob.requiredSkills) ? (
                    displayJob.requiredSkills.map((skill, index) => (
                      <li key={index}>{skill}</li>
                    ))
                  ) : (
                    <li>{displayJob.requiredSkills}</li>
                  )}
                </ul>
              </>
            )}

            {displayJob.minimumEducation && (
              <>
                <h4 className="font-semibold">Education</h4>
                <p>{displayJob.minimumEducation}</p>
              </>
            )}

            {(displayJob.experienceLevel ||
              displayJob.officeLocation ||
              displayJob.salary ||
              displayJob.jobType ||
              displayJob.modeOfWork) && (
              <>
                <h4 className="font-semibold">Other Details</h4>
                <ul className="list-disc list-inside">
                  {displayJob.experienceLevel && (
                    <li>Experience: {displayJob.experienceLevel}</li>
                  )}
                  {displayJob.officeLocation && (
                    <li>
                      Location: {displayJob.officeLocation}, {displayJob.city},{" "}
                      {displayJob.state}
                    </li>
                  )}
                  {displayJob.salary && <li>Salary: {displayJob.salary}</li>}
                  {displayJob.jobType && (
                    <li>Job Type: {displayJob.jobType}</li>
                  )}
                  {displayJob.modeOfWork && (
                    <li>Mode of Work: {displayJob.modeOfWork}</li>
                  )}
                  {displayJob.workingHours && (
                    <li>Working Hours: {displayJob.workingHours}</li>
                  )}
                  {displayJob.workingDays && (
                    <li>Working Days: {displayJob.workingDays}</li>
                  )}
                  {displayJob.genderPreference && (
                    <li>Gender Preference: {displayJob.genderPreference}</li>
                  )}
                  {displayJob.preferredAgeRange && (
                    <li>Preferred Age Range: {displayJob.preferredAgeRange}</li>
                  )}
                  {displayJob.englishLevel && (
                    <li>English Level: {displayJob.englishLevel}</li>
                  )}
                  {displayJob.twoWheelerMandatory !== undefined && (
                    <li>
                      Two Wheeler Mandatory:{" "}
                      {displayJob.twoWheelerMandatory ? "Yes" : "No"}
                    </li>
                  )}
                  {displayJob.isWalkInInterview !== undefined && (
                    <li>
                      Walk-in Interview:{" "}
                      {displayJob.isWalkInInterview ? "Yes" : "No"}
                    </li>
                  )}
                </ul>
              </>
            )}

            {displayJob.contactEmail && (
              <p>
                For additional information, you can reach out to me at{" "}
                {displayJob.contactEmail}
              </p>
            )}

            {displayJob.skills && (
              <div className="flex items-center gap-2 mt-4">
                {Array.isArray(displayJob.skills) ? (
                  displayJob.skills.map((skill) => (
                    <span
                      key={skill}
                      className="inline-block px-2 py-1 text-xs font-medium border-1 rounded-full"
                    >
                      {skill}
                    </span>
                  ))
                ) : (
                  <span className="inline-block px-2 py-1 text-xs font-medium border-1 rounded-full">
                    {displayJob.skills}
                  </span>
                )}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Applicant Information */}
      {displayApplicant && (
        <div className="p-6 border-1 border-gray2 rounded-lg mt-6">
          <h4>About the Applicant</h4>
          <div className="text-gray1 mt-4 space-y-2">
            <p>
              <strong>Name:</strong> {displayApplicant.name}
            </p>
            <p>
              <strong>Email:</strong> {displayApplicant.email}
            </p>
            <p>
              <strong>Type:</strong> {displayApplicant.type}
            </p>
            <p>
              <strong>Status:</strong> {displayApplicant.status}
            </p>
            <p>
              <strong>Applied On:</strong>{" "}
              {new Date(displayApprovalData.submittedAt).toLocaleDateString()}
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default JobApprovalDetailsDrawer;

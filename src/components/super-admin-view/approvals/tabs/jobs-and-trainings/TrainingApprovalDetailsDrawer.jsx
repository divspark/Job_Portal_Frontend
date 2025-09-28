import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { LocationIcon } from "@/utils/icon";
import { toast } from "sonner";
import { ClockIcon, CalendarIcon } from "lucide-react";
import {
  useApprovals,
  useGetApprovalDetails,
} from "../../../../../hooks/super-admin/useApprovals";

const TrainingApprovalDetailsDrawer = ({
  training,
  areApprovalBtnsVisible = false,
  onClose,
  onRevalidate,
}) => {
  const {
    isLoading: isLoadingApprovals,
    approveApplication,
    rejectApplication,
  } = useApprovals();
  const {
    data: trainingData,
    isLoading,
    error,
  } = useGetApprovalDetails(training?._id || training?.id, {
    enabled: !!(training?._id || training?.id),
  });

  const handleApprove = async () => {
    try {
      await approveApplication(training?._id || training?.id);
      // Revalidate the list data before closing
      if (onRevalidate) {
        await onRevalidate();
      }
      // Close the drawer after successful approval and revalidation
      if (onClose) {
        onClose();
      }
    } catch (error) {
      console.error("Failed to approve training:", error);
    }
  };

  const handleReject = async () => {
    try {
      await rejectApplication(training?._id || training?.id);
      // Revalidate the list data before closing
      if (onRevalidate) {
        await onRevalidate();
      }
      // Close the drawer after successful rejection and revalidation
      if (onClose) {
        onClose();
      }
    } catch (error) {
      console.error("Failed to reject training:", error);
    }
  };

  const handleHold = async () => {
    toast.info("Training is on hold");
  };

  if (isLoading) {
    return (
      <div className="min-h-full flex flex-col bg-white p-6">
        <div className="flex justify-center items-center h-64">
          <div className="text-lg text-gray-500">
            Loading training details...
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-full flex flex-col bg-white p-6">
        <div className="flex justify-center items-center h-64">
          <div className="text-lg text-red-500">
            Error loading training details: {error.message}
          </div>
        </div>
      </div>
    );
  }

  if (!training && !trainingData?.data?.data) {
    return (
      <div className="min-h-full flex flex-col bg-white p-6">
        <div className="flex justify-center items-center h-64">
          <div className="text-lg text-gray-500">No training details found</div>
        </div>
      </div>
    );
  }

  const approvalData = trainingData?.data;
  const detailedTraining = approvalData?.data;
  const applicant = approvalData?.applicant;

  // Mock data for testing when API data is not available
  const mockTraining = {
    trainingTitle: "Advanced React Development",
    trainingType: "Full-time",
    workingHours: "9 AM - 6 PM",
    workingDays: "Monday to Friday",
    officeLocation: "Tech Park, Sector 5",
    city: "Bangalore",
    state: "Karnataka",
    pincode: "560001",
    modeOfTraining: "Hybrid",
    experienceLevel: "3-5 years",
    genderPreference: "No Preference",
    minimumEducation: "Bachelor of Technology",
    englishLevel: "Fluent",
    preferredAgeRange: "25-35 years",
    trainingDescription:
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
    type: "training",
    status: "active",
  };

  const mockApprovalData = {
    submittedAt: new Date().toISOString(),
    status: "pending",
  };

  // Use detailed data if available, otherwise fall back to basic training data or mock data
  const displayTraining = detailedTraining || training || mockTraining;
  const displayApplicant = applicant || mockApplicant;
  const displayApprovalData = approvalData || mockApprovalData;

  return (
    <div className="min-h-full flex flex-col bg-white p-6">
      {/* Header */}
      <div className="flex justify-between gap-4 p-6 border-1 border-gray2 rounded-lg">
        {displayTraining.companyLogo ? (
          <img
            src={displayTraining.companyLogo}
            alt={displayTraining.company || displayApplicant.name}
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
          <p>{displayTraining?.company || "Google"}</p>
          <div className="flex items-center gap-4">
            <p className="text-xl font-medium">
              {displayTraining.trainingTitle ||
                displayTraining.jobTitle ||
                "Data Engineer"}
            </p>

            <Badge className="text-primary-purple bg-light-purple text-xs">
              {displayTraining.applicationsCount ||
                displayTraining.candidates ||
                2}{" "}
              Applied
            </Badge>
          </div>
          <div className="text-gray1 flex items-center gap-6 mt-2">
            <div className="flex items-center gap-2">
              <LocationIcon className="h-4 w-4 text-gray1" />
              {displayTraining.officeLocation || "Mumbai, India"}
            </div>

            <div className="flex items-center gap-2">
              <ClockIcon className="h-4 w-4 text-gray1" />
              {displayTraining.trainingType ||
                displayTraining.jobType ||
                "Full-time"}
            </div>

            <div className="flex items-center gap-2">
              {displayTraining.salary || "$80K - $120K"}
            </div>
          </div>

          {displayTraining.createdAt && (
            <div className="text-gray1 flex items-center gap-2 mt-2">
              <CalendarIcon className="h-4 w-4 text-gray1" />
              {new Date(displayTraining.createdAt).toLocaleDateString()}
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
              Approve Training
            </Button>
            <Button
              variant={"destructive"}
              onClick={handleReject}
              disabled={isLoadingApprovals}
            >
              Reject Training
            </Button>
            <Button
              variant={"black"}
              onClick={handleHold}
              disabled={isLoadingApprovals}
            >
              Hold Training
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
          <h3 className="text-lg font-semibold">About the training</h3>
          <div className="text-gray1 mt-4 space-y-2">
            {/* {displayTraining.trainingDescription && ( */}
            <>
              <h4 className="font-semibold">Training Description</h4>
              <p>
                {displayTraining.trainingDescription ||
                  displayTraining.jobDescription}{" "}
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Amet
                distinctio similique voluptatum accusamus, eos aperiam rerum
                harum ab molestiae porro atque illo, sint numquam. Officiis, a
                quas molestias deserunt dicta impedit? Assumenda culpa
                cupiditate, autem facilis neque quisquam quis sed recusandae!
                Porro autem aliquid doloremque assumenda sequi quidem tenetur
                molestiae.
              </p>
            </>
            {/* )} */}

            {displayTraining.responsibilities && (
              <>
                <h4 className="font-semibold">Key Responsibilities</h4>
                <ul className="list-disc list-inside">
                  {Array.isArray(displayTraining.responsibilities) ? (
                    displayTraining.responsibilities.map((resp, index) => (
                      <li key={index}>{resp}</li>
                    ))
                  ) : (
                    <li>{displayTraining.responsibilities}</li>
                  )}
                </ul>
              </>
            )}

            {displayTraining.requiredSkills && (
              <>
                <h4 className="font-semibold">Required Skills</h4>
                <ul className="list-disc list-inside">
                  {Array.isArray(displayTraining.requiredSkills) ? (
                    displayTraining.requiredSkills.map((skill, index) => (
                      <li key={index}>{skill}</li>
                    ))
                  ) : (
                    <li>{displayTraining.requiredSkills}</li>
                  )}
                </ul>
              </>
            )}

            {displayTraining.minimumEducation && (
              <>
                <h4 className="font-semibold">Education</h4>
                <p>{displayTraining.minimumEducation}</p>
              </>
            )}

            {(displayTraining.experienceLevel ||
              displayTraining.officeLocation ||
              displayTraining.salary ||
              displayTraining.trainingType ||
              displayTraining.modeOfTraining) && (
              <>
                <h4 className="font-semibold">Other Details</h4>
                <ul className="list-disc list-inside">
                  {displayTraining.experienceLevel && (
                    <li>Experience: {displayTraining.experienceLevel}</li>
                  )}
                  {displayTraining.officeLocation && (
                    <li>
                      Location: {displayTraining.officeLocation},{" "}
                      {displayTraining.city}, {displayTraining.state}
                    </li>
                  )}
                  {displayTraining.salary && (
                    <li>Salary: {displayTraining.salary}</li>
                  )}
                  {(displayTraining.trainingType ||
                    displayTraining.jobType) && (
                    <li>
                      Training Type:{" "}
                      {displayTraining.trainingType || displayTraining.jobType}
                    </li>
                  )}
                  {(displayTraining.modeOfTraining ||
                    displayTraining.modeOfWork) && (
                    <li>
                      Mode of Training:{" "}
                      {displayTraining.modeOfTraining ||
                        displayTraining.modeOfWork}
                    </li>
                  )}
                  {displayTraining.workingHours && (
                    <li>Working Hours: {displayTraining.workingHours}</li>
                  )}
                  {displayTraining.workingDays && (
                    <li>Working Days: {displayTraining.workingDays}</li>
                  )}
                  {displayTraining.genderPreference && (
                    <li>
                      Gender Preference: {displayTraining.genderPreference}
                    </li>
                  )}
                  {displayTraining.preferredAgeRange && (
                    <li>
                      Preferred Age Range: {displayTraining.preferredAgeRange}
                    </li>
                  )}
                  {displayTraining.englishLevel && (
                    <li>English Level: {displayTraining.englishLevel}</li>
                  )}
                  {displayTraining.twoWheelerMandatory !== undefined && (
                    <li>
                      Two Wheeler Mandatory:{" "}
                      {displayTraining.twoWheelerMandatory ? "Yes" : "No"}
                    </li>
                  )}
                  {displayTraining.isWalkInInterview !== undefined && (
                    <li>
                      Walk-in Interview:{" "}
                      {displayTraining.isWalkInInterview ? "Yes" : "No"}
                    </li>
                  )}
                </ul>
              </>
            )}

            {displayTraining.contactEmail && (
              <p>
                For additional information, you can reach out to me at{" "}
                {displayTraining.contactEmail}
              </p>
            )}

            {displayTraining.skills && (
              <div className="flex items-center gap-2 mt-4">
                {Array.isArray(displayTraining.skills) ? (
                  displayTraining.skills.map((skill) => (
                    <span
                      key={skill}
                      className="inline-block px-2 py-1 text-xs font-medium border-1 rounded-full"
                    >
                      {skill}
                    </span>
                  ))
                ) : (
                  <span className="inline-block px-2 py-1 text-xs font-medium border-1 rounded-full">
                    {displayTraining.skills}
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

export default TrainingApprovalDetailsDrawer;

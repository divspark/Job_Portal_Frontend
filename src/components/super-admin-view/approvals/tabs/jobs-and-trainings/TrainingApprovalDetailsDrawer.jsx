import { Button } from "@/components/ui/button";
import { GraduationCap, CheckCircle, XCircle, Clock } from "lucide-react";
import { Fragment, useState } from "react";
import TrainingDetailsTab from "./tabs/TrainingDetailsTab";
import TrainingEnrollmentsTab from "./tabs/TrainingEnrollmentsTab";
import {
  useApprovals,
  useGetApprovalDetails,
} from "@/hooks/superAdmin/useApprovals";

const TrainingApprovalDetailsDrawer = ({
  training,
  areApprovalBtnsVisible = false,
}) => {
  const [activeTab, setActiveTab] = useState("details");
  const { isLoading, approveApplication, rejectApplication, holdApplication } =
    useApprovals();

  // Fetch detailed training data using unified approval endpoint
  const {
    data: approvalDetails,
    isLoading: isLoadingDetails,
    error: detailsError,
  } = useGetApprovalDetails(training?._id || training?.id, {
    enabled: !!(training?._id || training?.id),
  });

  // Use detailed data if available, otherwise fall back to basic training data
  const displayTraining = approvalDetails?.data?.data || training;

  const handleApprove = async () => {
    try {
      await approveApplication(displayTraining.id || displayTraining._id);
      // Optionally refresh the training data or close the drawer
    } catch (error) {
      console.error("Failed to approve training:", error);
    }
  };

  const handleReject = async () => {
    try {
      await rejectApplication(displayTraining.id || displayTraining._id);
      // Optionally refresh the training data or close the drawer
    } catch (error) {
      console.error("Failed to reject training:", error);
    }
  };

  const handleHold = async () => {
    try {
      await holdApplication(displayTraining.id || displayTraining._id);
      // Optionally refresh the training data or close the drawer
    } catch (error) {
      console.error("Failed to hold training:", error);
    }
  };

  // Handle loading state
  if (isLoadingDetails) {
    return (
      <div className="w-full h-full p-10 bg-white rounded-l-2xl inline-flex flex-col justify-center items-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-purple mx-auto mb-4"></div>
          <p className="text-gray-600">Loading training details...</p>
        </div>
      </div>
    );
  }

  // Handle error state
  if (detailsError) {
    return (
      <div className="w-full h-full p-10 bg-white rounded-l-2xl inline-flex flex-col justify-center items-center">
        <div className="text-center">
          <div className="text-red-500 mb-4">
            <svg
              className="w-12 h-12 mx-auto"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.732-.833-2.5 0L4.268 18.5c-.77.833.192 2.5 1.732 2.5z"
              />
            </svg>
          </div>
          <p className="text-red-600 mb-2">Failed to load training details</p>
          <p className="text-gray-500 text-sm">
            {detailsError.message || "Something went wrong"}
          </p>
        </div>
      </div>
    );
  }

  if (!displayTraining) {
    return (
      <div className="w-full h-full p-10 bg-white rounded-l-2xl inline-flex flex-col justify-center items-center">
        <div className="text-center">
          <GraduationCap className="h-12 w-12 text-gray-400 mx-auto mb-4" />
          <p className="text-gray-500">No training selected</p>
        </div>
      </div>
    );
  }

  const tabs = [
    {
      id: "details",
      label: "Training Details",
      icon: GraduationCap,
    },
    {
      id: "enrollments",
      label: "Enrollments",
      icon: null,
    },
  ];

  return (
    <div className="w-full h-full bg-white rounded-l-2xl flex flex-col">
      {/* Header */}
      <div className="p-6 border-b border-gray-200">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="p-2 bg-primary-purple/10 rounded-lg">
              <GraduationCap className="h-6 w-6 text-primary-purple" />
            </div>
            <div>
              <h2 className="text-xl font-semibold text-gray-900">
                {displayTraining.title || "Training Details"}
              </h2>
              <p className="text-sm text-gray-500">
                ID: {displayTraining.id || displayTraining._id}
              </p>
            </div>
          </div>
          {areApprovalBtnsVisible && (
            <div className="flex space-x-2">
              <Button
                onClick={handleApprove}
                disabled={isLoading}
                className="bg-green-600 hover:bg-green-700 text-white"
              >
                <CheckCircle className="h-4 w-4 mr-2" />
                Approve
              </Button>
              <Button
                onClick={handleReject}
                disabled={isLoading}
                variant="destructive"
              >
                <XCircle className="h-4 w-4 mr-2" />
                Reject
              </Button>
              <Button
                onClick={handleHold}
                disabled={isLoading}
                variant="outline"
              >
                <Clock className="h-4 w-4 mr-2" />
                Hold
              </Button>
            </div>
          )}
        </div>
      </div>

      {/* Tab Navigation */}
      <div className="px-6 border-b border-gray-200">
        <nav className="flex space-x-8">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`py-4 px-1 border-b-2 font-medium text-sm transition-colors ${
                activeTab === tab.id
                  ? "border-primary-purple text-primary-purple"
                  : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
              }`}
            >
              {tab.icon && <tab.icon className="h-4 w-4 mr-2 inline" />}
              {tab.label}
            </button>
          ))}
        </nav>
      </div>

      {/* Tab Content */}
      <div className="flex-1 overflow-y-auto">
        {activeTab === "details" && (
          <TrainingDetailsTab training={displayTraining} />
        )}
        {activeTab === "enrollments" && (
          <TrainingEnrollmentsTab training={displayTraining} />
        )}
      </div>
    </div>
  );
};

export default TrainingApprovalDetailsDrawer;

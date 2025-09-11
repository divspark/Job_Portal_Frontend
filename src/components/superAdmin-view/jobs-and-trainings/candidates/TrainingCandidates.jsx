import { useParams } from "react-router-dom";
import { GraduationCap } from "lucide-react";

const TrainingCandidates = () => {
  const { trainingId } = useParams();

  return (
    <div className="w-full space-y-6">
      {/* Header */}
      <div className="flex items-center space-x-3">
        <GraduationCap className="h-6 w-6 text-gray-600" />
        <h1 className="text-2xl font-bold text-gray-900">
          Training Candidates
        </h1>
      </div>

      {/* Content */}
      <div className="bg-white rounded-lg border p-8">
        <div className="flex flex-col items-center justify-center space-y-4">
          <GraduationCap className="h-16 w-16 text-gray-400" />
          <div className="text-center">
            <h3 className="text-lg font-medium text-gray-900 mb-2">
              Candidates for Training ID: {trainingId}
            </h3>
            <p className="text-gray-500">
              This page will display the list of candidates who have applied for
              this training.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TrainingCandidates;

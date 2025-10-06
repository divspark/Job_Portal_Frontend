import { useEffect, useState } from "react";
import CommonForm from "@/components/common/form";
import ButtonComponent from "@/components/common/button";
import { jobSeekerBasicDetails } from "@/config";
import { useUpload } from "@/hooks/common/useUpload";

const EditCandidateForm = ({ candidate, onSave, onClose }) => {
  const [formData, setFormData] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { mutate: uploadFile } = useUpload();

  useEffect(() => {
    if (!candidate) return;

    setFormData({
      name: candidate.name || "",
      birthDate: candidate.birthDate || "",
      phone: candidate.phone || { countryCode: "+91", number: "" },
      email: candidate.email || "",
      password: "",
      confirmPassword: "",
      bio: candidate.bio || candidate.summary || "",
      profilePicture: candidate.profilePicture || "",
      currentAddress: candidate.currentAddress || {
        address: "",
        city: "",
        state: "",
        pincode: "",
      },
      gender: candidate.gender || "",
    });
  }, [candidate]);

  const handleUpload = (file, callback) => {
    uploadFile(file, {
      onSuccess: (data) => {
        const fileUrl = data?.data?.fileUrl;
        const fileName = data?.data?.fileName;
        if (callback) callback(fileUrl, fileName);
      },
      onError: () => {},
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      const payload = { ...formData };
      delete payload.password;
      delete payload.confirmPassword;
      await onSave(payload);
    } catch (err) {
      console.error(err);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="w-full h-full p-6 bg-white overflow-y-auto">
      <div className="max-w-4xl mx-auto">
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-2">
            Edit Candidate
          </h2>
          <p className="text-gray-600">Update candidate profile information</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-8">
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <div className="space-y-4">
              <CommonForm
                formControls={jobSeekerBasicDetails}
                formData={formData}
                setFormData={setFormData}
                handleUpload={handleUpload}
              />
            </div>
          </div>

          <div className="flex justify-end space-x-4 pt-6 border-t border-gray-200">
            <ButtonComponent
              type="button"
              color="gray"
              buttonText="Cancel"
              onClick={onClose}
              className="px-6 py-2"
            />
            <ButtonComponent
              type="submit"
              color="#6945ED"
              buttonText={isSubmitting ? "Updating..." : "Update Candidate"}
              isPending={isSubmitting}
              className="px-6 py-2"
            />
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditCandidateForm;

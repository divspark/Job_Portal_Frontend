import { useState, useEffect } from "react";
import CommonForm from "../../../common/form";
import ButtonComponent from "../../../common/button";
import { useUploadFile } from "../../../../hooks/super-admin/useUploadFile";
import { useGetDropdownValues } from "../../../../hooks/super-admin/useDropdowns";

const EditRecruiterForm = ({ recruiter, onSave, onClose }) => {
  const [formData, setFormData] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { mutate: uploadFile } = useUploadFile();
  const { data: dropdownData } = useGetDropdownValues("industries");

  const sectorOptions =
    dropdownData?.data?.values?.map((item) => ({
      id: item.value,
      label: item.label,
    })) || [];

  const { data: expertiseDropdownData } =
    useGetDropdownValues("expertise-area");

  const expertiseOptions =
    expertiseDropdownData?.data?.values?.map((item) => ({
      id: item.value,
      label: item.label,
    })) || [];

  const basicInfoFields = [
    {
      row: [
        {
          name: "firstName",
          label: "First Name",
          placeholder: "Enter First Name",
          componentType: "input",
          type: "text",
          width: "2/3",
        },
        {
          name: "lastName",
          label: "Last Name",
          placeholder: "Enter Last Name",
          componentType: "input",
          type: "text",
          width: "2/3",
        },
        {
          name: "profileImage",
          label: "",
          placeholder: "Profile Picture",
          componentType: "file",
          type: "file",
          width: "1/3",
          accept: "image",
        },
      ],
    },
    {
      name: "email",
      label: "Email",
      placeholder: "Enter Email",
      componentType: "input",
      type: "email",
    },
    {
      name: "phone",
      label: "Contact Information",
      placeholder: "Ex. XXXXX XXXXX",
      componentType: "phone",
      type: "number",
    },
    {
      name: "currentAddress.address",
      label: "Current Address",
      placeholder: "Enter Address",
      componentType: "textarea",
      type: "text",
    },
    {
      row: [
        {
          name: "currentAddress.city",
          label: "",
          placeholder: "Enter City",
          componentType: "input",
          type: "text",
          width: "1/3",
        },
        {
          name: "currentAddress.state",
          label: "",
          placeholder: "Enter State",
          componentType: "input",
          type: "text",
          width: "1/3",
        },
        {
          name: "currentAddress.pincode",
          label: "",
          placeholder: "Enter Pincode",
          componentType: "input",
          type: "text",
          width: "1/3",
        },
      ],
    },
    {
      name: "permanentAddress.address",
      label: "Permanent Address",
      placeholder: "Enter Permanent Address",
      componentType: "textarea",
      type: "text",
    },
    {
      row: [
        {
          name: "permanentAddress.city",
          label: "",
          placeholder: "Enter City",
          componentType: "input",
          type: "text",
          width: "1/3",
        },
        {
          name: "permanentAddress.state",
          label: "",
          placeholder: "Enter State",
          componentType: "input",
          type: "text",
          width: "1/3",
        },
        {
          name: "permanentAddress.pincode",
          label: "",
          placeholder: "Enter Pincode",
          componentType: "input",
          type: "text",
          width: "1/3",
        },
      ],
    },
  ];

  const documentsFields = [
    {
      name: "documents.resume",
      label: "Resume",
      placeholder: "Upload Resume",
      componentType: "file",
      accept: "pdf",
    },
    {
      name: "documents.panCard",
      label: "PAN Card",
      placeholder: "Upload PAN Card",
      componentType: "file",
      accept: "image",
    },
    {
      name: "documents.aadharCard",
      label: "Aadhar Card",
      placeholder: "Upload Aadhar Card",
      componentType: "file",
      accept: "image",
    },
    {
      name: "documents.cancelledCheque",
      label: "Cancel Cheque",
      placeholder: "Upload Cancel Cheque",
      componentType: "file",
      accept: "image",
    },
    {
      name: "documents.relievingLetter",
      label: "Relieving Letter",
      placeholder: "Upload Relieving Letter",
      componentType: "file",
      accept: "pdf",
    },
    {
      name: "latestQualification",
      label: "Latest Qualification",
      placeholder: "Upload Latest Qualification",
      componentType: "file",
      accept: "pdf",
    },
  ];

  const professionalFields = [
    {
      name: "sectorSpecialization",
      label: "Sectoral Specialization",
      componentType: "multi-select",
      max: 3,
      options: sectorOptions,
    },
    {
      name: "totalExperience",
      label: "Total Years of Experience (In years)",
      componentType: "input",
      type: "number",
      placeholder: "e.g. 5",
    },
    {
      name: "experienceLevel",
      label: "Experience in",
      componentType: "multi-select",
      max: 3,
      options: expertiseOptions,
    },
    {
      name: "lastOrganization.name",
      label: "Last Organization Name",
      componentType: "input",
      type: "text",
      placeholder: "Enter Organization Name",
    },
    {
      name: "lastOrganization.position",
      label: "Designation in Last Organization",
      componentType: "input",
      type: "text",
      placeholder: "Enter Designation",
    },
    {
      name: "linkedinProfile",
      label: "LinkedIn Profile URL",
      componentType: "input",
      type: "url",
      placeholder: "Enter LinkedIn URL",
    },
    {
      name: "monthlyClosures",
      label: "Monthly Closures",
      componentType: "input",
      type: "number",
      placeholder: "Enter monthly closures",
    },
  ];

  const additionalInfoFields = [
    {
      name: "fatherName",
      label: "Father's Name",
      componentType: "input",
      type: "text",
      placeholder: "Enter Father's Name",
    },
    {
      name: "motherName",
      label: "Mother's Name",
      componentType: "input",
      type: "text",
      placeholder: "Enter Mother's Name",
    },
    {
      name: "medicalProblemDetails",
      label: "Medical Problem Details",
      componentType: "textarea",
      placeholder: "Enter medical problem details or leave blank if none",
    },
  ];

  const kycFields = [
    {
      name: "kycDetails.panDetails.number",
      label: "PAN Number",
      componentType: "input",
      type: "text",
      placeholder: "Enter PAN Number",
    },
    {
      name: "kycDetails.aadharDetails.number",
      label: "Aadhaar Number",
      componentType: "input",
      type: "text",
      placeholder: "Enter Aadhaar Number",
    },
  ];

  const bankDetailsFields = [
    {
      name: "kycDetails.bankDetails.accountNumber",
      label: "Account Number",
      componentType: "input",
      type: "text",
      placeholder: "Enter Account Number",
    },
    {
      name: "kycDetails.bankDetails.accountHolderName",
      label: "Account Holder Name",
      componentType: "input",
      type: "text",
      placeholder: "Enter Account Holder Name",
    },
    {
      name: "kycDetails.bankDetails.bankName",
      label: "Bank Name",
      componentType: "input",
      type: "text",
      placeholder: "Enter Bank Name",
    },
    {
      name: "kycDetails.bankDetails.ifscCode",
      label: "IFSC Code",
      componentType: "input",
      type: "text",
      placeholder: "Enter IFSC Code",
    },
    {
      name: "kycDetails.bankDetails.accountType",
      label: "Account Type",
      componentType: "input",
      type: "text",
      placeholder: "Enter Account Type",
    },
  ];

  useEffect(() => {
    if (recruiter) {
      setFormData({
        firstName: recruiter.firstName || "",
        lastName: recruiter.lastName || "",
        email: recruiter.email || "",
        profileImage: recruiter.profileImage || "",
        phone: recruiter.phone || {
          number: "",
          countryCode: "+91",
        },
        currentAddress: recruiter.currentAddress || {
          address: "",
          city: "",
          state: "",
          pincode: "",
        },
        permanentAddress: recruiter.permanentAddress || {
          address: "",
          city: "",
          state: "",
          pincode: "",
        },
        documents: recruiter.documents || {
          resume: "",
          panCard: "",
          aadharCard: "",
          cancelledCheque: "",
          relievingLetter: "",
        },
        sectorSpecialization: recruiter.sectorSpecialization || [],
        totalExperience: recruiter.totalExperience || "",
        experienceLevel: recruiter.experienceLevel || [],
        lastOrganization: recruiter.lastOrganization || {
          name: "",
          position: "",
        },
        linkedinProfile: recruiter.linkedinProfile || "",
        latestQualification: recruiter.latestQualification || "",
        fatherName: recruiter.fatherName || "",
        motherName: recruiter.motherName || "",
        medicalProblemDetails: recruiter.medicalProblemDetails || "",
        kycDetails: recruiter.kycDetails || {
          panDetails: {
            number: "",
          },
          aadharDetails: {
            number: "",
          },
          bankDetails: {
            accountNumber: "",
            accountHolderName: "",
            bankName: "",
            ifscCode: "",
            accountType: "",
          },
        },
        monthlyClosures: recruiter.monthlyClosures || "",
        references: recruiter.references || [],
      });
    }
  }, [recruiter]);

  const handleUpload = (file, callback) => {
    uploadFile(
      { file, role: "super-admin", folder: "documents" },
      {
        onSuccess: (data) => {
          const fileUrl = data?.data?.fileUrl;
          const fileName = data?.data?.fileName;
          if (callback) {
            callback(fileUrl, fileName);
          }
        },
        onError: (error) => {
          console.error("Upload error:", error);
        },
      }
    );
  };

  const transformFormDataToPayload = (formData) => {
    const payload = {
      firstName: formData.firstName,
      lastName: formData.lastName,
      email: formData.email,
      phone: formData.phone || {
        number: "",
        countryCode: "+91",
      },
      profileImage: formData.profileImage,
      location:
        formData.currentAddress?.city && formData.currentAddress?.state
          ? `${formData.currentAddress.city}, ${formData.currentAddress.state}`
          : formData.currentAddress?.city || formData.currentAddress?.state,
      lastOrganization: {
        name: formData.lastOrganization?.name,
        position: formData.lastOrganization?.position,
      },
      totalExperience: formData.totalExperience,
      experienceLevel: formData.experienceLevel || [],
      sectorSpecialization:
        formData.sectorSpecialization?.map((item) =>
          typeof item === "string" ? item : item.id || item.value
        ) || [],
      linkedinProfile: formData.linkedinProfile,
      monthlyClosures: formData.monthlyClosures,
    };

    // Add current address details
    if (formData.currentAddress) {
      payload.currentAddress = formData.currentAddress;
    }

    // Add permanent address details
    if (formData.permanentAddress) {
      payload.permanentAddress = formData.permanentAddress;
    }

    // Add documents
    if (formData.documents) {
      payload.documents = formData.documents;
    }
    if (formData.latestQualification) {
      payload.latestQualification = formData.latestQualification;
    }

    // Add additional information
    if (formData.fatherName) {
      payload.fatherName = formData.fatherName;
    }
    if (formData.motherName) {
      payload.motherName = formData.motherName;
    }
    if (formData.medicalProblemDetails) {
      payload.medicalProblemDetails = formData.medicalProblemDetails;
    }

    // Add KYC and bank details
    if (formData.kycDetails) {
      payload.kycDetails = formData.kycDetails;
    }

    // Add references
    if (formData.references && formData.references.length > 0) {
      payload.references = formData.references;
    }

    return payload;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const payload = transformFormDataToPayload(formData);
      await onSave(payload);
    } catch (error) {
      console.error("Error updating recruiter:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const updatedProfessionalFields = professionalFields;

  return (
    <div className="w-full h-screen p-6 bg-white overflow-y-auto overscroll-contain">
      <div className="max-w-4xl mx-auto">
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-2">
            Edit Recruiter Profile
          </h2>
          <p className="text-gray-600">
            Update recruiter information and details
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-8">
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">
              Personal Information
            </h3>
            <div className="space-y-4">
              <CommonForm
                formControls={basicInfoFields}
                formData={formData}
                setFormData={setFormData}
                handleUpload={handleUpload}
              />
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">
              Documents
            </h3>
            <div className="space-y-4">
              <CommonForm
                formControls={documentsFields}
                formData={formData}
                setFormData={setFormData}
                handleUpload={handleUpload}
              />
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">
              Professional Details
            </h3>
            <div className="space-y-4">
              <CommonForm
                formControls={updatedProfessionalFields}
                formData={formData}
                setFormData={setFormData}
                handleUpload={handleUpload}
              />
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">
              Additional Information
            </h3>
            <div className="space-y-4">
              <CommonForm
                formControls={additionalInfoFields}
                formData={formData}
                setFormData={setFormData}
                handleUpload={handleUpload}
              />
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">
              KYC Details
            </h3>
            <div className="space-y-4">
              <CommonForm
                formControls={kycFields}
                formData={formData}
                setFormData={setFormData}
                handleUpload={handleUpload}
              />
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">
              Bank Details
            </h3>
            <div className="space-y-4">
              <CommonForm
                formControls={bankDetailsFields}
                formData={formData}
                setFormData={setFormData}
                handleUpload={handleUpload}
              />
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-semibold text-gray-900">
                References
              </h3>
              <button
                type="button"
                onClick={() => {
                  setFormData((prev) => ({
                    ...prev,
                    references: [
                      ...prev.references,
                      {
                        name: "",
                        contactNo: "",
                        organization: "",
                        designation: "",
                      },
                    ],
                  }));
                }}
                className="px-3 py-1 bg-primary-purple text-white text-sm rounded-full hover:bg-primary-purple/80"
              >
                + Add Reference
              </button>
            </div>
            {formData.references && formData.references.length > 0 ? (
              <div className="space-y-4">
                {formData.references.map((ref, index) => (
                  <div
                    key={index}
                    className="p-4 border border-gray-200 rounded-lg space-y-3"
                  >
                    <div className="flex justify-between items-center mb-2">
                      <h4 className="text-sm font-semibold text-gray-700">
                        Reference #{index + 1}
                      </h4>
                      <button
                        type="button"
                        onClick={() => {
                          setFormData((prev) => ({
                            ...prev,
                            references: prev.references.filter(
                              (_, i) => i !== index
                            ),
                          }));
                        }}
                        className="px-2 py-1 bg-red-500 text-white text-xs rounded hover:bg-red-600"
                      >
                        Remove
                      </button>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                      <input
                        type="text"
                        placeholder="Name"
                        value={ref.name || ""}
                        onChange={(e) => {
                          setFormData((prev) => ({
                            ...prev,
                            references: prev.references.map((r, i) =>
                              i === index ? { ...r, name: e.target.value } : r
                            ),
                          }));
                        }}
                        className="w-full px-3 py-2 border border-gray-200 rounded text-sm focus:outline-none focus:border-blue-500"
                      />
                      <input
                        type="text"
                        placeholder="Contact No"
                        value={ref.contactNo || ""}
                        onChange={(e) => {
                          setFormData((prev) => ({
                            ...prev,
                            references: prev.references.map((r, i) =>
                              i === index
                                ? { ...r, contactNo: e.target.value }
                                : r
                            ),
                          }));
                        }}
                        className="w-full px-3 py-2 border border-gray-200 rounded text-sm focus:outline-none focus:border-blue-500"
                      />
                      <input
                        type="text"
                        placeholder="Organization"
                        value={ref.organization || ""}
                        onChange={(e) => {
                          setFormData((prev) => ({
                            ...prev,
                            references: prev.references.map((r, i) =>
                              i === index
                                ? { ...r, organization: e.target.value }
                                : r
                            ),
                          }));
                        }}
                        className="w-full px-3 py-2 border border-gray-200 rounded text-sm focus:outline-none focus:border-blue-500"
                      />
                      <input
                        type="text"
                        placeholder="Designation"
                        value={ref.designation || ""}
                        onChange={(e) => {
                          setFormData((prev) => ({
                            ...prev,
                            references: prev.references.map((r, i) =>
                              i === index
                                ? { ...r, designation: e.target.value }
                                : r
                            ),
                          }));
                        }}
                        className="w-full px-3 py-2 border border-gray-200 rounded text-sm focus:outline-none focus:border-blue-500"
                      />
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-gray-500 text-sm">
                No references added yet
              </div>
            )}
          </div>

          <div className="flex justify-end space-x-4 pt-6">
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
              buttonText={isSubmitting ? "Updating..." : "Update Recruiter"}
              isPending={isSubmitting}
              className="px-6 py-2"
            />
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditRecruiterForm;

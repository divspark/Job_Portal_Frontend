import { Badge } from "@/components/ui/badge";
import { ExternalLink, MailIcon, PhoneCallIcon } from "lucide-react";

const AboutCandidate = ({ candidate }) => {
  const skills = Array.isArray(candidate?.skills) ? candidate.skills : [];
  const educations = Array.isArray(candidate?.education)
    ? candidate.education
    : [];
  const certifications = Array.isArray(candidate?.certifications)
    ? candidate.certifications
    : [];
  const experiences = Array.isArray(candidate?.experience)
    ? candidate.experience
    : [];
  const phoneFormatted = `${candidate?.phone?.countryCode || ""} ${
    candidate?.phone?.number || ""
  }`.trim();

  return (
    <div className="mt-6">
      <div className="grid grid-cols-9 gap-4">
        <div className="p-4 border-1 col-span-2 border-gray2 rounded text-sm flex flex-col justify-center">
          <span className="text-gray1/50">Location</span>
          <p className="">N/A</p>
        </div>

        <div className="p-4 border-1 col-span-2 border-gray2 rounded text-sm flex flex-col justify-center">
          <span className="text-gray1/50">Status</span>
          <p className="mt-2 capitalize">{candidate?.status || "N/A"}</p>
        </div>

        <div className="p-4 border-1 col-span-2 border-gray2 rounded text-sm flex flex-col justify-center space-y-2">
          <span className="text-gray1/50">Resume</span>
          <p className="bg-gray2 rounded px-3 py-2 text-center">resume.pdf</p>
        </div>

        <div className="p-4 border-1 col-span-3 border-gray2 rounded text-sm flex flex-col justify-center spcace-y-3">
          <span className="text-gray1/50">Contact Information</span>
          <p className="flex items-center gap-2 mt-2">
            <PhoneCallIcon className="w-4 h-4" /> {phoneFormatted || "N/A"}
          </p>
          <p className="flex items-center gap-2 mt-2">
            <MailIcon className="w-4 h-4 text-black" /> {candidate?.email || ""}
          </p>
        </div>
      </div>

      <div className="grid grid-cols-5 gap-4 mt-6">
        <div className="col-span-3 border-1 border-gray2 rounded-lg p-6">
          <h3 className="text-lg font-semibold">Professional Experience</h3>
          <div className="mt-4 space-y-4">
            {experiences.length > 0 ? (
              experiences.map((exp, index) => (
                <div
                  key={index}
                  className="flex items-center gap-4 border border-gray-200 rounded p-4"
                >
                  <div className="flex justify-between items-center w-full">
                    <div>
                      <h4 className="font-semibold">{exp?.role || "N/A"}</h4>
                      <div className="flex items-center gap-2 mt-1">
                        <p className="text-gray1">{exp?.companyName || ""}</p>
                      </div>
                    </div>
                    <p className="text-sm text-gray1">
                      {exp?.startDate || ""}
                      {exp?.endDate ? ` - ${exp.endDate}` : ""}
                    </p>
                  </div>
                </div>
              ))
            ) : (
              <p className="text-sm text-gray1/70">No experience added</p>
            )}
          </div>

          <div className="mt-6">
            <div className="flex justify-between items-center border-b border-gray-200 py-2">
              <span className="text-gray1">Signup Progress</span>
              <span>{candidate?.signupProgress ?? 0}%</span>
            </div>
            <div className="flex justify-between items-center border-b border-gray-200 py-2">
              <span className="text-gray1">Current Stage</span>
              <span>{candidate?.currentStage ?? "-"}</span>
            </div>
          </div>
        </div>

        <div className="col-span-2 border-1 border-gray2 rounded-lg p-6 flex flex-col gap-6">
          {/* Skills */}
          <div>
            <h3 className="text-lg font-semibold">Skills</h3>
            <div className="flex flex-wrap gap-2">
              {skills.length > 0 ? (
                skills.map((skill, index) => (
                  <Badge
                    key={index}
                    className="bg-gray2 text-gray1 px-3 py-1 rounded-full"
                  >
                    {skill}
                  </Badge>
                ))
              ) : (
                <p className="text-sm text-gray1/70">No skills added</p>
              )}
            </div>
          </div>

          {/* Education */}
          <div>
            <h3 className="text-lg font-semibold">Education</h3>
            <div className="mt-4 space-y-4">
              {educations.length > 0 ? (
                educations.map((edu, index) => (
                  <div
                    key={index}
                    className="flex items-center gap-4 border border-gray-200 rounded p-4"
                  >
                    <img
                      src="/education.png"
                      alt="Institution Logo"
                      className="w-12 h-12"
                    />
                    <div className="flex justify-between items-center w-full">
                      <div>
                        <p className="capitalize">{edu?.institution || ""}</p>
                        <p className="text-sm text-gray1/50">
                          {edu?.startDate || ""}
                          {edu?.endDate ? ` - ${edu.endDate}` : ""}
                        </p>
                      </div>
                      <p className="capitalize">{edu?.degree || ""}</p>
                    </div>
                  </div>
                ))
              ) : (
                <p className="text-sm text-gray1/70">No education added</p>
              )}
            </div>
          </div>

          {/* Certifications */}
          <div>
            <h3 className="text-lg font-semibold">Certifications</h3>
            <div className="mt-4 space-y-2">
              {certifications.length > 0 ? (
                certifications.map((cert, index) => (
                  <div
                    key={index}
                    className="flex justify-between items-center border-b border-gray-200 py-2"
                  >
                    <div>
                      <p className="capitalize">{cert?.name || ""}</p>
                      <p className="text-sm text-gray1/50">
                        {cert?.duration || ""}
                      </p>
                    </div>
                    {cert?.link && (
                      <a
                        href={cert.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-sm"
                      >
                        <ExternalLink className="w-4 h-4" />
                      </a>
                    )}
                  </div>
                ))
              ) : (
                <p className="text-sm text-gray1/70">No certifications added</p>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Additional Information */}
      <div className="mt-6 border-1 border-gray2 rounded-lg p-6">
        <h3 className="text-lg font-semibold">Additional Information</h3>
        <div className="mt-4 space-y-2">
          <div className="grid grid-cols-2 gap-4 border-b border-gray-200 py-2">
            <p>Is Verified</p>
            <p className="">{candidate?.isVerified ? "Yes" : "No"}</p>
          </div>
          <div className="grid grid-cols-2 gap-4 border-b border-gray-200 py-2">
            <p>Created At</p>
            <p className="">{candidate?.createdAt || ""}</p>
          </div>
          <div className="grid grid-cols-2 gap-4 border-b border-gray-200 py-2">
            <p>Updated At</p>
            <p className="">{candidate?.updatedAt || ""}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutCandidate;

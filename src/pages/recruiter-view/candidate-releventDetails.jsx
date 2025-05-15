import React, { useState } from "react";
import CommonForm from "../../components/common/form";
import {
  releventCandidateProfessionalDetails,
  releventCandidateSalary,
} from "../../config";

const CandidateReleventDetails = () => {
  const [formData, setFormData] = useState({
    noticePeriod: 30,
    totalExperience: 8,
    currentSalary: 1200000,
    expectedSalary: 1500000,
    roleLookingFor: "Senior Backend Engineer",
    areaOfExpertise: "Backend Development",
    functionalArea: "Engineering",
  });
  return (
    <div className="self-stretch lg:px-36 lg:py-20 p-[20px] inline-flex flex-col justify-start items-end lg:gap-10 gap-[15px]">
      <div className="w-full inline-flex justify-start items-start gap-8">
        <div className="flex-1 inline-flex flex-col justify-start items-start gap-7">
          <div className="self-stretch justify-start text-gray-900 lg:text-3xl text-[20px] font-bold leading-loose">
            Candidate's relevant work experience
          </div>
        </div>
      </div>
      <div className="w-full flex flex-col justify-start items-start gap-10">
        <div className="self-stretch flex flex-col justify-start items-start gap-10">
          <div className="self-stretch p-6 bg-white rounded-lg shadow-[0px_1px_2px_0px_rgba(0,0,0,0.03)] outline outline-1 outline-offset-[-1px] outline-zinc-300 flex flex-col justify-start items-start gap-4">
            <div className="self-stretch inline-flex justify-start items-start gap-60">
              <div className="justify-start text-gray-900 text-xl font-semibold leading-tight">
                Professional Details
              </div>
            </div>
            <div className="w-full">
              <CommonForm
                formControls={releventCandidateProfessionalDetails}
                formData={formData}
                setFormData={setFormData}
              />
            </div>
          </div>
        </div>
        <div className="w-full self-stretch flex flex-col justify-start items-start gap-10">
          <div className="w-full self-stretch p-6 bg-white rounded-lg shadow-[0px_1px_2px_0px_rgba(0,0,0,0.03)] outline-1 outline-offset-[-1px] outline-zinc-300 flex flex-col justify-start items-start gap-4">
            <div className="self-stretch inline-flex justify-start items-start gap-60">
              <div className="justify-start text-gray-900 text-xl font-semibold leading-tight">
                Preferences
              </div>
            </div>
            <div className="self-stretch h-0 outline-1 outline-offset-[-0.50px] outline-neutral-200"></div>
            <div className="self-stretch flex flex-col justify-start items-start gap-2">
              <div className="self-stretch inline-flex justify-start items-center gap-3">
                <div className="flex justify-start items-start gap-2.5">
                  <div className="justify-start text-gray-900 text-sm font-medium leading-normal">
                    Notice Period
                  </div>
                </div>
              </div>
              <div className="self-stretch inline-flex flex-wrap justify-start items-start gap-2">
                <div className="flex-1 max-sm:min-w-[150px] h-11 px-4 py-2.5 bg-white rounded outline outline-1 outline-neutral-200 flex justify-center items-center gap-2">
                  <div className="self-stretch flex justify-start items-start gap-2.5">
                    <div className="justify-start text-neutral-400 text-sm font-normal leading-normal">
                      Available Now
                    </div>
                  </div>
                </div>
                <div className="max-sm:min-w-[150px] flex-1 h-11 px-4 py-2.5 bg-white rounded outline outline-2 outline-offset-[-1px] outline-violet-600 flex justify-center items-center gap-4">
                  <div className="self-stretch flex justify-start items-start gap-2.5">
                    <div className="justify-start text-neutral-400 text-sm font-normal leading-normal">
                      15 Days
                    </div>
                  </div>
                  <div className="w-2 h-2 bg-white rounded-full outline outline-4 outline-offset-[-2px] outline-violet-600" />
                </div>
                <div className="max-sm:min-w-[150px] flex-1 h-11 px-4 py-2.5 bg-white rounded outline outline-1 outline-neutral-200 flex justify-center items-center gap-2">
                  <div className="self-stretch flex justify-start items-start gap-2.5">
                    <div className="justify-start text-neutral-400 text-sm font-normal leading-normal">
                      30 Days
                    </div>
                  </div>
                </div>
                <div className="max-sm:min-w-[150px] flex-1 h-11 px-4 py-2.5 bg-white rounded outline outline-1 outline-neutral-200 flex justify-center items-center gap-2">
                  <div className="self-stretch flex justify-start items-start gap-2.5">
                    <div className="justify-start text-neutral-400 text-sm font-normal leading-normal">
                      45 Days
                    </div>
                  </div>
                </div>
                <div className="max-sm:min-w-[150px] flex-1 h-11 px-4 py-2.5 bg-white rounded outline outline-1 outline-neutral-200 flex justify-center items-center gap-2">
                  <div className="self-stretch flex justify-start items-start gap-2.5">
                    <div className="justify-start text-neutral-400 text-sm font-normal leading-normal">
                      Enter Days
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="w-full self-stretch inline-flex justify-between items-center gap-4">
              <CommonForm
                formControls={releventCandidateSalary}
                formData={formData}
                setFormData={setFormData}
              />
            </div>
          </div>
          <div className="self-stretch flex flex-col justify-start items-end gap-10">
            <div className="w-36 px-5 py-2.5 bg-violet-600 rounded-3xl inline-flex justify-center items-center gap-2.5">
              <div className="justify-start text-white text-sm font-medium capitalize">
                Continue
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CandidateReleventDetails;

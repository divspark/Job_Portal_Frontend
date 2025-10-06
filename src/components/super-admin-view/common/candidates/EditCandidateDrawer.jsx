import { Sheet, SheetContent } from "@/components/ui/sheet";
import EditCandidateForm from "./EditCandidateForm";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateCandidate as updateCandidateApi } from "@/api/super-admin/database";
import { toast } from "sonner";

const EditCandidateDrawer = ({ isOpen, onClose, candidate }) => {
  const queryClient = useQueryClient();

  const { mutate: updateCandidate, isPending } = useMutation({
    mutationFn: ({ id, data }) => updateCandidateApi({ id, data }),
    onSuccess: (data, variables) => {
      toast.success("Candidate updated successfully!");
      queryClient.invalidateQueries({
        queryKey: ["superAdmin-applicant", variables.id],
      });
      queryClient.invalidateQueries({ queryKey: ["superAdmin-applicants"] });
      onClose();
    },
    onError: (error) => {
      toast.error(
        error?.response?.data?.message || "Failed to update candidate"
      );
    },
  });

  const handleSave = async (formData) => {
    const source = candidate?.data || candidate;
    const id =
      source?._id ||
      source?.id ||
      source?.jobseekerId ||
      source?.userId ||
      source?.candidateId;

    if (!id) {
      toast.error("Candidate id not found for update");
      return;
    }

    await updateCandidate({ id, data: formData });
  };

  return (
    <Sheet open={isOpen} onOpenChange={onClose}>
      <SheetContent
        side="right"
        className="w-full h-screen lg:max-w-[1000px] md:max-w-full sm:max-w-full overflow-y-auto border-transparent [&>button.absolute]:hidden"
      >
        <div className="w-full h-full">
          {candidate && (
            <EditCandidateForm
              candidate={candidate?.data || candidate}
              onSave={handleSave}
              onClose={onClose}
              isPending={isPending}
            />
          )}
        </div>
      </SheetContent>
    </Sheet>
  );
};

export default EditCandidateDrawer;

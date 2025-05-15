import { useQuery } from "@tanstack/react-query";
import { getAllSectoralOptions } from "../api/recruiter/sectoralOption";

export const useSectorOptions = () => {
  return useQuery({
    queryKey: ["sector-options"],
    queryFn: getAllSectoralOptions,
  });
};

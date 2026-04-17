export type ApplicationStatus =
  | "saved"
  | "applied"
  | "interview"
  | "offer"
  | "rejected";

export type Application = {
  id: string;
  user_id: string;
  company: string;
  job_title: string;
  status: ApplicationStatus;
  location: string | null;
  job_url: string | null;
  applied_at: string | null;
  notes: string | null;
  created_at: string;
};

export const statusOptions: ApplicationStatus[] = [
  "saved",
  "applied",
  "interview",
  "offer",
  "rejected",
];

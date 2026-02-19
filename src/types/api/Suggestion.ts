import { User } from "@/types/api/User";

export interface Suggestion {
  id: string;
  content: string;
  resolved: boolean;
  user: User;
  createdAt: Date;
}

import { User } from "@/types/api/User";
import { NeverHave, Prefer, TruthDare } from "@/types/api/Question";

export interface Report {
  id: string;
  comment: string;
  reason: string;
  resolved: boolean;
  user: User;
  truthDare?: TruthDare;
  neverHave?: NeverHave;
  prefer?: Prefer;
  createdAt: Date;
}
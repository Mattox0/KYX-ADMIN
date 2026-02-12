import { Mode } from "@/types/api/Mode";

export interface Question {
  id: string;
  mode: Mode;
  createdDate: Date;
  updatedDate: Date;
}

export interface NeverHave extends Question {
  question: string;
}

export interface Prefer extends Question {
  choiceOne: string;
  choiceTwo: string;
}

export enum Gender {
  HOMME = "Homme",
  FEMME = "Femme",
  TOUS = "Tous",
}

export enum ChallengeType {
  ACTION = "ACTION",
  VERITE = "VERITE",
}

export interface TruthDare extends Question {
  type: ChallengeType;
  gender: Gender;
}
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
  MAN = "MAN",
  FEMALE = "FEMALE",
  ALL = "ALL",
}

export enum ChallengeType {
  DARE = "DARE",
  TRUTH = "TRUTH",
}

export interface TruthDare extends Question {
  type: ChallengeType;
  gender: Gender;
  question: string;
}
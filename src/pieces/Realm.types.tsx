export interface Question {
  topic: string;
  statement: string;
  kind: string;
  options: string;
  answer: string;
  hashAES: string;
}

export interface Exam {
  title: string;
  description: string;
  questions: string;
  applicantString: string;
  hashAES: string;
}

export interface Crypto {
  salt: string,
  randomAES: string
}

export interface Problem {
  Title: string;
  Statement: string;
  Examples: string[];
}

export interface StructuredData {
  [key: number]: Problem;
}

export interface ScoreData {
  [key: string]: ScoreUser; // address -> score
}

export interface ScoreContainer {
  [key: string]: ScoreData; // address -> score
}

export interface ScoreUser {
  Address: string,
  Score: string,
  Tests: string,
}

export interface ProblemLeaderboardData {
  scores: ScoreData[];
  problem: Problem
}
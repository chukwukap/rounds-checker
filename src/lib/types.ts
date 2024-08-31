export type RoundId = string;

export interface Round {
  _id: string;
  roundId: RoundId;
  __v: number;
  areWinnersReported: boolean;
  communityId: string;
  createdAt: string;
  denomination: string;
  logo: string;
  name: string;
  startsAt: string;
  status: "complete" | string; // Add other possible statuses if known
  tokenAddress: string | null;
}

export interface Winning {
  amount: number;
  round: Round;
}

export interface TotalEarning {
  denomination: string;
  amount: number;
}

export interface UserRoundsData {
  farcasterId: string;
  roundsParticipated: RoundId[];
  winnings: Winning[];
  totalEarnings: TotalEarning[];
}

export type User = {
  fid: string;
  userName: string;
  profileImage: string;
};

import { IUserScoreRecord } from "./user-score-record.interface";

export interface IUserScoreRecordState{
    isGetting: boolean;
    scores: IUserScoreRecord [];
}
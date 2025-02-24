export interface User {
    userid?: number;
    username: string;
    email: string;
    password: string;
    height: number;
    mot_lvl: 'low' | 'medium' | 'high';
    avg_standing_hrs: number;
    times_moved: number;
}
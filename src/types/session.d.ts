// types/customSession.d.ts

import { SessionData } from 'express-session';

declare module 'express-session' {
    interface SessionData {
        userId: string;
    }
}

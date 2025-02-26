import { User } from "../models/User"; // Adjust path to your User model
import "express-session";

// Declares global types or extends existing ones
declare global  {
    // Extend the in-built global Express library
    namespace Express {

        // We make express user assume the structure of the User model
        interface User extends User {
        }

        interface SessionData {
            // user?: { id: string; role: string }; // Example: Adding a `user` object to the session
        }

        interface Request {
            session: SessionData;
            token: string
        }

        // interface Response {
        // }
    }

    // This explicitly extends the in-built global Window interface.
    interface Window {
        // myCustomProperty: string;
    }

}

type passportUser = string & User

declare module 'express-session' {
    export interface SessionData {
        passport?: {
            user: passportUser;
        };
    }
}


export {}; // Ensures TypeScript treats this as a module


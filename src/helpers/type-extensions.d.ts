import { User } from "../models/user"; // Adjust path to your User model
import "express-session";

// Declares global types or extends existing ones
declare global  {
    // Extend the in-built global Express library
    namespace Express {

        interface User {
            token: string;
            user: User
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

declare module 'express-session' {
    export interface SessionData {
        passport?: {
            token: string;
            user: any;
        };
    }
}


export {}; // Ensures TypeScript treats this as a module


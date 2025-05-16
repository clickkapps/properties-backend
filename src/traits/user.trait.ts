import {CreateUserParams} from "../types/auth.types";
import User from "../models/User";
import {generateKey} from "../helpers/utils";

export const autoCreateUser = async (args: CreateUserParams) => {

    const publicKey = generateKey()
    const secreteKey = generateKey()
    // const hashedPassword = await hashPassword(args.password || secreteKey);
    const [user, created] = await User.findOrCreate({
        where: {
            loginId: args.loginId,
        },
        defaults: {
            role: args.role,
            firstName: args.firstName,
            lastName: args.lastName,
            photo: args.photo,
            publicKey: publicKey,
            secreteKey: secreteKey,
            contactEmail: args.contactEmail || (args.loginIdType == 'email' ? args.loginId : undefined),
            contactPhone: args.contactPhone || (args.loginIdType == 'phone' ? args.loginId : undefined),
        }
    })


    if(!created) {

        // if the user was found and hence not created, check if the user's role has to be upgraded
        //ranks: 1. guest. 2. agent = (guest + agent), 3. admin = (guest + agent + admin)

        if(args.role) {
            if(user.role === "guest" && (args.role === "agent" || args.role === "admin")){
                await user.update({
                    role: args.role,
                })
            }
        }

        // if user role was not passed as argument automatically assign user role
        if(!args.role || args.role === "guest") {
            if(!(user.role === "agent" || user.role === "admin")) {
                await user.update({
                    role: "guest",
                })
            }
        }

    }


    return user

}
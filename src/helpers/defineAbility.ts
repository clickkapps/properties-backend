// abilities/defineAbility.ts
import {AbilityBuilder, MongoAbility, createMongoAbility} from '@casl/ability';
import Property from "../models/Property";
import User from "../models/User";
import {permissionActions, permissionSubjects} from "./constants";

// type Actions = 'manage' | 'create' | 'read' | 'update' | 'delete' | 'publish' | 'unpublish';
// type Subjects = 'User' | Property.name | 'all';

// export type AppAbility = MongoAbility<[Actions, Subjects]>;

export function defineAbilitiesFor(user: User) {
    const { can, cannot, build } = new AbilityBuilder(createMongoAbility);
    const role = user.role

    if (role === 'admin') {
        can(permissionActions.manage, permissionSubjects.all);
    } else if (role === 'agent') {
        can(permissionActions.create, permissionSubjects.properties);
        can(permissionActions.read, permissionSubjects.unpublishedProperties);
        can(permissionActions.read, permissionSubjects.publishedProperties);
        cannot(permissionActions.publish, permissionSubjects.properties);
        cannot(permissionActions.unpublish, permissionSubjects.properties);
    }

    return build();
}

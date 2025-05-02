import Property from "../models/Property";

export const permissionActions = {
    manage: "manage",
    create: "create",
    update: "update",
    delete: "delete",
    read: "read",
    publish: "publish",
    unpublish: "unpublish",
}

export const permissionSubjects = {
    all: "all",
    properties: "properties",
    unpublishedProperties: "unpublished properties",
    publishedProperties: "published properties",
    ads: "advertisements",
}

export const ghRegions = [
    "Greater Accra",
    "Ashanti",
    "Bono East",
    "Central",
    "Eastern",
    "Northern",
    "Savannah",
    "Oti",
    "Ahafo",
    "Upper East",
    "Upper West",
    "Western",
    "Western North",
    "Volta",
    "North East",
]
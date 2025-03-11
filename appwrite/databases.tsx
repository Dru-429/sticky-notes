import { collections, databases } from "./config";
import { ID } from "appwrite";

// interface Collection {
//     name: string;
//     dbId: string;
//     id: string;
// }

// const collections: Collection= [];

interface Database {
    [key: string]: {
        create: (payload: any, id?: string) => Promise<any>;
        update: (id: string, payload: any) => Promise<any>;
        delete: (id: string) => Promise<any>;
        get: (id: string) => Promise<any>;
        list: (queries?: any) => Promise<any>;
    };
}

const db: Database = {};

collections.forEach((collection) => {
    db[collection.name] = {

        create: async (payload: any, id: string = ID.unique()) => {
            return await databases.createDocument(
                collection.dbId,
                collection.id,
                id,
                payload
            );
        },

        update: async (id: string, payload: any) => {
            return await databases.updateDocument(
                collection.dbId,
                collection.id,
                id,
                payload
            );
        },

        delete: async (id: string) => {
            return await databases.deleteDocument(
                collection.dbId,
                collection.id,
                id
            );
        },

        get: async (id: string) => {
            return await databases.getDocument(
                collection.dbId,
                collection.id,
                id
            );
        },

        list: async (queries?: any) => {
            return await databases.listDocuments(
                collection.dbId,
                collection.id,
                queries
            );
        },

    };
});

export { db };
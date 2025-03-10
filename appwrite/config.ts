import { Client, Databases } from "appwrite"

const endpoint = process.env.NEXT_PUBLIC_APPWRITE_ENDPOINT;
const projectId = process.env.NEXT_PUBLIC_APPWRITE_PROJECT_ID;

if (!endpoint || !projectId) {
  throw new Error('Appwrite environment variables are not set.');
}

const client = new Client()
  .setEndpoint(endpoint)
  .setProject(projectId);
  
const databases = new Databases(client);
 
export { client, databases };
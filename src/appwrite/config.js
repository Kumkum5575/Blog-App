import conf from "../conf/conf";
import { Client, ID, TablesDB, Storage, Query } from "appwrite";

export class Service {
    client = new Client();
    tablesDB;
    bucket;

    constructor() {
        this.client
            .setEndpoint(conf.VITE_APPWRITE_URL)
            .setProject(conf.VITE_APPWRITE_PROJECT_ID);

        this.tablesDB = new TablesDB(this.client);
        this.bucket = new Storage(this.client);
    }

    // =========================
    // CREATE POST
    // =========================
    async createPost({
        title,
        slug,
        content,
        featuredImage,
        status,
        userId,
    }) {
        try {
            return await this.tablesDB.createRow({
                databaseId: conf.VITE_APPWRITE_DATABASE_ID,
                tableId: conf.VITE_APPWRITE_TABLE_ID,

                // Appwrite automatically creates unique Row ID
                rowId: ID.unique(),

                data: {
                    title,
                    slug,
                    content,
                    featuredImage,
                    status,
                    userId,
                },
            });
        } catch (err) {
            console.log("Create Post Error:", err);
            return false;
        }
    }

    // =========================
    // UPDATE POST
    // =========================
    async updatePost(
        rowId,
        {
            title,
            content,
            featuredImage,
            status,
        }
    ) {
        try {
            return await this.tablesDB.updateRow({
                databaseId: conf.VITE_APPWRITE_DATABASE_ID,
                tableId: conf.VITE_APPWRITE_TABLE_ID,

                // Use Appwrite Row ID
                rowId: rowId,

                data: {
                    title,
                    content,
                    featuredImage,
                    status,
                },
            });
        } catch (err) {
            console.log("Update Post Error:", err);
            return false;
        }
    }

    // =========================
    // DELETE POST
    // =========================
    async deletePost(rowId) {
        try {
            await this.tablesDB.deleteRow({
                databaseId: conf.VITE_APPWRITE_DATABASE_ID,
                tableId: conf.VITE_APPWRITE_TABLE_ID,
                rowId: rowId,
            });

            return true;
        } catch (err) {
            console.log("Delete Post Error:", err);
            return false;
        }
    }

    // =========================
    // GET SINGLE POST
    // =========================
    async getPost(rowId) {
        try {
            return await this.tablesDB.getRow({
                databaseId: conf.VITE_APPWRITE_DATABASE_ID,
                tableId: conf.VITE_APPWRITE_TABLE_ID,
                rowId: rowId,
            });
        } catch (err) {
            console.log("Get Post Error:", err);
            return false;
        }
    }

    // =========================
    // GET ALL ACTIVE POSTS
    // =========================
    async getPosts() {
        try {
            return await this.tablesDB.listRows({
                databaseId: conf.VITE_APPWRITE_DATABASE_ID,
                tableId: conf.VITE_APPWRITE_TABLE_ID,

                queries: [
                    Query.equal("status", "active"),
                ],
            });
        } catch (err) {
            console.log("Get Posts Error:", err);
            return false;
        }
    }

    // =========================
    // FILE UPLOAD
    // =========================
    async loadFile(file) {
        try {
            return await this.bucket.createFile({
                bucketId: conf.VITE_APPWRITE_BUCKET_ID,
                fileId: ID.unique(),
                file: file,
            });
        } catch (err) {
            console.log("File Upload Error:", err);
            return false;
        }
    }

    // =========================
    // DELETE FILE
    // =========================
    async deleteFile(fileId) {
        try {
            if (!fileId) {
                return false;
            }

            return await this.bucket.deleteFile({
                bucketId: conf.VITE_APPWRITE_BUCKET_ID,
                fileId: fileId,
            });
        } catch (err) {
            console.log("Delete File Error:", err);
            return false;
        }
    }

    // =========================
    // FILE PREVIEW
    // =========================
    getFilePreview(fileId) {
        if (!fileId) {
            return "";
        }

        return this.bucket.getFileView({
            bucketId: conf.VITE_APPWRITE_BUCKET_ID,
            fileId: fileId,
        });
    }
}

const service = new Service();

export default service;
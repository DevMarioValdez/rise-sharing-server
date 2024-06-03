import { injectable } from "inversify";
import mongoose from "mongoose";

@injectable()
export class DBContext {
    private _db: typeof mongoose;
    constructor() {}
    async connect() {
        this._db = await mongoose.connect(process.env.DB_URI || "");

        console.log("connected to DB");
    }
}

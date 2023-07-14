import mongoose from "mongoose";

mongoose.connect("mongodb+srv://feliperold:NosRlXVhG9JiS1wG@apinode.oeop6ju.mongodb.net/apinode");
const db = mongoose.connection;
export default db;
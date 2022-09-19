import mongoose from "mongoose";
//wetube is my db's name ->
mongoose.connect(process.env.DB_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const db = mongoose.connection;

const handleOpen = () => console.log("✅ Connected to DB!");
const handleError = (error) => console.log("❌ DB Error", error);

db.on("error", handleError); // error could be many times(like onclick event) so use on()
db.once("open", handleOpen); // once() is only once happen

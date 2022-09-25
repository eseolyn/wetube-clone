import express from "express";
import morgan from "morgan";
import session from "express-session";
import MongoStore from "connect-mongo";
import rootRouter from "./routers/rootRouter";
import userRouter from "./routers/userRouter";
import videoRouter from "./routers/videoRouter";
import { localsMiddleware } from "./middlewares";

const app = express();
const logger = morgan("dev");

app.set("view engine", "pug");
app.set("views", process.cwd() + "/src/views");
app.use(logger);
app.use(express.urlencoded({ extended: true }));

app.use(
  session({
    secret: process.env.COOKIE_SECRET,
    resave: false,
    saveUninitialized: false,
    // cookie:{
    //   maxAge:  //set expire : milliseconds (1/1000)
    // }
    store: MongoStore.create({ mongoUrl: process.env.DB_URL }),
  })
);

app.use(localsMiddleware);
app.use("/uploads", express.static("uploads")); // all in the expression!! attention it!!!
app.use("/static", express.static("assets")); // all in the expression!! attention it!!!
// tell to server, put the contents of the uploads&assets folder accessible through /static url.
app.use("/", rootRouter);
app.use("/users", userRouter);
app.use("/videos", videoRouter);
// app.use(notFoundMiddleware);

export default app;

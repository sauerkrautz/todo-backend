import express from "express";
import session from "express-session";
import cors from "cors";
import SequlizeStore from "connect-session-sequelize";

import db from "./config/database.js";
import Users from "./models/UserModel.js";
import Todos from "./models/TodoModel.js";
import UserRoute from "./routes/UserRouter.js";
import AuthRoute from "./routes/AuthRouter.js";
import TodosRoute from "./routes/TodosRouter.js";

const sessionStore = SequlizeStore(session.Store);
const store = new sessionStore({
  db: db,
});

(async () => {
  db.sync();
})();

const app = express();

app.use(
  cors({
    credentials: true,
    origin: "localhost:3000",
  })
);

app.use(
  session({
    secret: "something",
    resave: false,
    store: store,
    saveUninitialized: true,
    cookie: {
      secure: "auto",
    },
  })
);

app.use(
  express.urlencoded({
    extended: true,
  })
);
app.use(express.json());

app.use(UserRoute);

app.use(TodosRoute);

app.use(AuthRoute);

app.listen(5000, () => {
  console.log("server is up and running...");
});

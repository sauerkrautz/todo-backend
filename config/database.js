import { Sequelize } from "sequelize";

const db = new Sequelize("todo_list", "root", "", {
  host: "https://sauerkrautz-todo-backend.herokuapp.com/",
  dialect: "mysql",
});

export default db;

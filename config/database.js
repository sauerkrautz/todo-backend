import { Sequelize } from "sequelize";

const db = new Sequelize("todo_list", "root", "", {
  host: "localhost",
  dialect: "mysql",
});

// const db = new Sequelize("todo_list", "epiz_32670876", "Ybafa6q69g", {
//   host: "	sql204.epizy.com",
//   dialect: "mysql",
// });

export default db;

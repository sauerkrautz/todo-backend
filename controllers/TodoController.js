import Todos from "../models/TodoModel.js";
import Users from "../models/UserModel.js";

const getTodos = async (req, res) => {
  try {
    let response;

    if (req.role === "admin") {
      response = await Todos.findAll({
        attributes: ["uuid", "id", "text", "date", "crazy", "userId"],
        include: [
          {
            model: Users,
            attributes: ["uuid", "id", "name", "email", "role"],
          },
        ],
      });
    } else {
      response = await Todos.findAll({
        attributes: ["uuid", "id", "text", "date", "crazy", "userId"],
        where: {
          userId: req.userId,
        },
        include: [
          {
            model: Users,
            attributes: ["uuid", "id", "name", "email", "role"],
          },
        ],
      });
    }
    res.status(200).json(response);
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};

const createTodos = async (req, res) => {
  const date = new Date();
  const time = `${date.toLocaleTimeString()} ${date.toLocaleDateString()}`;
  const { text } = req.body;
  console.log(`${req.userId} this is userId`);
  try {
    await Todos.create({
      text,
      userId: req.userId,
      date: time,
      crazy: false,
    });
    res.status(200).json({ msg: "todo created" });
  } catch (error) {
    res.status(400).json({ msg: error.message });
  }
};

const deleteTodos = async (req, res) => {
  try {
    await Todos.destroy({
      where: {
        uuid: req.params.id,
      },
    });
    res.status(200).json({ msg: "todo deleted" });
  } catch (error) {
    res.status(400).json({ msg: error.message });
  }
};

export { getTodos, createTodos, deleteTodos };

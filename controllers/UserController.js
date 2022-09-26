import Users from "../models/UserModel.js";
import argon2 from "argon2";

const getUsers = async (req, res) => {
  try {
    const response = await Users.findAll();
    console.log(req.role + "this is role");
    console.log(req.userId + "this is userId");
    res.status(200).json(response);
  } catch (error) {
    res.status(400).json({ msg: error.message });
  }
};

const getUserById = async (req, res) => {
  try {
    const response = await Users.findOne({
      where: {
        uuid: req.params.id,
      },
    });
    res.status(200).json(response);
  } catch (error) {
    res.status(400).json({ msg: error.message });
  }
};

const createUser = async (req, res) => {
  const users = await Users.findAll();
  const duplicate = users.find((e) => req.body.email === e.email);
  if (duplicate)
    return res.status(400).json({ msg: "email has already been taken" });

  const { name, email, password, role } = req.body;
  const hashedpassword = await argon2.hash(password);
  try {
    await Users.create({
      name,
      email,
      password: hashedpassword,
      role,
    });
    res.status(200).json({ msg: "user created" });
  } catch (error) {
    res.status(400).json({ msg: error.message });
  }
};

const updateUserProfile = async (req, res) => {
  const { name, email } = req.body;

  try {
    const user = await Users.findOne({
      where: {
        uuid: req.params.id,
      },
    });

    if (!user) res.status(404).json({ msg: "user not found" });

    await Users.update(
      {
        name,
        email,
      },
      {
        where: {
          uuid: req.params.id,
        },
      }
    );
    res.status(200).json({ msg: "user updated" });
  } catch (error) {
    res.status(400).json({ msg: error.message });
  }
};

const deleteUser = async (req, res) => {
  try {
    await Users.destroy({
      where: {
        uuid: req.params.id,
      },
    });
    res.status(200).json({ msg: "user deleted" });
  } catch (error) {
    res.status(400).json({ msg: error.message });
  }
};

export { getUsers, getUserById, createUser, updateUserProfile, deleteUser };

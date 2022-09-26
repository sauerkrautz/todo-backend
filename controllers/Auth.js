import argon2 from "argon2";
import Users from "../models/UserModel.js";

const login = async (req, res) => {
  const user = await Users.findOne({
    where: {
      email: req.body.email,
    },
  });

  if (!user) return res.status(404).json({ msg: "user not found" });

  const { uuid, email, password } = user;

  const match = await argon2.verify(password, req.body.password);

  if (!match || email !== req.body.email)
    return res.status(400).json({ msg: "email or password does nost match" });

  req.session.userId = uuid;

  res.status(200).json(user);
};

const checkLogin = async (req, res) => {
  if (!req.session.userId)
    return res.status(401).json({ msg: "please login to your account" });

  const user = await Users.findOne({
    where: {
      uuid: req.session.userId,
    },
  });

  if (!user) return res.status(404).json({ msg: "user not found" });

  res.status(200).json(user);
};

const logout = async (req, res) => {
  req.session.destroy((error) => {
    if (error) return res.status(400).json({ msg: error.message });
    res.status(200).json({ msg: "logged out" });
  });
};

export { login, checkLogin, logout };

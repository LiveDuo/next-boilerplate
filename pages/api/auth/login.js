import { connectToDatabase } from "../../../config/database";
import { withReq } from "../../../config/middleware";

import Joi from "joi";

import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

const privateKey = process.env.JWT_PRIVATE_KEY;

const schema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().min(8).required()
});

const handler = async (req, res) => {
  const { db } = await connectToDatabase();

  const { error } = schema.validate(req.body);
  if (error) {
    res.status(400).end(error.details[0].message);
    return;
  }

  const { email, password } = req.body;
  const user = await db.collection("users").findOne({ email });
  if (!user) {
    res.status(404).end("User not found");
    return;
  }

  const match = await bcrypt.compare(password, user.password);
  if (!match) {
    res.status(403).end("Password invalid");
    return;
  }
  const token = jwt.sign({ userId: user._id }, privateKey);
  res.json({ token });
};

export default withReq(handler, "POST");

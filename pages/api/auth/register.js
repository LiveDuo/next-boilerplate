import { connectToDatabase } from "../../../config/database";
import { withReq } from "../../../config/middleware";

import Joi from "joi";

import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

const privateKey = process.env.JWT_PRIVATE_KEY;

const saltRounds = 11;

const schema = Joi.object({
  name: Joi.string().required(),
  surname: Joi.string().required(),
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

  const { name, surname, email, password } = req.body;

  const user = await db.collection("users").findOne({ email });
  if (user) {
    res.status(422).end("User already exists");
    return;
  }
  const hash = await bcrypt.hash(password, saltRounds);
  const inserted = await db
    .collection("users")
    .insertOne({ name, surname, email, password: hash });
  const token = jwt.sign({ userId: inserted.insertedId }, privateKey);
  res.json({ token });
};

export default withReq(handler, "POST");

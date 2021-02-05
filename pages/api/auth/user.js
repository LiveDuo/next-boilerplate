import { connectToDatabase } from "../../../config/database";
import { withReq, withAuth } from "../../../config/middleware";

import { ObjectId } from "mongodb";

const handler = async (req, res) => {
  const { db } = await connectToDatabase();

  const user = await db
    .collection("users")
    .findOne({ _id: ObjectId(req.userId) });
  const { name, surname, email, subscriptionStatus } = user;
  res.json({ name, surname, email, subscriptionStatus });
};

export default withReq(withAuth(handler), "GET");

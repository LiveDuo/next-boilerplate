import { connectToDatabase } from "../../../config/database";
import { withReq, withAuth } from "../../../config/middleware";

import { ObjectId } from "mongodb";

// import stripeLib from "stripe";
const stripeLib = require("stripe");
const stripe = stripeLib(process.env.STRIPE_SECRET_KEY);

// configure products / needs to configure the portal first
const handler = async (req, res) => {
  const { db } = await connectToDatabase();

  let { customerId } = req.query;
  // req query returns undefined as string
  if (customerId === "undefined") {
    const user = await db
      .collection("users")
      .findOne({ _id: ObjectId(req.userId) });
    customerId = user.customerId;
  }

  const url = process.env.FRONTEND_URL;
  const session = await stripe.billingPortal.sessions.create({
    customer: customerId,
    return_url: url + "/app/home"
  });

  res.json({ url: session.url });
};

export default withReq(withAuth(handler), "GET");

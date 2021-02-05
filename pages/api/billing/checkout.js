import { connectToDatabase } from "../../../config/database";
import { withReq, withAuth } from "../../../config/middleware";

import { ObjectId } from "mongodb";

// import stripeLib from "stripe";
const stripeLib = require("stripe");
const stripe = stripeLib(process.env.STRIPE_SECRET_KEY);

const line_items = [
  {
    price: process.env.STRIPE_PRICE_ID,
    quantity: 1
  }
];

const handler = async (req, res) => {
  const { db } = await connectToDatabase();

  const user = await db
    .collection("users")
    .findOne({ _id: ObjectId(req.userId) });

  const url = process.env.FRONTEND_URL;
  const session = await stripe.checkout.sessions.create({
    ...(user.customerId
      ? { customer: user.customerId }
      : { customer_email: user.email }),
    mode: "subscription",
    payment_method_types: ["card"],
    line_items,
    success_url: url + "/app/home?session_id={CHECKOUT_SESSION_ID}",
    cancel_url: url + "/app/home?session_id=null"
  });

  res.json({ sessionId: session.id });
};

export default withReq(withAuth(handler), "GET");

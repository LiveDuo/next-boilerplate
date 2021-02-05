import { withReq, withAuth } from "../../../config/middleware";

// import stripeLib from "stripe";
const stripeLib = require("stripe");
const stripe = stripeLib(process.env.STRIPE_SECRET_KEY);

const handler = async (req, res) => {
  const { sessionId } = req.query;
  const session = await stripe.checkout.sessions.retrieve(sessionId);
  res.json(session);
};

export default withReq(withAuth(handler), "GET");

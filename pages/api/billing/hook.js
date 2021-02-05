import { connectToDatabase } from "../../../config/database";
import { withReq } from "../../../config/middleware";

import { buffer } from "micro";

const stripeLib = require("stripe");
const stripe = stripeLib(process.env.STRIPE_SECRET_KEY);

// https://stripe.com/docs/billing/subscriptions/checkout#webhooks

const handler = async (req, res) => {
  const buf = await buffer(req);

  let event;
  let signature = req.headers["stripe-signature"];
  const secret = process.env.STRIPE_WEBHOOK_SECRET;
  try {
    event = stripe.webhooks.constructEvent(buf.toString(), signature, secret);
  } catch (err) {
    res.status(400).end("Signature verification failed");
    return;
  }

  switch (event.type) {
    case "checkout.session.completed": {
      const { db } = await connectToDatabase();
      const { customer, customer_email } = event.data.object;

      await db.collection("users").updateOne(
        { email: customer_email },
        {
          $set: {
            customerId: customer,
            // subscriptionId: subscription,
            subscriptionStatus: "active"
          }
        }
      );
      res.end("Success");
      break;
    }
    case "customer.subscription.updated":
    case "customer.subscription.deleted": {
      const { db } = await connectToDatabase();
      const { customer, status } = event.data.object;
      await db.collection("users").updateOne(
        { customerId: customer },
        {
          $set: {
            subscriptionStatus: status
            // subscriptionPlan: subscription.object.status
          }
        }
      );
      res.end("Success");
      break;
    }
    default:
      res.status(400).end("Unhandled event type");
  }
};

export default withReq(handler, "POST");

const config = {
  api: {
    bodyParser: false
  }
};
export { config };

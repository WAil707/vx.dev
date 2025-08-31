import { buffer } from "micro";
import Stripe from "stripe";
import { PrismaClient } from "@prisma/client";

export const config = {
  api: {
    bodyParser: false,
  },
};

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY || "", {
  apiVersion: "2022-11-15",
});
const prisma = new PrismaClient();

export default async function handler(req: any, res: any) {
  if (req.method !== "POST") return res.status(405).end("Method Not Allowed");
  const sig = req.headers["stripe-signature"];
  const buf = await buffer(req);
  let event: Stripe.Event;

  try {
    event = stripe.webhooks.constructEvent(
      buf.toString(),
      sig!,
      process.env.STRIPE_WEBHOOK_SECRET!
    );
  } catch (err) {
    console.error("Webhook signature verification failed.", err);
    return res.status(400).send(`Webhook Error: ${err}`);
  }

  // Handle the event
  switch (event.type) {
    case "customer.created":
      // Example: sync stripe customer to your DB
      break;
    case "invoice.payment_succeeded":
      // handle successful payment
      break;
    case "customer.subscription.updated":
    case "customer.subscription.deleted":
      // handle subscription changes
      break;
    default:
      console.log(`Unhandled event type ${event.type}`);
  }

  res.json({ received: true });
}
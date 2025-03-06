import OrderConfirmationEmail from '@/emails/index';
import { NextResponse } from 'next/server';
import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(req) {
  try {
    const { email, orderDetails } = await req.json();

    // Log the orderDetails to debug
    console.log("Order Details:", orderDetails);

    // Log the email address
    console.log("Sending email to:", email);

    const data = await resend.emails.send({
      from: 'Royalspoon Foods & Events <onboarding@resend.dev>', // Replace with your verified domain
      to: [email],
      subject: 'Order Confirmation',
      react: OrderConfirmationEmail({ order: orderDetails }), // Pass orderDetails as "order"
    });

    console.log("Resend API Response:", data);

    return NextResponse.json({data});
  } catch (error) {
    console.error('Error sending email:', error);
    return NextResponse.json({ error }, { status: 500 });
  }
}
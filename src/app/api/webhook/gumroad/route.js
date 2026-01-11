import { NextResponse } from 'next/server';
import dbConnect from '@/lib/dbConnect';
import User from '@/models/User';

export async function POST(req) {
  try {
    // Gumroad sends data as form-urlencoded, so we parse it differently
    const formData = await req.formData();
    const data = Object.fromEntries(formData);

    // 1. Log the data so you can see it in your terminal
    console.log("🔔 GUMROAD PING RECEIVED");
    console.log("User Email:", data.email);
    console.log("Product:", data.product_name);
    console.log("Sale ID:", data.sale_id);

    // 2. Security Check (Optional but recommended)
    // You can check data.seller_id to ensure it matches your Gumroad ID
    
    await dbConnect();

    // 3. Update your User
    // Gumroad sends 'email'. We use that to find your Google User.
    const updatedUser = await User.findOneAndUpdate(
      { email: data.email },
      { 
        isPro: true,
        gumroadId: data.sale_id // Store this for reference
      },
      { new: true }
    );

    if (updatedUser) {
      console.log(`✅ Success: ${data.email} is now PRO`);
    } else {
      console.log(`⚠️ User ${data.email} not found in MongoDB`);
    }

    return NextResponse.json({ received: true }, { status: 200 });
  } catch (err) {
    console.error("❌ Webhook Error:", err.message);
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
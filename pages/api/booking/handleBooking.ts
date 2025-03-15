import type { NextApiRequest, NextApiResponse } from "next";
import { sendEmail } from "@calcom/lib/server/emails";

interface BookingRequest {
  name: string;
  email: string;
  phone: string;
  clinic: string;
  date: string;
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method not allowed" });
  }

  try {
    const { name, email, phone, clinic, date }: BookingRequest = req.body;

    // Validate required fields
    if (!name || !email || !phone || !clinic || !date) {
      return res.status(400).json({ message: "Missing required fields" });
    }

    // Here you would typically:
    // 1. Save the booking to your database
    // 2. Send confirmation emails
    // 3. Handle any other business logic

    // Send confirmation email to the user
    await sendEmail({
      to: email,
      subject: "Confirmación de Cita",
      html: `
        <h1>¡Gracias por agendar tu cita!</h1>
        <p>Hola ${name},</p>
        <p>Tu cita ha sido confirmada para:</p>
        <ul>
          <li>Fecha: ${new Date(date).toLocaleString("es-ES")}</li>
          <li>Clínica: ${clinic}</li>
        </ul>
        <p>Si necesitas cambiar o cancelar tu cita, por favor contáctanos.</p>
      `,
    });

    return res.status(200).json({ message: "Booking successful" });
  } catch (error) {
    console.error("Booking error:", error);
    return res.status(500).json({ message: "Error processing booking" });
  }
}

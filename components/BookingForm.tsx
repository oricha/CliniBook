import { useState } from "react";
import { Button, Input, Select } from "@calcom/ui";
import { toast } from "@calcom/lib/notification";
import type { ChangeEvent } from "react";

const clinics = [
  { id: "clinic1", name: "Clínica Dental Barcelona" },
  { id: "clinic2", name: "Centro Médico Madrid" },
];

export default function BookingForm() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [clinic, setClinic] = useState(clinics[0].id);
  const [date, setDate] = useState("");

  const handleBooking = async () => {
    if (!name || !email || !phone || !date) {
      toast("Todos los campos son obligatorios", "error");
      return;
    }

    try {
      const response = await fetch("/api/booking/handleBooking", {
        method: "POST",
        body: JSON.stringify({ name, email, phone, clinic, date }),
        headers: { "Content-Type": "application/json" }
      });

      if (!response.ok) {
        throw new Error(await response.text());
      }

      toast(`Cita agendada para ${name} en ${date}`, "success");
      // Reset form
      setName("");
      setEmail("");
      setPhone("");
      setDate("");
      setClinic(clinics[0].id);

    } catch (error) {
      console.error("Booking error:", error);
      toast("Error al procesar la reserva", "error");
    }
  };

  return (
    <div className="rounded-lg bg-white p-4 shadow-md">
      <h2 className="mb-2 text-lg font-semibold">Agendar Cita</h2>

      <Select
        value={clinic}
        onChange={(value) => value && setClinic(value)}
        className="mb-4"
      >
        {clinics.map((clinic) => (
          <option key={clinic.id} value={clinic.id}>
            {clinic.name}
          </option>
        ))}
      </Select>

      <Input
        type="text"
        placeholder="Nombre"
        value={name}
        onChange={(e: ChangeEvent<HTMLInputElement>) => setName(e.target.value)}
        className="mb-4"
      />
      <Input
        type="email"
        placeholder="Correo Electrónico"
        value={email}
        onChange={(e: ChangeEvent<HTMLInputElement>) => setEmail(e.target.value)}
        className="mb-4"
      />
      <Input
        type="tel"
        placeholder="Teléfono"
        value={phone}
        onChange={(e: ChangeEvent<HTMLInputElement>) => setPhone(e.target.value)}
        className="mb-4"
      />
      <Input
        type="datetime-local"
        placeholder="Fecha y Hora"
        value={date}
        onChange={(e: ChangeEvent<HTMLInputElement>) => setDate(e.target.value)}
        className="mb-4"
      />

      <Button onClick={handleBooking} className="mt-2">
        Reservar Cita
      </Button>
    </div>
  );
}

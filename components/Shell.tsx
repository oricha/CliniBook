import BookingForm from "@calcom/app-store/clinic-booking/components/BookingForm";

return (
  <>
    <Navigation />
    <main className="flex flex-col items-center">
      <BookingForm />  {/* 📅 Aquí agregamos el formulario de reservas */}
    </main>
    <Footer />
  </>
);
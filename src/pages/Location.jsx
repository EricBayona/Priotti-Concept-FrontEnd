import React from "react";

function Location() {
  return (
    <main className="min-h-screen flex flex-col items-center justify-center bg-gray-50 px-4 py-10">
      <h1 className="text-3xl font-semibold text-gray-800 mb-6">
        📍 Nuestra Ubicación
      </h1>

      <div className="w-full max-w-4xl aspect-video rounded-xl overflow-hidden shadow-lg border border-gray-200">
        <iframe
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d28328.983383694223!2d-65.61562659999997!3d-27.4342796!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x9423c467bb17a975%3A0x7c7b2c3cf7f03db7!2sAguilares%2C%20Tucum%C3%A1n!5e0!3m2!1ses-419!2sar!4v1759197783559!5m2!1ses-419!2sar"
          className="w-full h-full"
          style={{ border: 0 }}
          allowFullScreen
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
        />
      </div>

      <p className="mt-6 text-gray-600 text-center max-w-xl">
        Estamos ubicados en <strong>Aguilares, Tucumán</strong>. Acercate a
        conocernos o consultanos por WhatsApp para coordinar una visita.
      </p>
    </main>
  );
}

export default Location;

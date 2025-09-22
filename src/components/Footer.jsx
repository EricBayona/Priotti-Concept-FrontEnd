import React from "react";

export default function Footer() {
  return (
    <footer className="border-t border-neutral-200">
      <div className="max-w-6xl mx-auto px-4 py-6 text-sm text-neutral-600 flex flex-col sm:flex-row items-center justify-between gap-2">
        <p>Copyright © {new Date().getFullYear()} Priotti Concept</p>
        <p className="text-xs">Todos los derechos reservados</p>
      </div>
    </footer>
  );
}

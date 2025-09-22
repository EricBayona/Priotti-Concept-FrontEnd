import React from "react";
import { Link } from "react-router-dom";
import temporadaImg from "../assets/Maria.jpg";

export default function Home() {
  return (
    <section className="max-w-6xl mx-auto px-4 py-10">
      <div className="grid md:grid-cols-2 gap-8 items-center">
        <div className="space-y-4">
          <h1 className="text-3xl md:text-4xl font-bold">Priotti Concept</h1>
          <p className="text-neutral-600">
            No diseñamos para la mirada ajena. Seleccionamos para quienes
            entienden que el estilo es una extensión de la convicción.
          </p>
          <Link
            to="/productos"
            className="inline-block px-4 py-2 rounded-xl border border-neutral-900 hover:bg-neutral-900 hover:text-white transition"
          >
            Ver catálogo
          </Link>
        </div>
        <div className="flex justify-center md:justify-end">
          <img
            src={temporadaImg}
            className="w-full md:w-10/12 lg:w-9/12 h-auto max-h-[500px] object-cover rounded-2xl shadow-lg"
            alt="Nueva Temporada"
          />
        </div>
      </div>
      <div className="w-fit mx-auto mt-7 py-5 px-5 bg-white  rounded-xl ">
        <Link to="/productos" className="text-base text-center">
          Colecciones Primavera Verano 2025
        </Link>
      </div>
    </section>
  );
}

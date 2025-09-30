import React, { useState } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import api from "../services/api";

export default function Register() {
  const [formData, setFormData] = useState({
    first_name: "",
    last_name: "",
    email: "",
    birthDate: "",
    password: "",
    repitPassword: "",
    acepta: false, // 👉 sigue en el front para manejar el botón
  });

  const navigate = useNavigate();

  const [errors, setErrors] = useState([]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrors([]);
    if (formData.password !== formData.repitPassword) {
      setErrors(["Las contraseñas no coinciden"]);
      return;
    }

    try {
      // 👉 Elimino "acepta" y "repitPassword" del objeto para no mandarlo al back
      const dataToSend = { ...formData };
      delete dataToSend.acepta;
      delete dataToSend.repitPassword;

      const { data } = await api.post("/api/auth/register", dataToSend, {
        headers: { "Content-Type": "application/json" },
      });
      if (data.status === "ok") {
        // reseteo el form
        setFormData({
          first_name: "",
          last_name: "",
          email: "",
          birthDate: "",
          password: "",
          acepta: false,
        });
        toast.success("Registro exitoso 🎉");
        setTimeout(() => {
          navigate("/login");
        }, 2500);
      } else {
        // si el back devuelve un array de errores de validación
        console.log({ dataError: data.errors });

        if (Array.isArray(data.errors)) {
          setErrors(data.errors.map((err) => err.message));
        } else {
          setErrors([data.message || "Error en el registro"]);
        }
      }
    } catch (error) {
      console.error("Error de conexión:", error);
      setErrors(["No se pudo conectar al servidor"]);
    }
  };

  return (
    <main className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-md bg-white rounded-2xl shadow-md p-8 space-y-6"
      >
        <h1 className="text-2xl font-semibold text-gray-800 text-center">
          Registro
        </h1>

        <div className="grid grid-cols-1 gap-4">
          <div>
            <label
              htmlFor="first_name"
              className="block text-sm font-medium text-gray-700"
            >
              Nombre
            </label>
            <input
              id="first_name"
              name="first_name"
              type="text"
              placeholder="Ingrese su nombre"
              value={formData.first_name}
              onChange={handleChange}
              className="mt-1 block w-full px-4 py-2 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-indigo-400"
              required
            />
          </div>

          <div>
            <label
              htmlFor="last_name"
              className="block text-sm font-medium text-gray-700"
            >
              Apellido
            </label>
            <input
              id="last_name"
              name="last_name"
              type="text"
              placeholder="Ingrese su apellido"
              value={formData.last_name}
              onChange={handleChange}
              className="mt-1 block w-full px-4 py-2 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-indigo-400"
              required
            />
          </div>

          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700"
            >
              Email
            </label>
            <input
              id="email"
              name="email"
              type="email"
              placeholder="ejemplo@correo.com"
              value={formData.email}
              onChange={handleChange}
              className="mt-1 block w-full px-4 py-2 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-indigo-400"
              required
            />
          </div>

          <div>
            <label
              htmlFor="birthDate"
              className="block text-sm font-medium text-gray-700"
            >
              Fecha de nacimiento
            </label>
            <input
              id="birthDate"
              name="birthDate"
              type="date"
              value={formData.birthDate}
              onChange={handleChange}
              className="mt-1 block w-full px-4 py-2 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-indigo-400"
            />
          </div>

          <div>
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-700"
            >
              Contraseña
            </label>
            <input
              id="password"
              name="password"
              type="password"
              placeholder="********"
              value={formData.password}
              onChange={handleChange}
              className="mt-1 block w-full px-4 py-2 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-indigo-400"
              required
            />
          </div>
          <div>
            <label
              htmlFor="repitPassword"
              className="block text-sm font-medium text-gray-700"
            >
              Repetir Contraseña
            </label>
            <input
              id="repitPassword"
              name="repitPassword"
              type="password"
              placeholder="********"
              value={formData.repitPassword}
              onChange={handleChange}
              className="mt-1 block w-full px-4 py-2 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-indigo-400"
              required
            />
            {formData.password !== formData.repitPassword && (
              <p className="text-sm text-red-600 mt-1">
                ⚠️ Las contraseñas no coinciden
              </p>
            )}
          </div>

          <div className="flex items-center space-x-2">
            <input
              id="acepta"
              name="acepta"
              type="checkbox"
              checked={formData.acepta}
              onChange={handleChange}
              className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
            />
            <label htmlFor="acepta" className="text-sm text-gray-600">
              Acepto las bases y condiciones
            </label>
          </div>
        </div>

        {errors.length > 0 && (
          <div className="bg-red-50 border border-red-300 text-red-700 p-3 rounded-lg space-y-1">
            {errors.map((err, idx) => (
              <p key={idx} className="text-sm">
                ⚠️ {err}
              </p>
            ))}
          </div>
        )}

        <button
          type="submit"
          disabled={!formData.acepta}
          className={`w-full py-2 rounded-lg text-white font-medium transition ${
            formData.acepta
              ? "bg-indigo-600 hover:bg-indigo-700"
              : "bg-gray-400 cursor-not-allowed"
          }`}
        >
          Registrarse
        </button>

        <p className="text-center text-sm text-gray-500">
          ¿Ya tenés cuenta?{" "}
          <a href="/login" className="text-indigo-600 underline">
            Ingresar
          </a>
        </p>
      </form>
    </main>
  );
}

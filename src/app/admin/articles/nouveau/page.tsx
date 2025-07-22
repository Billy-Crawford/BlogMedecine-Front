/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import axios from "../../../../../lib/axios";
import RequireAuth from "@/components/RequireAuth";

type Categorie = { id: number; nom: string };

export default function CreateArticlePage() {
  const router = useRouter();
  const [titre, setTitre] = useState("");
  const [contenu, setContenu] = useState("");
  const [categorieId, setCategorieId] = useState<number | null>(null);
  const [categories, setCategories] = useState<Categorie[]>([]);
  const [image, setImage] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // ✅ Récupération des catégories
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const res = await axios.get("categories/");
        setCategories(res.data);
      } catch (err) {
        console.error("Erreur de récupération des catégories");
      }
    };
    fetchCategories();
  }, []);

  // ✅ Soumission du formulaire
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    if (!categorieId) {
      setError("Veuillez sélectionner une catégorie");
      setLoading(false);
      return;
    }

    try {
      const formData = new FormData();
      formData.append("titre", titre);
      formData.append("contenu", contenu);
      formData.append("categorie", String(categorieId));
      formData.append("statut", "publie"); // ⚠️ Confirmer dans le backend
      if (image) {
        formData.append("image", image);
      }

      const token = localStorage.getItem("access");

      await axios.post("admin/articles/", formData, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        },
      });

      router.push("/admin/articles");
    } catch (err: any) {
      console.error("Erreur détaillée:", err.response?.data || err);
      const errMsg =
        err.response?.data?.detail ||
        err.response?.data?.message ||
        "Erreur lors de l'enregistrement";
      setError(errMsg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <RequireAuth>
      <div className="max-w-2xl mx-auto py-10 px-4">
        <h1 className="text-2xl font-bold mb-6">✍️ Nouvel article</h1>

        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            value={titre}
            onChange={(e) => setTitre(e.target.value)}
            placeholder="Titre de l'article"
            className="w-full border border-gray-300 px-4 py-2 rounded"
            required
          />

          <select
            value={categorieId ?? ""}
            onChange={(e) => setCategorieId(Number(e.target.value))}
            className="w-full border border-gray-300 px-4 py-2 rounded"
            required
          >
            <option value="">Choisir une catégorie</option>
            {categories.map((cat) => (
              <option key={cat.id} value={cat.id}>
                {cat.nom}
              </option>
            ))}
          </select>

          <textarea
            value={contenu}
            onChange={(e) => setContenu(e.target.value)}
            placeholder="Contenu de l'article"
            rows={6}
            className="w-full border border-gray-300 px-4 py-2 rounded"
            required
          />

          <input
            type="file"
            accept="image/*"
            onChange={(e) => {
              if (e.target.files && e.target.files[0]) {
                setImage(e.target.files[0]);
              }
            }}
            className="w-full border border-gray-300 px-4 py-2 rounded"
            required
          />

          {error && <p className="text-red-500 text-sm">{error}</p>}

          <button
            type="submit"
            disabled={loading}
            className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
          >
            {loading ? "Enregistrement..." : "Créer l’article"}
          </button>
        </form>
      </div>
    </RequireAuth>
  );
}

import type { Metadata } from "next";
import MapaObjetivos from "@/features/curso/components/MapaObjetivos";

export const metadata: Metadata = {
  title: "Objetivos do exame",
  description:
    "Os 15 objetivos oficiais do CompTIA CySA+ CS0-004, o peso de cada domínio e o que o curso já cobre.",
};

export default function ObjetivosPage() {
  return <MapaObjetivos />;
}

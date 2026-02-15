import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Joueurs",
};

export default function PlayersPage() {
  return (
    <>
      <Breadcrumb pageName="Joueurs" />

      <p>A IMPLEMENTER</p>
    </>
  );
}

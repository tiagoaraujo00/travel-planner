import { Plus } from "lucide-react";
import { useState } from "react";
import { CreateActivityModal } from "./create-activity-modal";
import { ImportantLinks } from "./important-links";
import Guests from "./guests";
import { Activities } from "./activities";
import { Header } from "./header";

export function TripDetailsPage() {
  const [isCreateActivityModalOpen, setIsCreateActivityModalopen] = useState(false);

  const openCreateActivityModal = () => {
    setIsCreateActivityModalopen(true);
  };
  const closeCreateActivityModal = () => {
    setIsCreateActivityModalopen(false);
  };

  return (
    <div className="max-w-6xl px-24 py-10 mx-auto space-y-8">
      <Header />
      <main className="flex gap-16 px-4">
        <div className="flex-1 space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="text-3xl font-semibold">Atividades</h2>
            <button
              onClick={openCreateActivityModal}
              className="flex items-center gap-2 px-5 py-2 font-medium rounded-lg bg-lime-300 text-lime-950 hover:bg-lime-400"
            >
              <Plus className="size-5" />
              Cadastrar atividade
            </button>
          </div>
          <Activities />
        </div>
        <div className="space-y-6 w-80">
          <ImportantLinks />
          <div className="w-full h-px bg-zinc-800" />
          <Guests />
        </div>
      </main>
      {isCreateActivityModalOpen && (
        <CreateActivityModal
          closeCreateActivityModal={closeCreateActivityModal}
        />
      )}
    </div>
  );
}

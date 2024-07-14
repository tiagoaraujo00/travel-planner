import { AtSign, Plus, X } from "lucide-react";
import { Button } from "../../components/button";

interface InviteGuestsModalProps {
  gests: string[];
  removeGest: (emailToRemove: string) => void;
  addNewGest: (e: React.FormEvent<HTMLFormElement>) => void;
  closeGestsModal: () => void;
}
export default function InviteGuestsModal({
  gests,
  removeGest,
  addNewGest,
  closeGestsModal,
}: InviteGuestsModalProps) {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/60">
      <div className="w-[640px] rounded-xl py-5 px-6 shadow-shape bg-zinc-900 space-y-5">
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-semibold">Selecionar convidados</h2>
            <button type="button" onClick={closeGestsModal}>
              <X className="size-5 text-zinc-400" />
            </button>
          </div>
          <p className="text-sm text-zinc-400">
            Os convidados irão receber e-mails para confirmar a participação na
            viagem.
          </p>
        </div>
        <div className="flex flex-wrap gap-2">
          {gests.map((gest) => (
            <div
              key={gest}
              className="py-1.5 px-2.5 rounded-md bg-zinc-800 flex items-center gap-2"
            >
              <span className="text-zinc-300">{gest}</span>
              <button
                onClick={() => removeGest(gest)}
                type="button"
                className=""
              >
                <X className="size-4 text-zinc-400" />
              </button>
            </div>
          ))}
        </div>
        <div className="w-full h-px bg-zinc-800" />
        <form
          onSubmit={addNewGest}
          action=""
          className="p-2.5 bg-zinc-950 border border-zinc-800 rounded-lg flex items-center gap-2"
        >
          <div className="flex items-center flex-1 gap-2 px-2">
            <AtSign className="size-5 text-zinc-400" />
            <input
              type="email"
              name="email"
              placeholder="Digite o e-mail do convidado"
              className="flex-1 text-lg bg-transparent outline-none placeholder-zinc-400"
            />
          </div>
          <Button type="submit" variant="primary">
            Convidar
            <Plus className="size-5" />
          </Button>
        </form>
      </div>
    </div>
  );
}

import { ArrowRight, UserRoundPlus } from "lucide-react";
import { Button } from "../../../components/button";

interface InviteGuestStepProps {
  gests: string[];
  openGestsModal: () => void;
  openConfirmTripModal: () => void;
}

export function InviteGuestStep({
  gests,
  openGestsModal,
  openConfirmTripModal,
}: InviteGuestStepProps) {
  return (
    <div className="flex items-center h-16 gap-3 px-4 bg-zinc-900 rounded-xl shadow-shape">
      <button
        type="button"
        onClick={openGestsModal}
        className="flex items-center flex-1 gap-2"
      >
        <UserRoundPlus className="size-5 text-zinc-400" />
        {gests.length > 0 ? (
          <span className="flex-1 text-lg text-left text-zinc-100">
            {gests.length} pessoas convidadas
          </span>
        ) : (
          <span className="flex-1 text-lg text-left text-zinc-400">
            Quem estará na viagem?
          </span>
        )}
        <input
          type="text"
          placeholder=""
          className="flex-1 text-lg bg-transparent outline-none placeholder-zinc-400"
        />
      </button>
      <div className="w-px h-6 bg-zinc-800" />

      <Button onClick={openConfirmTripModal} variant="primary">
        Confirmar viagem
        <ArrowRight className="size-5" />
      </Button>
    </div>
  );
}

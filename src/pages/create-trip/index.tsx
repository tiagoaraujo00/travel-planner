import { useState } from "react";
import { useNavigate } from "react-router-dom";
import InviteGuestsModal from "./invite-guests-modal";
import { ConfirmTripModal } from "./confirm-trip-modal";
import { DestinationAndDateStep } from "./steps/destination-and-date-step";
import { InviteGuestStep } from "./steps/invite-guest-step";
import { DateRange } from "react-day-picker";
import { api } from "../../lib/axios";

export function CreateTripPage() {
  const navigate = useNavigate();
  const [isGestsInputOpen, setIsGestsInputOpen] = useState(false);
  const [isGestsModalOpen, setIsGestsModalOpen] = useState(false);
  const [isConfirmTripModalOpen, setIsConfirmTripModalOpen] = useState(false);
  
  const [gests, setGests] = useState(["tiago@tiago.com"]);
  const [destination, setDestination] = useState("");
  const [ownerName, setOwnerName] = useState("");
  const [ownerEmail, setOwnerEmail] = useState("");
  const [eventStartAndEndDates, setEventStartAndEndDates] = useState<
    DateRange | undefined
  >();

  function openGestsInput() {
    setIsGestsInputOpen(true);
  }
  const closeGestsInput = () => {
    setIsGestsInputOpen(false);
  };
  const openGestsModal = () => {
    setIsGestsModalOpen(true);
  };
  const closeGestsModal = () => {
    setIsGestsModalOpen(false);
  };

  async function createTrip  (e: React.FormEvent<HTMLFormElement>){
    e.preventDefault();
    console.log(destination);
    console.log(ownerName);
    console.log(ownerEmail);
    console.log(eventStartAndEndDates);

    if(!destination || !ownerName || !ownerEmail || !eventStartAndEndDates?.from || !eventStartAndEndDates?.to) { return; }
    if(gests.length === 0) { return; }


    const response = await api.post("/trips", {
      destination,
      starts_at: eventStartAndEndDates.from,
      ends_at: eventStartAndEndDates.to,
      emails_to_invite: gests,
      owner_name: ownerName,
      owner_email: ownerEmail,
    });

    const { tripId } = response.data;
    navigate(`/trips/${tripId}`);
  }

  const addNewGest = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const email = new FormData(e.currentTarget).get("email")?.toString();

    if (!email) return;

    if (gests.includes(email)) {
      return;
    }

    setGests([...gests, email]);
    e.currentTarget.reset();
  };

  const removeGest = (emailToRemove: string) => {
    const newGests = gests.filter((email) => email !== emailToRemove);
    setGests(newGests);
  };

  const openConfirmTripModal = () => {
    setIsConfirmTripModalOpen(true);
  };
  const closeConfirmTripModal = () => {
    setIsConfirmTripModalOpen(false);
  };

  return (
    <div className="flex items-center justify-center h-screen bg-center bg-no-repeat bg-patern">
      <div className="w-full max-w-3xl px-6 space-y-10 text-center">
        <div className="flex flex-col items-center gap-3">
          <img src="/logo.svg" alt="logo" />
          <p className="text-lg text-zinc-300">
            Convide seus amigos e planeje sua próxima viagem!
          </p>
        </div>
        <div className="space-y-4">
          <DestinationAndDateStep
            closeGestsInput={closeGestsInput}
            isGestsInputOpen={isGestsInputOpen}
            openGestsInput={openGestsInput}
            setDestination={setDestination}
            setEventStartAndEndDates={setEventStartAndEndDates}
            eventStartAndEndDates={eventStartAndEndDates}
          />
          {isGestsInputOpen && (
            <InviteGuestStep
              gests={gests}
              openConfirmTripModal={openConfirmTripModal}
              openGestsModal={openGestsModal}
            />
          )}
        </div>
        <p className="text-sm text-zinc-500">
          Ao planejar sua viagem pela plann.er você automaticamente concorda{" "}
          <br />
          com nossos{" "}
          <a className="underline text-zinc-300" href="*">
            termos de uso
          </a>{" "}
          e{" "}
          <a className="underline text-zinc-300" href="*">
            políticas de privacidade
          </a>
          .
        </p>
      </div>
      {isGestsModalOpen && (
        <InviteGuestsModal
          addNewGest={addNewGest}
          closeGestsModal={closeGestsModal}
          gests={gests}
          removeGest={removeGest}
        />
      )}
      {isConfirmTripModalOpen && (
        <ConfirmTripModal
          closeConfirmTripModal={closeConfirmTripModal}
          createTrip={createTrip}
          setOwnerEmail={setOwnerEmail}
          setOwnerName={setOwnerName}
        />
      )}
    </div>
  );
}

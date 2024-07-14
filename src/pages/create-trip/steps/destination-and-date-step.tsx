import { ArrowRight, Calendar, MapPin, Settings2, X } from "lucide-react";
import { Button } from "../../../components/button";
import { useState } from "react";
import { DateRange, DayPicker } from "react-day-picker";
import "react-day-picker/dist/style.css";
import { format } from 'date-fns';

interface DestinationAndDateStepProps {
  isGestsInputOpen: boolean;
  openGestsInput: () => void;
  closeGestsInput: () => void;
  setDestination: (destination: string) => void;
  setEventStartAndEndDates: (dates: DateRange | undefined) => void;
  eventStartAndEndDates: DateRange | undefined;
}

export function DestinationAndDateStep({
  isGestsInputOpen,
  openGestsInput,
  closeGestsInput,
  setDestination,
  setEventStartAndEndDates,
  eventStartAndEndDates,
}: DestinationAndDateStepProps) {
  const [isDatePickerOpen, setIsDatePickerOpen] = useState(false);


  const openDatePicker = () => {
    return setIsDatePickerOpen(true);
  };
  const closeDatePicker = () => {
    return setIsDatePickerOpen(false);
  };
  const displayedDate = eventStartAndEndDates && eventStartAndEndDates.from && eventStartAndEndDates.to 
    ? format(eventStartAndEndDates.from, "d' de 'LL").concat( ' até ').concat(format(eventStartAndEndDates.to, "d' de 'LLL"))
     : null;
  return (
    <div className="flex items-center h-16 gap-3 px-4 bg-zinc-900 rounded-xl shadow-shape">
      <div className="flex items-center flex-1 gap-2">
        <MapPin className="size-5 text-zinc-400" />
        <input
          disabled={isGestsInputOpen}
          type="text"
          placeholder="Para onde você vai?"
          className="flex-1 text-lg bg-transparent outline-none placeholder-zinc-400"
          onChange={(e) => setDestination(e.target.value)}
        />
      </div>
      <button
        onClick={openDatePicker}
        disabled={isGestsInputOpen}
        className="flex items-center gap-2 text-left w-[240px]"
      >
        <Calendar className="size-5 text-zinc-400" />
        <span className="flex-1 w-40 text-lg text-zinc-400">{ displayedDate || 'Quando?' }</span>
      </button>

      {isDatePickerOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/60">
          <div className="px-6 py-5 space-y-5 rounded-xl shadow-shape bg-zinc-900">
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <h2 className="text-lg font-semibold">Selecione a data</h2>
                <button type="button" onClick={closeDatePicker}>
                  <X className="size-5 text-zinc-400" />
                </button>
              </div>
            </div>
            <DayPicker mode="range" selected={ eventStartAndEndDates } onSelect={ setEventStartAndEndDates } />
          </div>
        </div>
      )}

      <div className="w-px h-6 bg-zinc-800" />

      {isGestsInputOpen ? (
        <Button onClick={closeGestsInput} variant="secondary">
          Alterar loca/data
          <Settings2 className="size-5" />
        </Button>
      ) : (
        <Button onClick={openGestsInput} variant="primary">
          Continuar
          <ArrowRight className="size-5" />
        </Button>
      )}
    </div>
  );
}

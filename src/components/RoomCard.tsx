import { Lock, Users, MapPin, Check } from "lucide-react";
import type { Room } from "@/lib/types";

interface RoomCardProps {
  room: Room;
  selected: boolean;
  onSelect: () => void;
}

export function RoomCard({ room, selected, onSelect }: RoomCardProps) {
  return (
    <button
      type="button"
      onClick={onSelect}
      disabled={room.blocked}
      className={[
        "w-full text-left rounded-xl border-2 p-4 transition-all duration-200",
        room.blocked
          ? "border-red-200 bg-red-50 cursor-not-allowed opacity-70"
          : selected
            ? "border-emerald-500 bg-emerald-50 shadow-md"
            : "border-gray-200 bg-white hover:border-emerald-300 hover:shadow-sm",
      ].join(" ")}
    >
      <div className="flex items-start justify-between gap-3">
        <div className="min-w-0">
          <div className="flex items-center gap-2">
            <h3 className="font-semibold text-gray-900 truncate">{room.name}</h3>
            {room.blocked && (
              <span className="inline-flex items-center gap-1 text-xs font-medium text-red-600 bg-red-100 px-2 py-0.5 rounded-full whitespace-nowrap">
                <Lock className="w-3 h-3" /> Blocked
              </span>
            )}
          </div>
          <div className="mt-1 flex flex-wrap items-center gap-x-3 gap-y-1 text-sm text-gray-500">
            <span className="inline-flex items-center gap-1">
              <MapPin className="w-3.5 h-3.5" /> {room.building}
            </span>
            <span className="inline-flex items-center gap-1">
              <Users className="w-3.5 h-3.5" /> {room.capacity}
            </span>
          </div>
        </div>
        {!room.blocked && selected && (
          <div className="flex-shrink-0 w-6 h-6 rounded-full bg-emerald-500 text-white flex items-center justify-center">
            <Check className="w-4 h-4" />
          </div>
        )}
      </div>
    </button>
  );
}

import { Badge, spinner} from "./ui"

function fromatDate(value){
      if(!value)return "Date  TBA"
      const date =  new Date(value);
      if (Number.isNaN(date.getTime())) return "Date TBA";
      return date.toLocaleString(undefined, {
            weekday: "short",
            month:"numeric",
            month:"short",
            hour: "2-digit",
            minute: "2-dight",
      });
}


function statusTone(status){
      const s = status.toLowerCase();
      if (s.includes("cnacel")) return "danger"
      if(s.includes("pending")) return " warning";
  return "success";
}

export function BookingCard({booking, onCancle, cencelling}){
      const event = booking.event;
      const cencelled = booking.status.toLowerCase().includes("cencel");

      return(
            <article className="panel group flex flex-col overflow-hidden sm:flex-row"></article>
      )
}
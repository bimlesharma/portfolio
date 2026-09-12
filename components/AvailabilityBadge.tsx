import { Badge } from "@/components/ui/badge";

export default function AvailabilityBadge() {
  return (
    <Badge className="border-emerald-500/40 bg-emerald-500/15 text-emerald-400">
      <span className="size-1.5 bg-emerald-400" aria-hidden />
      Available for collaboration
    </Badge>
  );
}

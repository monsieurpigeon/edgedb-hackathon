"use client";

import { Button } from "@/components/ui/button";
import { COOLDOWN } from "@/utils/constants";
import { addMinutes, differenceInSeconds, intervalToDuration } from "date-fns";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useFormStatus } from "react-dom";
import { zeroPad } from "../../../utils/formatter";

export function ScanButton({
  exhausted,
  nextTime,
}: {
  exhausted: boolean;
  nextTime: Date;
}) {
  const { pending } = useFormStatus();
  const [remaining, setRemaining] = useState<string | null>(null);
  const router = useRouter();

  useEffect(() => {
    if (!exhausted) return;
    const interval = setInterval(() => {
      const tmp = differenceInSeconds(
        addMinutes(nextTime, COOLDOWN),
        Date.now()
      );
      const duration = intervalToDuration({ start: 0, end: tmp * 1000 });

      if (tmp && tmp <= 0) {
        clearInterval(interval);
        router.replace("/radar");
      }
      setRemaining(
        `${zeroPad(duration.minutes || 0)}:${zeroPad(duration.seconds || 0)}`
      );
    }, 1000);
    return () => clearInterval(interval);
  }, [exhausted, nextTime, remaining, router]);

  return (
    <Button type="submit" disabled={pending || exhausted}>
      <div className="flex items-center gap-4 min-w-12">
        {pending && (
          <span className="relative flex h-3 w-3">
            <span className="absolute animate-ping  h-full w-full rounded-full bg-green-400 opacity-75"></span>
            <span className="absolute rounded-full h-3 w-3 bg-green-800"></span>
            <span className="absolute animate-bounce rounded-full size-1 bg-green-300 top-1/3 left-1/3"></span>
          </span>
        )}
        {exhausted ? (
          <span className="w-full text-center">{remaining}</span>
        ) : (
          <span className="w-full text-center">
            {pending ? "Scanning..." : "Scan"}
          </span>
        )}
      </div>
    </Button>
  );
}

"use client";

import { Channel } from "@/dbschema/interfaces";
import { useState } from "react";
import { ChannelInputProps } from ".";
import { CollectionItem } from "./CollectionItem";

export function CollectionList({
  channels,
  setChannel,
}: {
  channels: Channel[] | undefined;
  setChannel: (channel: ChannelInputProps) => void;
}) {
  const [show, setShow] = useState(false);
  const handleClick = (channel: Channel) => {
    setChannel(channel);
  };

  return (
    <>
      <div className="flex items-center justify-between gap-4">
        <p className="text-xl font-bold leading-4 tracking-tight text-gray-900">
          My Collection
        </p>
        <button onClick={() => setShow((v) => !v)}>
          {show ? "Hide" : "Reveal"}
        </button>
      </div>

      <div className="relative">
        <div className="border-2 rounded-lg p-4 shadow-lg overflow-hidden">
          <div className="blur-xl">
            <div className="grid grid-cols-4 grid-rows-4 gap-4">
              {channels &&
                channels
                  .sort((a, b) => a.subscriberCount - b.subscriberCount)
                  .map((item) => (
                    <CollectionItem key={item.id} item={item} isBackground />
                  ))}
            </div>
          </div>
          <div
            className={`absolute left-4 right-4 top-4 bottom-4 grid grid-cols-4 grid-rows-4 gap-4 collection-list ${show && "active"}`}
          >
            {channels &&
              channels
                .sort((a, b) => a.subscriberCount - b.subscriberCount)
                .map((item) => (
                  <CollectionItem
                    key={item.id}
                    item={item}
                    onClick={() => {
                      handleClick(item);
                    }}
                  />
                ))}
          </div>
        </div>
      </div>
    </>
  );
}

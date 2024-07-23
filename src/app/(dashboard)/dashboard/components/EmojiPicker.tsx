"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import clsx from "clsx";
import { Smile, Shuffle, X } from "lucide-react";
import React, { useEffect, useState, useRef } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import { SearchIndex, init } from "emoji-mart";
import { CircularLoading } from "respinner";
import { motion, AnimatePresence } from "framer-motion";
import useClickAway from "@/hooks/useClickAway";
import { useFormContext } from "react-hook-form";

interface IEmojiPicker {
  name: string; // Name of the form field
}

const EmojiPicker: React.FC<IEmojiPicker> = ({ name }) => {
  const [isPickerOpened, setIsPickerOpened] = useState(false);
  const [emojiData, setEmojiData] = useState<{
    emojis: Record<string, any>;
  } | null>(null);
  const [emojis, setEmojis] = useState<string[]>([]);
  const [visibleEmojis, setVisibleEmojis] = useState<string[]>([]);
  const [searchValue, setSearchValue] = useState("");
  const [hasMore, setHasMore] = useState(true);
  const [loading, setLoading] = useState(true);
  const pickerRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const ITEMS_PER_PAGE = 63;

  const { setValue, watch } = useFormContext(); // Use useFormContext
  const selectedEmoji = watch(name); // Watch the form state

  // Emoji data fetch
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          "https://cdn.jsdelivr.net/npm/@emoji-mart/data"
        );
        const data = await response.json();

        // Remove country flags from the emoji data
        const noCountryFlagsData = {
          ...data,
          emojis: Object.fromEntries(
            Object.entries(data.emojis).filter(
              ([key]) => !key.startsWith("flag-")
            )
          ),
        };

        setEmojiData(noCountryFlagsData);
        init({ data: noCountryFlagsData }); // Initialize emoji-mart with filtered data

        const allEmojis = Object.values(noCountryFlagsData.emojis);
        const results = allEmojis.map((emoji: any) => emoji.skins[0].native);
        setEmojis(results);
        setVisibleEmojis(results.slice(0, ITEMS_PER_PAGE));
        setLoading(false);
      } catch (error) {
        console.error("Failed to fetch emoji data", error);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    if (!emojiData) return;

    const fetchSearchResults = async () => {
      setLoading(true);
      if (searchValue) {
        const searchResult = await SearchIndex.search(searchValue);
        const results = searchResult.map((emoji: any) => emoji.skins[0].native);
        setEmojis(results);
        setVisibleEmojis(results.slice(0, ITEMS_PER_PAGE));
      } else {
        const allEmojis = Object.values(emojiData.emojis);
        const results = allEmojis.map((emoji: any) => emoji.skins[0].native);
        setEmojis(results);
        setVisibleEmojis(results.slice(0, ITEMS_PER_PAGE));
      }
      setLoading(false);
    };

    fetchSearchResults();
  }, [searchValue, emojiData]);

  const closePicker = () => {
    setIsPickerOpened(false);
  };

  useClickAway(pickerRef, closePicker);

  const loadMoreEmojis = () => {
    if (visibleEmojis.length >= emojis.length) {
      setHasMore(false);
      return;
    }

    const newVisibleEmojis = emojis.slice(
      visibleEmojis.length,
      visibleEmojis.length + ITEMS_PER_PAGE
    );
    setVisibleEmojis((prev) => [...prev, ...newVisibleEmojis]);
  };

  const handleClick = (e: React.MouseEvent<HTMLDivElement>) => {
    e.stopPropagation();
    e.preventDefault();

    if (!selectedEmoji) {
      // If there is no selected emoji, select a random emoji first
      handleSelect(handleRandomEmoji());
    }
    // Toggle the picker
    setIsPickerOpened(!isPickerOpened);
  };

  const handleSelect = (emoji: string) => {
    setValue(name, emoji); // Update the form state with the selected emoji
    setIsPickerOpened(false);
  };

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchValue(e.target.value);
  };

  useEffect(() => {
    if (isPickerOpened && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isPickerOpened]);

  const clearSearch = () => {
    setSearchValue("");
    if (inputRef.current) {
      inputRef.current.focus();
    }
  };

  const handleRandomEmoji = (): string => {
    if (emojis.length > 0) {
      const randomEmoji = emojis[Math.floor(Math.random() * emojis.length)];
      return randomEmoji;
    }
    return "❓";
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center size-20">
        <CircularLoading size={30} duration={1} stroke="#888888" />
      </div>
    );
  }

  if (!emojiData) return null; // Return null if emoji data is not loaded yet

  return (
    <div className="relative inline-block">
      <div
        onClick={(e) => {
          handleClick(e);
        }}
        className={clsx(
          "cursor-pointer items-center text-neutral-400 hover:bg-neutral-200/50 hover:text-neutral-700 flex size-20 rounded-lg select-none justify-center transition-colors",
          {
            "bg-neutral-200/50 text-neutral-700": isPickerOpened,
            "flex size-20 rounded-lg select-none items-center justify-center":
              selectedEmoji,
          }
        )}
      >
        {selectedEmoji ? (
          <span className="text-6xl rounded-lg">{selectedEmoji}</span>
        ) : (
          <Smile className="mr-1" size={32} />
        )}
      </div>
      <AnimatePresence>
        {isPickerOpened && (
          <motion.div
            ref={pickerRef}
            className="absolute w-[400px] left-0 mt-2 z-50 bg-white border rounded-lg shadow-md"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.1 }}
          >
            <div className="relative">
              <div className="flex flex-row p-2 border-b items-center">
                <div className="relative flex-grow">
                  <Input
                    placeholder="Search emojis..."
                    value={searchValue}
                    onChange={handleSearchChange}
                    className="border-none ring-0 ring-offset-0 bg-transparent focus-visible:ring-0 focus-visible:ring-offset-0 text-lg font-medium"
                    ref={inputRef}
                  />
                  {searchValue && (
                    <button
                      onClick={clearSearch}
                      className="absolute right-3 top-1/2 transform -translate-y-1/2 text-neutral-400 hover:bg-slate-50 rounded-full px-2 py-1"
                    >
                      <X size={16} />
                    </button>
                  )}
                </div>
                {/* shuffle button */}
                <Button
                  variant={"ghost"}
                  onClick={() => handleSelect(handleRandomEmoji())}
                  disabled={emojis.length <= 0}
                >
                  <Shuffle size={16} />
                </Button>
              </div>
              <InfiniteScroll
                dataLength={visibleEmojis.length}
                next={loadMoreEmojis}
                hasMore={hasMore}
                loader={
                  <div className="flex items-center justify-center mt-5">
                    <CircularLoading size={40} duration={1} stroke="#777777" />
                  </div>
                }
                height={300}
                endMessage={
                  <div className="flex justify-center items-center text-sm">
                    <p className="text-neutral-600 py-5">
                      You&apos;ve reached the end of the list.
                    </p>
                  </div>
                }
              >
                {visibleEmojis.length > 0 ? (
                  <div className="grid grid-cols-9 p-2">
                    {visibleEmojis.map((emoji, index) => (
                      <motion.span
                        key={index}
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.2 }}
                        style={{
                          fontSize: "24px",
                          cursor: "pointer",
                        }}
                        className="text-2xl cursor-pointer hover:bg-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-700 focus:ring-offset-2 transition-colors duration-75 rounded-lg items-center justify-center text-center p-1"
                        onClick={() => handleSelect(emoji)}
                        tabIndex={0}
                        role="button"
                        aria-label={`Emoji ${emoji}`}
                        onKeyDown={(e) => {
                          if (e.key === "Enter" || e.key === " ") {
                            handleSelect(emoji);
                          }
                        }}
                      >
                        {emoji}
                      </motion.span>
                    ))}
                  </div>
                ) : (
                  <div className="flex justify-center items-center text-sm">
                    <p className="text-neutral-600 mt-5">No emojis found</p>
                  </div>
                )}
              </InfiniteScroll>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default EmojiPicker;

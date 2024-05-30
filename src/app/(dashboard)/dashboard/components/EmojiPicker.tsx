import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import clsx from "clsx";
import { Smile, Shuffle } from "lucide-react";
import React, { useEffect, useState } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import { SearchIndex, init } from "emoji-mart";
import { CircularLoading } from "respinner";

interface IEmojiPicker {
  onSelect: (emoji: string) => void;
}

const EmojiPicker: React.FC<IEmojiPicker> = ({ onSelect }) => {
  const [isPickerOpened, setIsPickerOpened] = useState(false);
  const [emojiData, setEmojiData] = useState<any>(null);
  const [emojis, setEmojis] = useState<string[]>([]);
  const [visibleEmojis, setVisibleEmojis] = useState<string[]>([]);
  const [searchValue, setSearchValue] = useState("");
  const [hasMore, setHasMore] = useState(true);
  const ITEMS_PER_PAGE = 100;

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch(
        "https://cdn.jsdelivr.net/npm/@emoji-mart/data"
      );
      const data = await response.json();
      setEmojiData(data);

      const allEmojis = Object.values(data.emojis);
      const results = allEmojis.map((emoji: any) => emoji.skins[0].native);
      setEmojis(results);
      setVisibleEmojis(results.slice(0, ITEMS_PER_PAGE));
      init({ data });
    };

    fetchData();
  }, []);

  useEffect(() => {
    if (!emojiData) return;

    const fetchSearchResults = async () => {
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
    };

    fetchSearchResults();
  }, [searchValue, emojiData]);

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

  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    e.preventDefault();
    setIsPickerOpened((prev) => !prev);
  };

  const handleSelect = (emoji: string) => {
    onSelect(emoji);
    setIsPickerOpened(false);
  };

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchValue(e.target.value);
    console.log(e.target.value);
  };

  if (!emojiData) return null; // Return null if emoji data is not loaded yet

  return (
    <div className="relative inline-block">
      <Button
        onClick={handleClick}
        variant={"invisible"}
        className={clsx(
          "relative items-center text-neutral-600 hover:bg-neutral-200/50 hover:text-neutral-700",
          { "bg-neutral-200/50 text-neutral-700": isPickerOpened }
        )}
      >
        <Smile className="mr-1" size={16} /> Category Icon
      </Button>
      {isPickerOpened && (
        <div className="absolute w-[400px] left-0 mt-2 z-50 bg-white border rounded-lg shadow-md">
          <div className="relative">
            <div className="flex flex-row p-2 border-b">
              <Input
                placeholder="Search emojis..."
                value={searchValue}
                onChange={handleSearchChange}
                className="border-none ring-0 ring-offset-0 bg-transparent focus-visible:ring-0 focus-visible:ring-offset-0 text-lg font-medium"
              />
              <Button variant={"ghost"} className="">
                <Shuffle size={16} />
              </Button>
            </div>
            <InfiniteScroll
              dataLength={visibleEmojis.length}
              next={loadMoreEmojis}
              hasMore={hasMore}
              loader={
                <div className="flex items-center justify-center h-full">
                  <CircularLoading size={40} duration={1} stroke="#4197ff" />
                </div>
              }
              height={300}
              endMessage={
                <div className="flex justify-center items-center text-sm">
                  <p className="text-neutral-600">
                    You&apos;ve reached the end of the list.
                  </p>
                </div>
              }
            >
              <div className="grid grid-cols-9 p-2">
                {visibleEmojis.map((emoji, index) => (
                  <span
                    key={index}
                    style={{
                      fontSize: "24px",
                      cursor: "pointer",
                    }}
                    className="text-2xl cursor-pointer hover:bg-slate-200 transition-colors duration-75 rounded-lg items-center justify-center text-center p-1"
                    onClick={() => handleSelect(emoji)}
                  >
                    {emoji}
                  </span>
                ))}
              </div>
            </InfiniteScroll>
          </div>
        </div>
      )}
    </div>
  );
};

export default EmojiPicker;

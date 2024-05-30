import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import clsx from "clsx";
import { Smile } from "lucide-react";
import React, { useEffect, useRef, useState } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import { SearchIndex } from "emoji-mart";

interface IEmojiPicker {
  onSelect: (emoji: string) => void;
}

const EmojiPicker: React.FC<IEmojiPicker> = ({ onSelect }) => {
  const [isPickerOpened, setIsPickerOpened] = useState(false);
  const [emojiData, setEmojiData] = useState<any>(null);
  const [emojis, setEmojis] = useState<string[]>([]);
  const [emojiSearch, setEmojiSearch] = useState<string>("");
  const [visibleEmojis, setVisibleEmojis] = useState<string[]>([]);
  const [hasMore, setHasMore] = useState(true);
  const inputRef = useRef<HTMLInputElement>(null);
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
    };

    fetchData();
  }, []);

  const inputValue = inputRef.current?.value;


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

  if (!emojiData) return null; // Return null if emoji data is not loaded yet

  return (
    <div className="">
      <Button
        onClick={handleClick}
        variant={"invisible"}
        className={clsx(
          "items-center text-neutral-600 hover:bg-neutral-200/50 hover:text-neutral-700",
          { "bg-neutral-200/50 text-neutral-700": isPickerOpened }
        )}
      >
        <Smile className="mr-1" size={16} /> Category Icon
      </Button>
      {isPickerOpened && (
        <div className="absolute w-[400px] left-[0px] right-[0px] z-50 bg-white border rounded-lg shadow-md">
          <div className="relative">
            <div className="p-2 border-b">
              <Input placeholder="Search emojis..." ref={inputRef} />
            </div>
            <InfiniteScroll
              dataLength={visibleEmojis.length}
              next={loadMoreEmojis}
              hasMore={hasMore}
              loader={<h4>Loading...</h4>} // search fonksiyonu çalışıyor. Input değeri search fonksiyonuna gönderilecek ve sonuçlar `results` değişkenidir yani `results` maplenecek. results array olarak gelir.
              height={300}
              endMessage={<p style={{ textAlign: "center" }}>No more emojis</p>}
            >
              <div className="flex flex-wrap p-2">
                {visibleEmojis.map((emoji, index) => (
                  <span
                    key={index}
                    style={{
                      fontSize: "24px",
                      margin: "5px",
                      cursor: "pointer",
                    }}
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

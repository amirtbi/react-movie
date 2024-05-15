import { useRef } from "react";
import { useKey } from "../hooks/useKeyEvent";
export default function Search(props: {
  query: string;
  setQuery: (value: string) => void;
}) {
  const { query, setQuery } = props;
  const inputRef = useRef<HTMLInputElement | null>(null);
  useKey("Enter", () => {
    if (document.activeElement === inputRef.current) {
      return;
    }
    inputRef?.current?.focus();
    setQuery("");
  });
  return (
    <>
      <input
        className="search"
        type="text"
        placeholder="Search movies..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        ref={inputRef}
      />
    </>
  );
}

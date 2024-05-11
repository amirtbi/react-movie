import { useEffect, useRef } from "react";
export default function Search(props: {
  query: string;
  setQuery: (value: string) => void;
}) {
  const { query, setQuery } = props;
  const inputRef = useRef<HTMLInputElement | null>(null);
  useEffect(() => {
    const callback = (e) => {
      if (document.activeElement === inputRef.current) {
        return;
      }
      if (e.code === "Enter") {
        inputRef?.current?.focus();
        setQuery("");
      }
    };
    document.addEventListener("keydown", callback);
    return () => document.addEventListener("keydown", callback);
  }, [setQuery]);
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

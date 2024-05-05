export default function Search(props:{query:string,setQuery:(value:string)=>void}) {
  const {query,setQuery} = props;
  return (
    <>
      <input
        className="search"
        type="text"
        placeholder="Search movies..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />
    </>
  );
}

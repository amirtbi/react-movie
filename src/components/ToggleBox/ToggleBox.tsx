import { useState } from "react";
export default function ToggleBox(props: {
  children?: React.ReactElement[] | React.ReactElement;
}) {
  const { children } = props;
  const [isOpen, setIsOpen] = useState(true);
  return (
    <>
      <div className="box">
        <button
          className="btn-toggle"
          onClick={() => setIsOpen((open) => !open)}
        >
          {isOpen ? "–" : "+"}
        </button>
        {isOpen && children}
      </div>
    </>
  );
}

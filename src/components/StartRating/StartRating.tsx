import { useState } from "react";

const containerStyles = {
  display: "flex",
  alignItems: "center",
  gap: "16px",
};
const starContainerStyles = {
  display: "flex",
  gap: "4px",
};

function Star(props: {
  onClick: any;
  fullStar: boolean;
  onHoverIn: any;
  onHoverOut: any;
  size: number;
  color: string;
}) {
  const {
    onClick,
    fullStar,
    onHoverIn,
    onHoverOut,
    size,
    color = "yellow",
  } = props;
  return (
    <>
      <span
        onClick={onClick}
        onMouseEnter={onHoverIn}
        onMouseLeave={onHoverOut}
        style={{
          height: `${size}px`,
          width: `${size}px`,
          display: "block",
          cursor: "pointer",
        }}
      >
        {fullStar ? (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
            fill={color}
            stroke="#000"
          >
            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
          </svg>
        ) : (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke={color}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="{2}"
              d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z"
            />
          </svg>
        )}
      </span>
    </>
  );
}
export default function StarRating(props: {
  maxRating?: number;
  size?: number;
  color?: string;
  messages?: string[];
  defaultRating?: number;
  onSetMovieRating?: (value: number) => void;
}) {
  const {
    maxRating = 5,
    color = "black",
    size = 12,
    messages = [],
    defaultRating = 0,
    onSetMovieRating,
  } = props;
  const [rating, setRating] = useState(defaultRating);
  const [tempRating, setTempRating] = useState(0);

  const textStyle = {
    lineHeight: "1",
    margin: "0",
    color,
    fontSize: `${size}px`,
  };

  const getTextMessages = () => {
    let message = "";
    if (messages.length === maxRating) {
      message = messages[tempRating ? tempRating - 1 : rating - 1];
    } else {
      message = `${tempRating ? tempRating : rating}`;
    }
    return message;
  };

  const handleRating = (rating: number) => {
    setRating(rating);
    if (onSetMovieRating) onSetMovieRating(rating);
  };
  return (
    <>
      <div style={containerStyles}>
        <div style={starContainerStyles}>
          {Array.from({ length: maxRating }, (_, i) => (
            <Star
              key={i}
              onClick={() => handleRating(i + 1)}
              fullStar={tempRating ? tempRating >= i + 1 : rating >= i + 1}
              onHoverIn={() => setTempRating(i + 1)}
              onHoverOut={() => setTempRating(0)}
              size={size}
              color={color}
            />
          ))}
        </div>
        <p style={textStyle}>{getTextMessages()}</p>
      </div>
    </>
  );
}

export default function ErrorMessage(props: { error: string }) {
  const { error } = props;

  return (
    <>
      <p className="error">
        <span>⛔</span>
        {error}
      </p>
    </>
  );
}

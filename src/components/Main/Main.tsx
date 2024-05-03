export default function Main(props: { children: React.ReactElement[] }) {
  const { children } = props;

  return (
    <>
      <main className="main">{children}</main>
    </>
  );
}

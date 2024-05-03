export default function Header(props: { children: React.ReactElement[] }) {
  const { children } = props;
  return (
    <>
      <nav className="nav-bar">{children}</nav>
    </>
  );
}

import { Link } from "react-router-dom";

const Logo = () => {
  return (
    <Link to="/" style={{ textDecoration: 'none', color: 'inherit' }}>
      <h1 style={{ fontSize: '2rem', fontWeight: 'bold' }}>Smart Casa</h1>
    </Link>
  );
};

export default Logo;

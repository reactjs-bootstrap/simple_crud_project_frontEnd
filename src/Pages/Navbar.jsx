import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <div className="p-2 " style={{ background: "purple" }}>
      <Link to="/">
        <button className="btn btn-outline-success border-0 text-white">
          Home
        </button>
      </Link>
      <Link to="/list">
        <button className="btn btn-outline-success border-0 text-white">
          List
        </button>
      </Link>
      <Link to="/create">
        <button className="btn btn-outline-success border-0 text-white">
          Create
        </button>
      </Link>
      <Link to="/update">
        <button className="btn btn-outline-success border-0 text-white ">
          Update
        </button>
      </Link>
      <Link to="/delete">
        <button className="btn btn-outline-success border-0 text-white ">
          Delete
        </button>
      </Link>
    </div>
  );
};

export default Navbar;

import { useNavigate } from "react-router-dom";

const Home = () => {
  const navigate = useNavigate();
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <h1>Home Page Component</h1>
      <button
        className="btn btn-outline-secondary mt-2"
        onClick={() => navigate("/list")}
      >
        Go to List
      </button>
    </div>
  );
};

export default Home;

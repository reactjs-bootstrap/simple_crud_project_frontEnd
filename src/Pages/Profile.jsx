import React, { useEffect, useState } from "react";
import { Typography, Card, Button, Spin } from "antd";
import { useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode"; // ✅ default import

const { Title, Text } = Typography;

const Profile = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState({ fullName: "", email: "" });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem("authToken");
    if (!token) {
      navigate("/login");
      return;
    }

    try {
      const decoded = jwtDecode(token);
      setUser({
        fullName: decoded.fullName || "User",
        email: decoded.email || "user@example.com",
      });
    } catch (err) {
      console.error("Invalid token", err);
      localStorage.removeItem("authToken");
      navigate("/login");
    } finally {
      setLoading(false);
    }
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem("authToken");
    navigate("/login");
  };

  if (loading)
    return (
      <div style={{ display: "flex", justifyContent: "center", marginTop: 50 }}>
        <Spin size="large" />
      </div>
    );

  return (
    <div style={{ maxWidth: 600, margin: "50px auto" }}>
      <Card
        title="User Profile"
        extra={
          <Button type="primary" danger onClick={handleLogout}>
            Logout
          </Button>
        }
      >
        <Title level={3}>{user.fullName}</Title>
        <Text>
          <b>Email:</b> {user.email}
        </Text>
      </Card>
    </div>
  );
};

export default Profile;

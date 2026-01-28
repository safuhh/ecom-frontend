import api from "../api/axios";

function Profile() {
  const getProfile = async () => {
    try {
      const res = await api.get("/user/profile");
      console.log(res.data);

      const { _id, email, role } = res.data.user;

      alert(`
Email: ${email}
Role: ${role}
      `);
    } catch (err) {
      console.log(err.response?.data);
      alert(err.response?.data?.message || "Failed");
    }
  };

  const handleLogout = async () => {
    try {
      await api.post("/user/logout"); // Call logout endpoint
      alert("Logged out successfully!");

      // Optional: remove access token from localStorage if you store it
      localStorage.removeItem("accessToken");

      // Optional: redirect to login page
      window.location.href = "/login";
    } catch (err) {
      console.log(err.response?.data);
      alert(err.response?.data?.message || "Logout failed");
    }
  };

  return (
    <div>
      <button onClick={getProfile}>Get Profile</button>
      <button onClick={handleLogout} style={{ marginLeft: "10px" }}>
        Logout
      </button>
    </div>
  );
}

export default Profile;

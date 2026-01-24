import api from "../api/axios";

function Profile() {
  const getProfile = async () => {
    try {
      const res = await api.get("/user/profile");
      console.log(res.data);
      alert(`User ID: ${res.data.userId}`);
    } catch (err) {
      console.log(err.response?.data);
      alert(err.response?.data?.message || "Failed");
    }
  };

  return <button onClick={getProfile}>Get Profile</button>;
}

export default Profile;

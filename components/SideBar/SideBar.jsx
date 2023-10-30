function SideBar() {
  return (
    <div style={{  height: "100%", backgroundColor: "lightgrey", top: 0, left: 0, overflowY: "auto", transition: "0.3s" }}>
      <div style={{ padding: "20px", marginTop: "100px" }}>
          <NavItem icon="🏠" label="Home" />
          <NavItem icon="📊" label="Analytics" />
          <NavItem icon="⚙️" label="Settings" />
      </div>
      <div style={{bottom: "20px", left: "20px", color: "#888" }}>
        &copy; 2023 Chores App
      </div>
    </div>
  );
}

const NavItem = ({ icon, label }) => (
  <div
    style={{
      marginTop: "20px",
      marginBottom: "10px",
      backgroundColor: "beige",
      borderRadius: "5px",
      padding: "10px",
      display: "flex",
      alignItems: "center",
    }}
  >
    <span style={{ marginRight: "10px" }}>{icon}</span>
    <span>{label}</span>
  </div>
);

export default SideBar;

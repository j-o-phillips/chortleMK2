
function SideBar() {
  return (
    <div style={{ width: "250px", height: "100%", backgroundColor: "lightgrey", position: "fixed", top: 0, left: 0, overflowY: "auto", transition: "0.3s" }}>
      <div style={{ padding: "20px" }}>
        <nav>
          <NavItem icon="🏠" label="Home" />
          <NavItem icon="📊" label="Analytics" />
          <NavItem icon="⚙️" label="Settings" />
        </nav>
      </div>
      <div style={{ position: "absolute", bottom: "20px", left: "20px", color: "#888" }}>
        &copy; 2023 Chores App
      </div>
    </div>
  );
}

const NavItem = ({ icon, label }) => (
  <div style={{ marginTop: "20px", marginBottom: "10px", backgroundColor: "beige", borderRadius: "5px", padding: "10px", display: "flex", alignItems: "center" }}>
    <span style={{ marginRight: "10px" }}>{icon}</span>
    <span>{label}</span>
  </div>
);

export default SideBar;

import style from './SideBar.module.css'
function SideBar() {
  return (
    <div className={style.sidebar}>
      <div className={style.icons}>
          <NavItem icon="🏠" label="Home" />
          <NavItem icon="📊" label="Analytics" />
          <NavItem icon="⚙️" label="Settings" />
      </div>
      <div className={style.copyright}>
        &copy; 2023 Chores App
      </div>
    </div>
  );
}

const NavItem = ({ icon, label }) => (
  <div
    style={{
      marginBottom: "10px",
      backgroundColor: "beige",
      borderRadius: "5px",
      padding: "7px",
      display: "flex",
      alignItems: "center",
    }}
  >
    <span style={{ marginRight: "10px" }}>{icon}</span>
    <span>{label}</span>
  </div>
);

export default SideBar;

import './navbar.css'

const Navbar = () => {
  return (
    <div className="navbar">
      <div className="logo">Employee</div>
      <ul className="menu">
        <li>Home</li>
        <li>Explore</li>
        <li>About</li>
        <li className="nav-con">Contact</li>
      </ul>
    </div>
  )
}
export default Navbar;

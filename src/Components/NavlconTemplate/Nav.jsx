// import "./Nav.css"

// const Nav = ({Icon, title}) => {
//   return (
//     <div className="nav">
//         {Icon &&  <Icon className = "icon"/>}
//         <h2>{title ? title: null}</h2>
//     </div>
//   )
// }

// export default Nav

import { Link } from 'react-router-dom';
import "./Nav.css";

const Nav = ({ Icon, title, to }) => {
  return (
    <Link to={to} className="nav"> {/* ⬅️ bọc cả div thành Link */}
      {Icon && <Icon className="icon" />}
      <h2>{title ? title : null}</h2>
    </Link>
  );
};

export default Nav;
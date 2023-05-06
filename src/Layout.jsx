import {useContext} from "react";
import {UserContext} from "./UserContext.jsx";
import { Outlet, Link } from "react-router-dom";
import "./styles/style.css"


const Layout = () => {
  const {user} = useContext(UserContext);
  return (
    <div className="min-h-full">
      <div className="min-h-screen mb-4">
        <nav className="banner home py-4 px-8">
            <Link to="/"><h1>首頁</h1></Link>
            <Link to={user?'/account':'/login'}><h1>{user?'帳戶':'登入'}</h1></Link>
            <Link to="register"><h1>註冊</h1></Link>
            {/* <Link to="profile"><h1>檔案</h1></Link> */}
        </nav>
        <div className="container ">
          <Outlet /> 
        </div>
      </div> 
      <footer>
        <div>
          <p className="copyright">made by jeffhsu</p>
        </div>
      </footer>
    </div>
  );
};

export default Layout
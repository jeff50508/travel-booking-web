import { UserContext } from "../UserContext"
import { useContext, useState } from "react"
import { Navigate, useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import axios from "axios";
import PlacesPage from "./placespage";
import AccountNav from "../AccountNav";
export default function Account() {
    const[redirect,setRedirect] = useState(null)
    const {ready,user,setUser} = useContext(UserContext);
    let {subpage} = useParams();
    if(subpage===undefined) {
        subpage='profile';
    }

    async function logout (){
        await axios.post('/logout');
        setUser(null);
        setRedirect('/');
    }

    if(!ready) {
        return'Loading';
    }

    if(ready && !user && !redirect) {
        return <Navigate to ={'/login'}/>;

    }



    if (redirect) {
        return <Navigate to={redirect}/>
    }
    return (
        <div>
            <AccountNav/>
            <div className="mt-24 text-7xl text-center text-3 mb-9">您好，{user.name}</div>
            {subpage ==='profile' &&(
                <div className="mt-36 text-center max-w-xs mx-auto">
                    正以{user.name}({user.email})帳號登入<br/>
                    <button onClick={logout} className="btn max-w-xs mt-2">登出？</button>
                </div>
            )}
            {subpage==='places' && (
                <PlacesPage/>
            )}
        </div>
    )
}
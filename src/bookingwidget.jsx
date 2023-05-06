import {useEffect, useState} from "react";
import {differenceInCalendarDays} from "date-fns";
import axios from "axios";
import {Navigate} from "react-router-dom";
import {UserContext} from "./UserContext.jsx";
import { useContext } from "react";

export default function BookingWidget({place}) {
  const [checkIn,setCheckIn] = useState('');
  const [checkOut,setCheckOut] = useState('');
  const [numberOfGuests,setNumberOfGuests] = useState(1);
  const [name,setName] = useState('');
  const [phone,setPhone] = useState('');
  const [redirect,setRedirect] = useState('');
  const {user} = useContext(UserContext);

  useEffect(() => {
    if (user) {
      setName(user.name);
    }
  }, [user]);

    let numberOfNights = 0;
    if (checkIn && checkOut) {
        numberOfNights = differenceInCalendarDays(new Date (checkOut), new Date (checkIn));
    }

    async function bookThisPlace() {
        const response = await axios.post('/bookings', {
            checkIn, checkOut, numberOfGuests, name, phone,
            place:place._id,
            price:numberOfNights * place.price
        })
        const bookingId = response.data._id
        setRedirect(`/account/bookings/${bookingId}`)
    }

    if(redirect) {
        return <Navigate to={redirect} />
    }
    
    return (
        <div className="bg-gray-300 p-4 rounded-2xl">
            <div className="text-2xl text-center">
                價格：${place.price}／每晚<br/>
            </div>
            <div className="border rounded-2xl mt-4">
                <div className="flex">
                    <div className="py-3 px-4">
                        <label>入住時間：</label>
                        <input value={checkIn} onChange={ev => setCheckIn(ev.target.value)}className="bg-gray-200" type="date" />
                    </div>
                    <div className="py-3 px-4 border-t">
                        <label>退房時間：</label>
                        <input value={checkOut} onChange={ev => setCheckOut(ev.target.value)}className="bg-gray-200" type="date" />
                    </div>
                </div>
                <div className="py-3 px-4 border-t">
                    <label>人數</label>
                    <input value={numberOfGuests} onChange={ev => setNumberOfGuests(ev.target.value)} className="bg-gray-200" type="number" />
                </div>
                {numberOfNights > 0 && (
                    <div className="py-3 px-4 border-t">
                        <label>輸入姓名</label>
                        <input value={name} onChange={ev => setName(ev.target.value)} className="bg-gray-200" type="text" placeholder="Ex.王小明"/>
                        <label>輸入電話</label>
                        <input value={phone} onChange={ev => setPhone(ev.target.value)} className="bg-gray-200" type="text" placeholder="Ex.0912345678"/>
                    </div>
                )}
            </div>           
            <button onClick={bookThisPlace} className="mt-4 bg-4 text-1 w-100 h-10 items-center justify-center rounded-2xl">
                預訂
                {numberOfNights > 0 && (
                    <span>${numberOfNights * place.price}</span>
                )}
            </button>
        </div>
    )
}
import PhotosUploader from "../PhotosUploader";
import Perks from "../perks";
import { useEffect, useState } from "react";
import axios from "axios";
import AccountNav from "../AccountNav";
import { Navigate } from "react-router-dom";
import { useParams } from "react-router-dom";

export default function PlacesFormPage() {
    const {id} = useParams();
    console.log({id});
    const [title,setTitle]=useState("");
    const [address,setAddress]=useState("");
    const [addedPhotos,setAddedPhotos]=useState([]);
    const [description,setDescription]=useState("");
    const [perks,setPerks]=useState([]);
    const [extraInfo,setExtraInfo]=useState("");
    const [checkIn,setCheckIn]=useState("");
    const [checkOut,setCheckOut]=useState("");
    const [maxGuests,setMaxGuests]=useState(1);
    const [redirect,setRedirect]=useState(false);
    const [price,setPrice]=useState(100)
    useEffect(() => {
        if(!id) {
            return
        }
        axios.get('/places/' + id).then(response => {
            const {data} = response;
            setTitle(data.title);
            setAddress(data.address);
            setAddedPhotos(data.photos);
            setDescription(data.description);
            setPerks(data.perks);
            setExtraInfo(data.extraInfo);
            setCheckIn(data.checkIn);
            setCheckOut(data.checkOut);
            setMaxGuests(data.maxGuests);
            setPrice(data.price);
        })
    }, [id]);


    function inputHeader(text) {
        return(
           <h2 className="text-2xl mt-4">{text}</h2> 
        )
    }
    function inputDescription(text) {
        return (
            <p className="text-gray-500 text-sm"></p>
        )
    }
    function preInput(header,description) {
        return(
            <>
                {inputHeader(header)}
                {inputDescription(description)}
            </>
        );
    }

    async function savePlace(ev) {
        ev.preventDefault();
        const placeData = {
            title ,address, addedPhotos, 
            description, perks, extraInfo, checkIn,
            checkOut, maxGuests,price
        }
        if(id) {
            // 更新
            await axios.put('/places', {
                id, ...placeData
            })
            setRedirect(true)
        } else {
            // 新增
            await axios.post('/places', {placeData})
            setRedirect(true)
        }
    }

    if (redirect) {
        return <Navigate to={'/account/places'}/>
    }

    return (
        <div>
            <AccountNav/>
            <form onSubmit={savePlace}>
                {preInput('標題','標題')}
                <input type="text" value={title} onChange={ev => setTitle(ev.target.value)} placeholder="標題"/>
                {preInput('地址','地址')}
                <input type="text" value={address} onChange={ev => setAddress(ev.target.value)} placeholder="地址"/>
                {preInput('照片', '照片')}
                <PhotosUploader addedPhotos={addedPhotos} onChange={setAddedPhotos}/>
                {preInput('簡介', '簡介')}
                <textarea value={description} onChange={ev => setDescription(ev.target.value)} className="w-full border my-1 py-2 px-3 rounded-2xl"></textarea>
                <div className="grid gap-2 grid-cols-2 md:grid-cols-3 lg:grid-cols-6 mt-2">
                    <Perks selected={perks} onChange={setPerks}/>
                </div>
                {preInput('特別須知','特別須知')}
                <textarea value={extraInfo} onChange={ev => setExtraInfo(ev.target.value)} className="w-full border my-1 py-2 px-3 rounded-2xl"></textarea>
                {preInput('入住&退房時間，最多訂房人數','入住&退房時間，最多訂房人數')}
                <div className="grid gap-2 grid-cols-2 md:grid-cols-4">
                    <div className="mt-2 -mb-1">
                        <h3>入住時間</h3>
                        <input value={checkIn} onChange={ev => setCheckIn(ev.target.value)} type="text" placeholder="14"/>
                    </div>
                    <div className="mt-2 -mb-1">
                        <h3>退房時間</h3>
                        <input value={checkOut} onChange={ev => setCheckOut(ev.target.value)} type="text" placeholder="11"/>
                    </div>
                    <div className="mt-2 -mb-1">
                        <h3>最多客房人數</h3>
                        <input value={maxGuests} onChange={ev => setMaxGuests(ev.target.value)} type="number" placeholder="14:00"/>
                    </div>
                    <div className="mt-2 -mb-1">
                        <h3>每晚費用</h3>
                        <input value={price} onChange={ev => setPrice(ev.target.value)} type="number" placeholder="輸入價格"/>
                    </div>
                </div>
                <button className="bg-4 text-1 my-10 w-100 h-10 rounded-full">
                    儲存
                </button>
            </form>
        </div>
    );
}
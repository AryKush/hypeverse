import {useEffect,useState} from "react";
import API from "../lib/api";

export default function Cart(){
  const [cart,setCart]=useState([]);
  useEffect(()=>setCart(JSON.parse(localStorage.getItem("cart"))||[]),[]);
  const total=cart.reduce((s,i)=>s+i.price,0);

  return (
    <div style={{padding:40}}>
      <h1>Cart</h1>
      {cart.map((i,k)=><div key={k}>{i.name}</div>)}
      <h3>Total ${total}</h3>
      <button onClick={()=>API.post("/orders",{items:cart,total})}>
        Place order
      </button>
    </div>
  );
}

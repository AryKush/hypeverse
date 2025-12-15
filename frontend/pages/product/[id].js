import {useRouter} from "next/router";
import {useEffect,useState} from "react";
import API from "../../lib/api";

export default function Product(){
  const {id}=useRouter().query;
  const [p,setP]=useState(null);
  const [color,setColor]=useState("");
  const [size,setSize]=useState("");

  useEffect(()=>{
    if(id) API.get(`/products/${id}`).then(r=>{
      setP(r.data);
      setColor(r.data.variants[0].color);
    });
  },[id]);

  if(!p) return "Loading...";

  const v=p.variants.find(x=>x.color===color);

  return (
    <div style={{padding:40}}>
      <h1>{p.name}</h1>
      {p.variants.map(v=>
        <button key={v.color} onClick={()=>setColor(v.color)}>{v.color}</button>
      )}
      <br/>
      {Object.keys(v.sizes).map(s=>
        <button key={s} onClick={()=>setSize(s)}>{s}</button>
      )}
      <br/><br/>
      <button onClick={()=>{
        const cart=JSON.parse(localStorage.getItem("cart"))||[];
        cart.push({name:p.name,price:p.price,color,size});
        localStorage.setItem("cart",JSON.stringify(cart));
        alert("Added");
      }}>Add to cart</button>
    </div>
  );
}

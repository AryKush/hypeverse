import {useEffect,useState} from "react";
import API from "../lib/api";
import Link from "next/link";

export default function Home(){
  const [products,setProducts]=useState([]);
  useEffect(()=>{
    API.get("/products").then(r=>setProducts(r.data));
  },[]);
  return (
    <div style={{padding:40}}>
      <h1>HYPEVERSE</h1>
      {products.map(p=>(
        <Link key={p._id} href={`/product/${p._id}`}>
          <div>{p.name} — ${p.price}</div>
        </Link>
      ))}
    </div>
  );
}

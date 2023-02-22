import React,{useState,useEffect} from 'react';
import axios from "axios";
import fireDb from "../firebase";
import {Link} from "react-router-dom";
import {useLocation} from "react-router-dom";
// import Telegram from 'telegram-send-message';
// import {Link} from "telegram-send-message";
import "./Home.css";
import {set} from "firebase/database";
import {toast} from "react-toastify";

const Home = () => {
    const [data, setData]=useState({});
    const [count, setCount]=useState(1);

    var countbtn=function(){
      if(count==1){
        setCount(count+1);
      }else{
        setCount(count-1);
      }
    }
    // alert(count);

    useEffect(()=>{
        fireDb.child("contacts").on("value", (snapshot)=>{
          console.log(snapshot);
          if(snapshot.val()!==null){
            setData({...snapshot.val() });
          }else{
            setData({});
          }
        });
        return()=>{
          setData({});
        }
    },[]);
  return (
    <div>
        <h2>Home</h2>




        <div className='upload'>
            <div className='upload1' onClick={countbtn}>
                <img src="https://cdn-icons-png.flaticon.com/512/126/126477.png" width="60%"></img>
            </div>
            <div className='upload2' style={{display:`${count==1?"none":""}`}}>
                Create post
            </div>
            <div className='upload3' style={{display:`${count==1?"none":""}`}}>
                Your profile
            </div>
        </div>
    </div>
  )
}

export default Home
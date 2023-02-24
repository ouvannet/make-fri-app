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
import { storage } from '../firebase';
import {ref,uploadBytes,getDownloadURL} from "firebase/storage";
import { from } from 'form-data';

const initialState = {
  img:"",
  name:"",
  age:"",
  message:"",
}

const Home = () => {
  const [state,setState]=useState(initialState);
    const [data, setData]=useState({});
    const [count, setCount]=useState(1);
    const [count1, setCount1]=useState(1);
    const [image, setImage] = useState(null);
    const [url, setUrl] = useState(null);
    const [loca,setloca]=useState();


    function genRandonString(length) {
      var chars = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
      var charLength = chars.length;
      var result = '';
      for ( var i = 0; i < length; i++ ) {
         result += chars.charAt(Math.floor(Math.random() * charLength));
      }
      return result;
    }

    const handleImageChange = (e) =>{
      if(e.target.files[0]){
        setImage(e.target.files[0]);
      }
       const {name,value}=e.target;
       setloca(value);
       alert(image);
       alert(value);
       console.log(state);
     }
     var ii=0;
     if(image!=null){
      console.log("img");
      console.log(image);
      const imageRef = ref(storage, genRandonString(60));
      uploadBytes(imageRef, image).then(() =>{
        getDownloadURL(imageRef).then((url) =>{
          setUrl(url);
          setState({...state, url});
          
        }).catch(error =>{
          console.log(error.message, "error image url");
        });
        setImage(null);
        
      })
      .catch(error =>{
        console.log(error.message);
      });
      setImage(null);
    }
     console.log(image);

    var countbtn=function(){
      if(count==1){
        setCount(count+1);
      }else{
        setCount(count-1);
      }
    }
    var countbtn1=function(){
      if(count1==1){
        setCount1(count1+1);
      }else{
        setCount1(count1-1);
      }
    }
    // alert(count1);

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

        <div className='upload'>
            <div className='upload1' onClick={countbtn}>
                <img src="https://cdn-icons-png.flaticon.com/512/126/126477.png" width="60%"></img>
            </div>
            <div className='upload2' onClick={countbtn1} style={{display:`${count==1?"none":""}`}}>
                Create post
            </div>
            <div className='upload3' style={{display:`${count==1?"none":""}`}}>
                Your profile
            </div>
        </div>
        <div className='CreatePost' style={{bottom:`${count1==1?"-603px":"0px"}`,display:`${count1==1?"none":""}`}}>
            <div style={{border:"0px solid black",height:"5%",textAlign:"center",fontSize:"21px"}}>Upload<div onClick={countbtn1} style={{width:"30px",height:"30px",float:"right",border:"0px solid black"}}>X</div></div>

            <div style={{width:"100%",border:"0px solid black",height:"95%",overflow:"scroll"}}>
              <label for="file" class="file-style">
              <img src="https://i.pinimg.com/originals/30/9a/e5/309ae59b0f6d42210ce1f0ffb6c4db83.jpg" width="100px" style={{borderRadius:"10px",marginRight:"5px"}} />
              <img src="https://i.pinimg.com/originals/a5/65/b3/a565b32ffdcd817364464481d2d58358.jpg" width="67px" style={{borderRadius:"10px"}}  />
              <p>Upload Photo</p>
              <img src="https://i.pinimg.com/originals/71/c9/21/71c92110d2a9871147082458f203aa96.jpg" width="100%" style={{borderRadius:"10px"}}></img>
              </label>
              <input  type="file" id="file" name='img' onChange={handleImageChange}/>
              
              <br/>
              <input type="text" className='inputform' placeholder='Name...' maxlength="20" size="20"></input><br />
              <br/>
              <input type="text" className='inputform' placeholder='Age...' maxlength="4" size="4"></input><br />
              <br/>
              <input type="text" className='inputform' placeholder='FaceBook...'></input><br />

              <textarea className='inputform2' placeholder='Message' rows="4" cols="50"></textarea><br></br>

              <button className='inputform3'>Send</button>

              <br></br>
              <br></br>
            </div>
        </div>
    </div>
  )
}

export default Home
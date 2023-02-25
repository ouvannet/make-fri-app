import React,{useState,useEffect} from 'react';
import axios from "axios";
import fireDb from "../firebase";
import {Link} from "react-router-dom";
import {useLocation} from "react-router-dom";
import {useNavigate, useParams} from "react-router-dom";
// import Telegram from 'telegram-send-message';
// import {Link} from "telegram-send-message";
import "./Home.css";
import {set} from "firebase/database";
import {toast} from "react-toastify";
import { storage } from '../firebase';
import {ref,uploadBytes,getDownloadURL} from "firebase/storage";
import { from } from 'form-data';

const initialState = {
  url:"",
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
    const{name,img,age}=state;
    const histor=useNavigate();


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
     console.log(url);

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

    console.log(data);
    const handleInputChange=(e)=>{
      const {name, value}=e.target;
      setState({...state,[name]: value});
    };
    console.log(state);
    const handleSubmit=(e)=>{
      e.preventDefault();
      if(!name || !age || !url){
        toast.error("Please provide value in each input field");
      }else{
        fireDb.child("contacts").push(state,(err)=>{
          if(err){
            toast.error(err);
          }else{
            toast.success("Contact Added Successfully");
          }
        });
        setTimeout(window.location.reload(false),500);
      }
      // window.location.reload(false);
    };
  return (
    <div>
      <div className='show_viewer'>
      {Object.keys(data).reverse().map((id, index)=>{
              
              return(
                <div className='containerpic'>
                  <img src={data[id].url} width="100%"/>
                    <div className='forname'>{data[id].name}</div>
                    <div className='forname1'>Age: {data[id].age}<img src="https://img.utdstc.com/icon/fe0/ab6/fe0ab67fa0de2b2681602db5708a076f50dd21106e0c2d38b9661875a37e235e:200" width="16px" style={{marginTop:"5px",borderRadius:"5px",marginLeft:"10px"}}/> {data[id].facebook}<br/>{data[id].message}</div>
                </div>
              )

      })}

      </div>






















        <div className='upload'>
            <div className='upload1' onClick={countbtn}>
            <video width="90%" style={{borderRadius:"50%"}} preload="none"  autoplay="autoplay" loop="true" muted="muted" playsinline="">
              <source src="https://cdn-icons-mp4.flaticon.com/512/6172/6172518.mp4" type="video/mp4" />
            </video>
                {/* <img src="https://cdn-icons-png.flaticon.com/512/126/126477.png" width="60%"></img> */}
            </div>
            <div className='upload2' onClick={countbtn1} style={{display:`${count==1?"none":""}`}}>
              <video width="20%" style={{borderRadius:"50%",marginRight:"6px"}} preload="none"  autoplay="autoplay" loop="true" muted="muted" playsinline="">
                <source src="https://cdn-icons-mp4.flaticon.com/512/7740/7740748.mp4" type="video/mp4" />
              </video>
              Create post
            </div>
            <div className='upload3' style={{display:`${count==1?"none":""}`}}>
              <video width="20%" style={{borderRadius:"50%",marginRight:"6px"}} preload="none"  autoplay="autoplay" loop="true" muted="muted" playsinline="">
                <source src="https://cdn-icons-mp4.flaticon.com/512/7740/7740748.mp4" type="video/mp4" />
              </video>
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
              <img src={`${url?url:"https://i.pinimg.com/originals/71/c9/21/71c92110d2a9871147082458f203aa96.jpg"}`} width="100%" style={{borderRadius:"10px"}}></img>
              </label>
              <input  type="file" id="file" name='img' onChange={handleImageChange}/>
              <br/>
              <input
               type="text" 
               className='inputform' 
               id="name"
               name="name"
               onChange={handleInputChange}
               placeholder='Name...' 
               maxlength="20" 
               size="20"></input><br />
              <br/>
              <input
               type="text" 
               className='inputform' 
               id="age"
               name="age"
               onChange={handleInputChange}
               placeholder='Age...' 
               maxlength="4" 
               size="4"></input><br />
              <br/>
              <input
               type="text"
               className='inputform' 
               id="facebook"
               name="facebook"
               onChange={handleInputChange}
               placeholder='FaceBook...'></input><br />

              <textarea
               className='inputform2' 
               id="message"
               name="message"
               onChange={handleInputChange}
               placeholder='Message...' 
               rows="4" 
               cols="50"></textarea><br></br>

              <button onClick={handleSubmit} className='inputform3'>
                Send
              <img  alt="Send SVG Vector Icon" src="https://www.svgrepo.com/show/230979/send.svg"  decoding="async" height="90%"/>
              <img  alt="Send SVG Vector Icon" src="https://www.svgrepo.com/show/230979/send.svg"  decoding="async" height="90%"/>
              </button>

              <br></br>
              <br></br>
            </div>
        </div>
    </div>
  )
}

export default Home
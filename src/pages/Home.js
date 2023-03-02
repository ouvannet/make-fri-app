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
  name1:"",
  password:"",
  age:"",
  message:"",
  react1:0,
  react2:0,
  react3:0,
  react4:0,
}


const Home = () => {
    const [state,setState]=useState(initialState);
    const [data, setData]=useState({});
    const [data1, setData1]=useState({});
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
      //  alert(image);
      //  alert(value);
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

    useEffect(()=>{
      fireDb.child("user").on("value", (snapshot)=>{
        console.log(snapshot);
        if(snapshot.val()!==null){
          setData1({...snapshot.val() });
        }else{
          setData1({});
        }
      });
      return()=>{
        setData1({});
      }
    },[]);
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
      
      var countbtn2=function(e){
        Object.keys(data).map((id,index)=>{
          if(data[id].name==sessionStorage.getItem("Username")){
                fireDb.child(`contacts/${id}`).remove((err)=>{
                  if(err){
                    toast.error(err)
                  }else{
                    toast.success("Contact success delete!");
                  }
                })
          }
        })
        
        Object.keys(data1).map((id,index)=>{
          if(data1[id].name==sessionStorage.getItem("Username")){
            console.log(data1);
            e.preventDefault();
            const initialState33 = {
              url:data1[id].url,
              name1:data1[id].name1,
              age:data1[id].age,
              message:data1[id].message,
              facebook:data1[id].facebook,
              name:data1[id].name,
              password:data1[id].password,
              react1:0,
              react2:0,
              react3:0,
              react4:0,
            }
            fireDb.child("contacts").push(initialState33,(err)=>{
              if(err){
                toast.error(err);
              }else{
                toast.success("Contact Added Successfully");
              }
            });
          }
        })
      }
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

    const react=(name,name1,age,facebook,message,password,react1,react2,react3,react4,url,idd)=>{
      // alert(name+name1+age+facebook+message+password+react1+react2+react3+react4);
      // console.log(idd);
      const initialState22 = {
        name: name,
        password:password,
        url:url,
        name1:name1,
        age:age,
        message:message,
        react1:react1,
        react2:react2,
        react3:react3,
        react4:react4,
      }
      fireDb.child(`contacts/${idd}`).set(initialState22,(err)=>{
      });
    }
  return (
    <div>
      <div className='show_viewer'>
      {Object.keys(data).reverse().map((id, index)=>{
              
              return(
                <div className='containerpic'>
                    <img src={data[id].url} width="100%" style={{borderRadius:"5px"}}/>
                    <div className='forname'>{data[id].name1}</div>
                    <div className='forname1'>Age: {data[id].age}<img src="https://img.utdstc.com/icon/fe0/ab6/fe0ab67fa0de2b2681602db5708a076f50dd21106e0c2d38b9661875a37e235e:200" width="16px" style={{marginTop:"5px",borderRadius:"5px",marginLeft:"10px"}}/> {data[id].facebook}<br/>{data[id].message}</div>
                    <div style={{width:"100%",border:"0px solid black",height:"40px",marginTop:"5px",display:"flex"}}>
                      <table border="0px" onClick={()=>react(data[id].name,data[id].name1,data[id].age,data[id].facebook,data[id].message,data[id].password,data[id].react1+1,data[id].react2,data[id].react3,data[id].react4,data[id].url,id)} style={{height:"100%",background:"#28f2e1",borderRadius:"5px"}}>
                        <tbody>
                          <tr>
                            <td><img src='https://cdn-icons-png.flaticon.com/512/2589/2589175.png' height="30px"></img></td>
                            <td width="60%">{data[id].react1}</td>
                          </tr>
                        </tbody>
                      </table>
                      <table border="0px" onClick={()=>react(data[id].name,data[id].name1,data[id].age,data[id].facebook,data[id].message,data[id].password,data[id].react1,data[id].react2+1,data[id].react3,data[id].react4,data[id].url,id)} style={{height:"100%",background:"#28f2e1",marginLeft:"10px",borderRadius:"5px"}}>
                        <tbody>
                          <tr>
                            <td><img src='https://cdn-icons-png.flaticon.com/512/2589/2589220.png' height="30px"></img></td>
                            <td width="60%">{data[id].react2}</td>
                          </tr>
                        </tbody>
                      </table>
                      <table border="0px" onClick={()=>react(data[id].name,data[id].name1,data[id].age,data[id].facebook,data[id].message,data[id].password,data[id].react1,data[id].react2,data[id].react3+1,data[id].react4,data[id].url,id)} style={{height:"100%",background:"#28f2e1",marginLeft:"10px",borderRadius:"5px"}}>
                        <tbody>
                          <tr>
                            <td><img src='https://cdn-icons-png.flaticon.com/512/2307/2307753.png' height="25px"></img></td>
                            <td width="60%">{data[id].react3}</td>
                          </tr>
                        </tbody>
                      </table>
                      <table border="0px" onClick={()=>react(data[id].name,data[id].name1,data[id].age,data[id].facebook,data[id].message,data[id].password,data[id].react1,data[id].react2,data[id].react3,data[id].react4+1,data[id].url,id)} style={{height:"100%",background:"#28f2e1",marginLeft:"10px",borderRadius:"5px"}}>
                        <tbody>
                          <tr>
                            <td><img src='https://cdn-icons-png.flaticon.com/512/2307/2307739.png' height="25px"></img></td>
                            <td width="60%">{data[id].react4}</td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                </div>
              )

      })}

      </div>





        <div className='upload'>
            <div className='upload1' onClick={countbtn}>
            <video width="90%" style={{borderRadius:"50%"}} preload="none"  autoPlay="autoplay" loop={true} muted="muted" >
              <source src="https://cdn-icons-mp4.flaticon.com/512/6172/6172518.mp4" type="video/mp4" />
            </video>
                {/* <img src="https://cdn-icons-png.flaticon.com/512/126/126477.png" width="60%"></img> */}
            </div>
            <div className='upload2' onClick={countbtn1} style={{display:`${count==1?"none":""}`}}>
              <video width="20%" style={{borderRadius:"50%",marginRight:"6px"}} preload="none"  autoPlay="autoplay" loop={true} muted="muted" >
                <source src="https://cdn-icons-mp4.flaticon.com/512/7740/7740748.mp4" type="video/mp4" />
              </video>
              Create post
            </div>
            <div className='upload3' onClick={countbtn2} style={{display:`${count==1?"none":""}`}}>
              <video width="20%" style={{borderRadius:"50%",marginRight:"6px"}} preload="none"  autoPlay="autoplay" loop={true} muted="muted">
                <source src="https://cdn-icons-mp4.flaticon.com/512/7740/7740748.mp4" type="video/mp4" />
              </video>
                Your profile
            </div>
        </div>
        <div className='CreatePost' style={{bottom:`${count1==1?"-603px":"0px"}`,display:`${count1==1?"none":""}`}}>
            <div style={{border:"0px solid black",height:"5%",textAlign:"center",fontSize:"21px"}}>Upload<div onClick={countbtn1} style={{width:"30px",height:"30px",float:"right",border:"0px solid black"}}>X</div></div>

            <div style={{width:"100%",border:"0px solid black",height:"95%",overflow:"scroll"}}>
              <label htmlFor="file" className="file-style">
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
               maxLength="20" 
               size="20"></input><br />
              <br/>
              <input
               type="text" 
               className='inputform' 
               id="age"
               name="age"
               onChange={handleInputChange}
               placeholder='Age...' 
               maxLength="4" 
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
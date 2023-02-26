import React,{useState,useEffect} from 'react';
import fireDb from "../firebase";
import {toast} from "react-toastify";
import {set} from "firebase/database";
import { storage } from '../firebase';
import {ref,uploadBytes,getDownloadURL} from "firebase/storage";
import { from } from 'form-data';

const initialState = {
    name: "",
    password:"",
    url:"",
    name1:"",
    age:"",
    message:"",
    react1:0,
    react2:0,
    react3:0,
    react4:0,
  }
  
  const initialState1 = {
    name: sessionStorage.getItem("Username"),
    password: sessionStorage.getItem("Password"),
    url:sessionStorage.getItem("url"),
    name1:sessionStorage.getItem("name1"),
    age:sessionStorage.getItem("age"),
    message:sessionStorage.getItem("message"),
    facebook:sessionStorage.getItem("facebook"),
    react1:0,
    react2:0,
    react3:0,
    react4:0,
  }

const Login = () => {
    const [state,setState]=useState(initialState);
    const [state1,setState1]=useState(initialState1);
    const [userinput1, setUserinput1] = useState('');
    const [userinput2, setUserinput2] = useState('');
    const [getinput, setGetinput] = useState(userInput1);
    const [data, setData]=useState({});
    const [image, setImage] = useState(null);
    const [url, setUrl] = useState(null);
    const [loca,setloca]=useState();
    const [iddata,setIddata]=useState('');
    
    const{name,password,name1,img,age}=state;
    // const{name1,img,age}=state;
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
            setState1({...state1, url});
            
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
    
       console.log(data);
        const handleInputChange=(e)=>{
          const {name, value}=e.target;
          setState1({...state1,[name]: value});
        };
        console.log(state);
    
    var countUser=0;
    useEffect(()=>{
      fireDb.child("user").on("value", (snapshot)=>{
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
    console.log("dadat");
    console.log(data);
    console.log(state);
    console.log(state1);

    var userInput1 = (e)=>{
        const {name, value}=e.target;
        setState({...state,[name]: value});
        console.log(state);

        setUserinput1(e.target.value);
    }
    var userInput2 = (e)=>{
        const {name, value}=e.target;
        setState({...state,[name]: value});
        console.log(state);

        setUserinput2(e.target.value);
    }

  
    var userLogin = (e)=>{
        console.log(userinput1);
        console.log(userinput2);
        
        e.preventDefault();
        // alert(name);
        if(!name || !password){
          toast.error("Please provide value in each input field");
        }else{
          sessionStorage.setItem("Login", userinput1+userinput2);
          sessionStorage.setItem("Username",userinput1);
          sessionStorage.setItem("Password",userinput2);
          {Object.keys(data).map((id, index)=>{
            if(data[id].name==state.name){
              countUser++;
            }
          })}
          if(countUser==0){
            // alert(countUser);
            fireDb.child("user").push(state,(err)=>{
              if(err){
                toast.error(err);
              }else{
                toast.success("Contact Added Successfully");
              }
            });
          }else{
            toast.success("Register");
          }
          setTimeout(window.location.reload(false),500);
        }
        // window.location.reload(false);
    }

    {Object.keys(data).map((id, index)=>{
      if(data[id].name==sessionStorage.getItem("Username") && data[id].password==sessionStorage.getItem("Password")){
        sessionStorage.setItem("name1",data[id].name1);
        sessionStorage.setItem("age",data[id].age);
        sessionStorage.setItem("facebook",data[id].facebook);
        sessionStorage.setItem("message",data[id].message);
        sessionStorage.setItem("url",data[id].url);
      }
    })}


    const setProfile=(e)=>{
      e.preventDefault();
      alert(name1);
      // if(!name1){
      //   toast.error("Please provide value in each input field");
      // }else{
        {Object.keys(data).map((id, index)=>{
          if(data[id].name==sessionStorage.getItem("Username") && data[id].password==sessionStorage.getItem("Password")){
              fireDb.child(`user/${id}`).set(state1,(err)=>{
                if(err){
                  toast.error(err);
                }else{
                  toast.success("Contact Added Successfully");
                }
              });
              setTimeout(()=> window.location.reload(false),500);
              
            }
            console.log(data[id]);
          })}
        // }
      // window.location.reload(false);
    };
  return (
    <div style={{marginTop:"10px"}}>
      {sessionStorage.getItem("Login")==null || sessionStorage.getItem("Login")=="" ?(
        <form style={{margin:"auto",padding:"15px",maxWidth:"400px",alignContent:"center",}}>
            <label htmlFor='name' style={{fontSize:"20px"}}>Name</label><br/>
            <input type="text" id="name" name='name' onChange={userInput1} placeholder="Your name..." style={{border:"2px solid rgb(255 106 0)",width:"80%",height:"30px",borderRadius:"5px",fontSize:"19px",marginBottom:"10px"}}></input><br/>

            <label htmlFor='password' style={{fontSize:"20px"}}>Password</label><br/>
            <input type="text" id="password" name='password' onChange={userInput2} placeholder="Your password..." style={{border:"2px solid rgb(255 106 0)",width:"80%",height:"30px",borderRadius:"5px",fontSize:"19px",marginBottom:"10px"}}></input><br/>

            <button onClick={userLogin} className="btn_submit" style={{border:"2px solid rgb(255 106 0)",width:"50%",height:"30px",borderRadius:"5px",fontSize:"19px"}}>click</button>
        </form>
      ):(
        Object.keys(data).map((id, index)=>{
          return(
            <div style={{width:"100%",border:"0px solid black",height:"95%",overflow:"scroll"}}>
                  <label htmlFor="file" className="file-style">
                  <img src="https://i.pinimg.com/originals/30/9a/e5/309ae59b0f6d42210ce1f0ffb6c4db83.jpg" width="100px" style={{borderRadius:"10px",marginRight:"5px"}} />
                  <img src="https://i.pinimg.com/originals/a5/65/b3/a565b32ffdcd817364464481d2d58358.jpg" width="67px" style={{borderRadius:"10px"}}  />
                  <p>Upload Photo</p>
                  <img src={`${url?url:data[id].url}`} width="100%" style={{borderRadius:"10px"}}></img>
                  </label>
                  <input
                    type="file" 
                    id="file" name='img' 
                    onChange={handleImageChange}
                    />
                  <br/>
                  <input
                  type="text" 
                  className='inputform' 
                  id="name1"
                  name="name1"
                  onChange={handleInputChange}
                  placeholder={data[id].name1 != ""?data[id].name1:"Name..."} 
                  maxLength="20" 
                  size="20"></input><br />
                  <br/>
                  <input
                  type="text" 
                  className='inputform' 
                  id="age"
                  name="age"
                  onChange={handleInputChange}
                  placeholder={data[id].age != ""?data[id].age:"Age..."} 
                  maxLength="4" 
                  size="4"></input><br />
                  <br/>
                  <input
                  type="text"
                  className='inputform' 
                  id="facebook"
                  name="facebook"
                  onChange={handleInputChange}
                  placeholder={data[id].facebook != ""?data[id].facebook:"Facebook..."} ></input><br />

                  <textarea
                  className='inputform2' 
                  id="message"
                  name="message"
                  onChange={handleInputChange}
                  placeholder={data[id].message != ""?data[id].message:"Message..."}  
                  rows="4" 
                  cols="50"></textarea><br></br>

                  <button  className='inputform3' onClick={setProfile}>
                    Save
                  <img  alt="Send SVG Vector Icon" src="https://www.svgrepo.com/show/230979/send.svg"  decoding="async" height="90%"/>
                  <img  alt="Send SVG Vector Icon" src="https://www.svgrepo.com/show/230979/send.svg"  decoding="async" height="90%"/>
                  </button>
                  <div style={{marginBottom:"100px"}}/>
                </div>

          )

        })
      )}
    </div>
  )
}

export default Login
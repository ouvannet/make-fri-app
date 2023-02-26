import React,{useState,useEffect} from 'react';
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
  react1:0,
  react2:0,
  react3:0,
  react4:0,
}
const AddEdit = () => {
  const [state,setState]=useState(initialState);
  const [image, setImage] = useState(null);
  const [url, setUrl] = useState(null);
  const [loca,setloca]=useState();
  const [data, setData]=useState({});

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

   console.log(data);
    const handleInputChange=(e)=>{
      const {name, value}=e.target;
      setState({...state,[name]: value});
    };
    console.log(state);

  return (
    <div style={{width:"100%",border:"0px solid black",height:"95%",overflow:"scroll"}}>
              <label htmlFor="file" className="file-style">
              <img src="https://i.pinimg.com/originals/30/9a/e5/309ae59b0f6d42210ce1f0ffb6c4db83.jpg" width="100px" style={{borderRadius:"10px",marginRight:"5px"}} />
              <img src="https://i.pinimg.com/originals/a5/65/b3/a565b32ffdcd817364464481d2d58358.jpg" width="67px" style={{borderRadius:"10px"}}  />
              <p>Upload Photo</p>
              <img src={`${url?url:"https://i.pinimg.com/originals/71/c9/21/71c92110d2a9871147082458f203aa96.jpg"}`} width="100%" style={{borderRadius:"10px"}}></img>
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

              <button  className='inputform3'>
                Send
              <img  alt="Send SVG Vector Icon" src="https://www.svgrepo.com/show/230979/send.svg"  decoding="async" height="90%"/>
              <img  alt="Send SVG Vector Icon" src="https://www.svgrepo.com/show/230979/send.svg"  decoding="async" height="90%"/>
              </button>

              <br></br>
              <br></br>
            </div>
  )
}

export default AddEdit
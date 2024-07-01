import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react'
import { toast } from 'react-toastify';
import { Context } from '../main';
import { Navigate } from 'react-router-dom';

const Update = () => {
    const { isAuthenticated, setIsAuthenticated } = useContext(Context)
    const [user, setUser] = useState([])
    const [firstname, setFirstName] = useState("")
    const [lastname, setLastName] = useState("")
    const [email, setEmail] = useState("")
    const [phone, setPhone] = useState("")
    const [fnamefun, setFnameFun] = useState(true)
    const [lnamefun, setLnameFun] = useState(false)
    const [emailfun, setEmailFun] = useState(false)
    const [phonefun, setPhoneFun] = useState(false)



    useEffect(() => {
        const fetchUser = async () => {
            const { data } = await axios.get(
                "http://localhost:8000/api/v1/user/patient/me",
                { withCredentials: true }
            );
            setUser(data.user);
        };
        fetchUser();
    }, []);

   

    const UpdateValue = async (e) => {
        try {
            e.preventDefault();
            if(fnamefun){
                const userData = {
                    firstname: firstname,
                };
                await axios.put(`http://localhost:8000/api/v1/user/update/${user._id}`, userData,{withCredentials:true}).then((res)=>{
                    toast.success(res.data.message)
                })
            }
            else if(lnamefun){
                const userData = {
                    lastname: lastname,
                    
                };
                await axios.put(`http://localhost:8000/api/v1/user/update/${user._id}`, userData,{withCredentials:true}).then((res)=>{
                    toast.success(res.data.message)
                })
            }
            else if(emailfun){
                const userData = {
                    email: email,
      
                };
                await axios.put(`http://localhost:8000/api/v1/user/update/${user._id}`, userData,{withCredentials:true}).then((res)=>{
                    toast.success(res.data.message)
                })
            }
            else if(phonefun){
                const userData = {
                    phone: phone,  
                };
                await axios.put(`http://localhost:8000/api/v1/user/update/${user._id}`, userData,{withCredentials:true}).then((res)=>{
                    toast.success(res.data.message)
                })
            }
            

        } catch (error) {
            toast.error(error.response.data.message)
        }
    }

    if (!isAuthenticated) {
        return <Navigate to={"/login"} />
    }
    
    const change1=()=>{
        setFnameFun(true)
        setLnameFun(false)
        setEmailFun(false)
        setPhoneFun(false)
    }
    const change2=()=>{
        setLnameFun(true)
        setFnameFun(false)
        setEmailFun(false)
        setPhoneFun(false)
    }
    const change3=()=>{
        setEmailFun(true)
        setLnameFun(false)
        setFnameFun(false)
        setPhoneFun(false)
    }
    const change4=()=>{
        setPhoneFun(true)
        setLnameFun(false)
        setEmailFun(false)
        setFnameFun(false)
    }
    
    return (
        <section className='dashboard'>
            <h3>Update Data</h3>
            <p>Click the button among which, field you want to update</p>
            <div className="update">
                    <button className="btn"onClick={change1}>First Name</button>
                    <button className="btn"onClick={change2}>Last Name</button>
                    <button className="btn"onClick={change3}>Email </button>
                    <button className="btn"onClick={change4}>Phone</button>

                <form onSubmit={UpdateValue}>
                    <div style={fnamefun===true ?({display:"flex"}):{display:"none"}}>
                        <input type="text"
                            placeholder='First Name'
                            value={firstname}
                            onChange={(e) => setFirstName(e.target.value)}
                        />
                    </div>
                    <div style={lnamefun===true ?({display:"flex"}):{display:"none"}}>
                        <input type="text"
                            value={lastname}
                            placeholder='Last Name'
                            onChange={(e) => setLastName(e.target.value)}
                        />
                    </div>
                    <div style={emailfun===true ?({display:"flex"}):{display:"none"}}>
                        <input type="email"
                            value={email}
                            placeholder='Email'
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </div>
                    <div style={phonefun===true ?({display:"flex"}):{display:"none"}}>
                        <input type="text"
                            value={phone}
                            placeholder='Phone'
                            onChange={(e) => setPhone(e.target.value)}
                        />
                    </div>
                    <button type="submit" className="Submit">Update</button>
                </form>
            </div>


        </section>
    )
}

export default Update

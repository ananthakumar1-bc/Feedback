import React from "react";
import useState from "react";

const FeedbackForm = () => {
    const [formData,setFormData] = useState({name:"",email:"",rating:""});

    const handleChange = (e) => {
        console.log(e.target.name);
        setFormData({...formData,[e.target.name]:e.target.value});
    }
    
    const handleSubmit = () =>{
     //e.preventDefault();
    }

    return(
        <div>
            <form onSubmit={handleSubmit} >
             <h2>Data system</h2>
                <input type="text" name="name" onChange={handleChange}></input>
                <input type="text" name="email" onChange={handleChange}></input>
                <input type="text" name="rating" onChange={handleChange}></input>
            </form>
        </div>
    );
}

export default FeedbackForm;
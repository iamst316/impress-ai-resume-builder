import { useDispatch, useSelector } from 'react-redux';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { addResume, deleteResume } from '../redux/slices/resume';
import {suggestions} from '../skills';



export default function(){
    const dispatch = useDispatch();
    const navigate = useNavigate();
    
    const editId = useSelector((state)=>{
        return state.selectid;
    })

    const store = useSelector((state)=>{
        return state.resumes;
    })
    // console.log(store[editId[editId.length-1]].firstname)
    const [selected, setSelected] = useState([]);
    const [options, setOptions]  = useState([]);
    const [userData, setData] = useState(store[editId[editId.length-1]]);
    const [education, addEducation] = useState([]);
    const [institution,setInstitution] = useState("");
    const [degree, setDegree] = useState("");
    const [year, setYear] = useState("");
    const [experience, addExperience] = useState([]);
    const [company,setCompany] = useState("");
    const [designation, setDesignation] = useState("");
    const [tenure, setTenure] = useState("");
    
    
    function HandleSubmit(e){
        e.preventDefault();
        userData.skills = selected;
        
        userData.education = education;
        userData.experience = experience;

        dispatch(deleteResume(editId.length-1))
        dispatch(addResume(userData));
        // console.log(store);
        navigate('/view')
    }

    

    function AddEducationField(){
        addEducation([...education,{
            institution: "",
            year: "",
            degree: ""
        }])
    }

    function AddExperienceField(){
        addExperience([...experience,{
            company: "",
            year: "",
            designation: ""
        }])
    }

    

    function FindSkill(e){
        setOptions([])
        e = e.toLocaleLowerCase();
        for(let i of suggestions){
            let label = i.label.toLocaleLowerCase();
            if (label.includes(e)){
                let isThere = false;
                for (let x of options){
                    if(x===i.label) isThere = true;
                }
                if(!isThere) setOptions([...options,i.label])
            }
        }
        // console.log(options)
    }


    return(<>
        <div id='create-main'>
            <h1 id='create-title'>Edit Resume</h1>
            <h2 onClick={()=> navigate('/view')}>Your Resumes</h2>
            <form onSubmit={HandleSubmit}>
                <input type="text" placeholder="Enter Your First Name" className="form-control" onChange={(e)=> userData.firstname = e.target.value}/>

                <input type="text" placeholder="Enter Your Last Name" className="form-control" onChange={(e)=> userData.lastname = e.target.value}/>

                <input type="email" placeholder="Enter Your E-Mail Address" className="form-control" onChange={(e)=> userData.email = e.target.value}/>

                <input type="text" placeholder="Enter Your Address" className="form-control" onChange={(e)=> userData.address = e.target.value}/>

                <input type="tel" placeholder="Enter Your Mobile Number" className="form-control" onChange={(e)=> userData.phone = e.target.value}/>

                <h2 id='ed-title'>Education</h2>
                <>
                    <input type='text' placeholder='Institution' onChange={(e)=>{
                        education[0].institution = e.target.value;
                    }}/>
                    <input placeholder='Year' type='text' onChange={(e)=>{
                        education[0].year = e.target.value;
                    }}/>
                    <input placeholder='Degree' type='text' onChange={(e)=>{
                        education[0].degree = e.target.value;
                    }}/>
                </>

                {education.map((ed,idx)=>{
                    return <><input type='text' placeholder='Institution' onChange={(e)=>{
                        ed.institution = e.target.value;
                    }}/><input placeholder='Year' type='text' onChange={(e)=>{
                        ed.year = e.target.value;
                    }}/><input placeholder='Degree' type='text' onChange={(e)=>{
                        ed.degree = e.target.value;
                    }}/></>  && idx!=0
                })}
                <button type="button" onClick={AddEducationField} class="btn btn-outline-primary">Add Education</button>

                <label>Work Experience</label>
                <>
                    <input type='text' placeholder='Company Name' onChange={(e)=>{
                        experience[0].company = e.target.value;
                    }}/>
                    <input placeholder='Tenure' type='text' onChange={(e)=>{
                        experience[0].tenure= e.target.value;
                    }}/>
                    <input placeholder='Designation' type='text' onChange={(e)=>{
                        experience[0].designation = e.target.value;
                    }} />
                </>

                {experience.map((exp,idx)=>{
                    return <><input type='text' placeholder='Company Name' onChange={(e)=>{
                        exp.company = e.target.value;
                    }}/><input placeholder='Tenure' type='text' onChange={(e)=>{
                        exp.tenure = e.target.value;
                    }}/><input placeholder='Designation' type='text' onChange={(e)=>{
                        exp.designation = e.target.value;
                    }}/></> && idx!=0
                })}
                <button type="button" onClick={AddExperienceField} class="btn btn-outline-primary">Add Experience</button>

                <label>Skills</label>
                <input type='text' placeholder='Add Skill' onChange={(e)=>FindSkill(e.target.value)} />
                <div>
                    {options.map((i)=>{
                        return <h1 onClick={()=>{
                            let isThere = false;
                            for (let x of selected){
                                if(x===i) isThere = true;
                            }
                            if(!isThere) setSelected([...selected,i])
                            // console.log(selected)
                        }}>{i}</h1>
                    })}
                </div>


                <button className="btn btn-outline-success">Create Resume</button>
            </form>
        </div>
    </>)
}


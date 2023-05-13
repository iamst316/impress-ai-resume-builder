import { useDispatch, useSelector } from 'react-redux';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { addResume } from '../redux/slices/resume';
import {suggestions} from '../skills';



export default function ResumeForm(){
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [selected, setSelected] = useState([]);
    const [options, setOptions]  = useState([]);
    const [userData, setData] = useState([]);
    const [education, addEducation] = useState([{
        institution: "",
        year: "",
        degree: ""
    }]);
    const [institution,setInstitution] = useState("");
    const [degree, setDegree] = useState("");
    const [year, setYear] = useState("");
    const [experience, addExperience] = useState([{
        company: "",
        tenure: "",
        designation: ""
    }]);
    const [company,setCompany] = useState("");
    const [designation, setDesignation] = useState("");
    const [tenure, setTenure] = useState("");
    const store = useSelector((state)=>{
        return state.resumes;
    })
    
    
    function HandleSubmit(e){
        e.preventDefault();
        userData.skills = selected;
        addEducation((education)=>[
            {
                institution: institution,
                year: year,
                degree: degree
            },
            ...education
        ])
        addExperience([
            {
                company: company,
                tenure: tenure,
                designation: designation
            },
            ...experience
        ])
        userData.education = education;
        userData.experience = experience;

        
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
            <h1 id='create-title'>Create A Resume</h1>
            <h2 id='view-btn' onClick={()=> navigate('/view')}>Your Resumes</h2>
            <form onSubmit={HandleSubmit}>
                <input type="text" required placeholder="Enter Your First Name" className="form-control" onChange={(e)=> userData.firstname = e.target.value}/>

                <input type="text" required placeholder="Enter Your Last Name" className="form-control" onChange={(e)=> userData.lastname = e.target.value}/>

                <input type="email" required placeholder="Enter Your E-Mail Address" className="form-control" onChange={(e)=> userData.email = e.target.value}/>

                <input type="text" required placeholder="Enter Your Address" className="form-control" onChange={(e)=> userData.address = e.target.value}/>

                <input type="tel" required placeholder="Enter Your Mobile Number" className="form-control" onChange={(e)=> userData.phone = e.target.value}/>

                <h2 id='ed-title'>Education</h2>
                <div>
                    <input type='text' required placeholder='Institution' onChange={(e)=>{
                        education[0].institution = e.target.value;
                    }}/>
                    <input required placeholder='Year' type='text' onChange={(e)=>{
                        education[0].year = e.target.value;
                    }}/>
                    <input required placeholder='Degree' type='text' onChange={(e)=>{
                        education[0].degree = e.target.value;
                    }}/>
                </div>

                {education.slice(1,education.length).map((ed)=>{
                    return <div><input type='text' placeholder='Institution' onChange={(e)=>{
                        ed.institution = e.target.value;
                    }}/><input placeholder='Year' type='text' onChange={(e)=>{
                        ed.year = e.target.value;
                    }}/><input placeholder='Degree' type='text' onChange={(e)=>{
                        ed.degree = e.target.value;
                    }}/></div>
                })}
                <button type="button" onClick={AddEducationField} class="btn btn-outline-primary">Add Education</button>

                <h2 id='exp-title'>Work Experience</h2>
                <div>
                    <input required type='text' placeholder='Company Name' onChange={(e)=>{
                        experience[0].company = e.target.value;
                    }}/>
                    <input required placeholder='Tenure' type='text' onChange={(e)=>{
                        experience[0].tenure= e.target.value;
                    }}/>
                    <input required placeholder='Designation' type='text' onChange={(e)=>{
                        experience[0].designation = e.target.value;
                    }} />
                </div>

                {experience.slice(1,experience.length).map((exp)=>{
                    return <div><input type='text' placeholder='Company Name' onChange={(e)=>{
                        exp.company = e.target.value;
                    }}/><input placeholder='Tenure' type='text' onChange={(e)=>{
                        exp.tenure = e.target.value;
                    }}/><input placeholder='Designation' type='text' onChange={(e)=>{
                        exp.designation = e.target.value;
                    }}/></div> 
                })}
                <button type="button" onClick={AddExperienceField} class="btn btn-outline-primary">Add Experience</button>

                <h2 id='exp-title'>Skills</h2>
                <input type='text' placeholder='Add Skill' onChange={(e)=>FindSkill(e.target.value)} />
                <div id='option-list'>
                    {options.map((i)=>{
                        return <h1 id='option' onClick={()=>{
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


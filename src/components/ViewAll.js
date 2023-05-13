import { useDispatch, useSelector } from "react-redux"
import { useNavigate } from "react-router-dom";
import { Select } from "../redux/slices/select";




export default function(){
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const store = useSelector((state)=>{
        return state.resumes;
    })

    const editId = useSelector((state)=>{
        return state.selectid;
    })
    console.log(store);

    
    return(<>
        <div id='resume-list'>
            {store.length>0 ? <h1 id='list-title'>Your Resumes</h1> :
            <h1 id='list-title'>No Resumes... Yet</h1>}
            <div id='list-main'>
                {store.map((item,idx)=>{
                    return <div id='one-resume' onClick={()=>{
                        dispatch(Select(idx));
                        navigate('/edit');
                    } }>
                        <h2>{item.firstname} {item.lastname}</h2>
                        <p>{item.address} Mobile: {item.phone}</p>
                        <p>E-Mail: {item.email}</p>
                        <h2>Education</h2>
                        <table>
                            <thead>
                                <th>Institution</th>
                                <th>Year</th>
                                <th>Degree</th>
                            </thead>
                            <tbody>
                                {item.education.map((i)=>{
                                    return <tr>
                                    <td>{i.institution}</td>
                                    <td>{i.year}</td>
                                    <td>{i.degree}</td>
                                </tr>
                                })}
                            </tbody>
                        </table>

                        <h2>Work Experience</h2>
                        <table>
                            <thead>
                                <th>Company</th>
                                <th>Tenure</th>
                                <th>Designation</th>
                            </thead>
                            <tbody>
                                {item.experience.map((i)=>{
                                    return <tr>
                                    <td>{i.company}</td>
                                    <td>{i.tenure}</td>
                                    <td>{i.designation}</td>
                                </tr>
                                })}
                            </tbody>
                        </table>

                        <h2>Skills</h2>
                        <ul>
                            {item.skills.map((i)=>{
                                return <li>{i}</li>
                            })}
                        </ul>

                    </div>
                })}
            </div>
        </div>
    </>)
}
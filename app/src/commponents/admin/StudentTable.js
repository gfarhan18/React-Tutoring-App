import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { get_student_data, set_student_status } from '../../axios/admin';
import { COLUMNS } from '../../Tables/Admin/column_0';


const StudentTable = () => {

    let [data , set_data] = useState([]);
    let navigate = useNavigate();

    useEffect(() => {
        get_student_data()
        .then((result) => {
            console.log(result)
            set_data(result)
        })
        .catch((err) => {
            console.log(err)
        })

    }, [])

    let set_status = async(e, Id, Status) => {
        e.preventDefault();
        let response = await set_student_status(Id, Status)


        if(response.bool){
            alert(response.mssg)
            get_student_data()
            .then((result) => {
                console.log(result)
                set_data(result)
            })
            .catch((err) => {
                console.log(err)
            })
        }else{

            alert(response.mssg)
            
        }
    }

    let redirect_to_student_setup = student_id => {
        window.localStorage.setItem('student_user_id', student_id);
        window.localStorage.setItem('user_role', 'admin');
        navigate('/student/setup')
    }
    return (  
        <> 
            {/*<div className='admin-tutor-data-info' style={{height: '50px', width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
                <span style={{height: '100%', width: '120px', margin: '0 10px 0 40px', whiteSpace: 'nowrap' }}>
                    Total Tutors: ??????
                </span>

                <span style={{height: '100%', width: '14', margin: '0 10px 0 40px', whiteSpace: 'nowrap' }}>
                    Total Earned ??????
                </span>

                <span style={{height: '100%', width: '120px', margin: '0 10px 0 40px' }}>
                    <input type='search' style={{height: '40px'}} placeholder='Find Tutor By ID' />
                </span>

               
    </div>*/}
            <div className="tables" style={{height: '430px', width: '100%', overflow: 'auto', padding: '5px'}}>

            <table style={{position: 'relative'}}>
                <thead >
                    <tr>
                        {COLUMNS.map(item => <th key={item.Header}>{item.Header}</th>)}
                    </tr>
                </thead>
                <tbody>
                        
                    {

                            data.map((item) => 
                                
                                <tr key={item.SID} onDoubleClick={ e => {redirect_to_student_setup(item.AcademyId)}}>
                                    <td data-src={null}>
                                        <div  className="dropdown">
                                            <button  style={{background: '#f6f6f6', border: 'none', outline: 'none', color: '#000'}}  className="btn btn-secondary dropdown-toggle" type="button" id="dropdownMenuButton1 status-btn" data-bs-toggle="dropdown" aria-expanded="false">
                                                {item.Status}
                                            </button>
                                            <ul  className="dropdown-menu" aria-labelledby="dropdownMenuButton1">
                                                <li style={{width: '100%'}}><a data-status='pending' onClick={ e => set_status(e, item.AcademyId, e.target.innerHTML) } style={{width: '100%'}} className="dropdown-item" href="#">Pending</a></li>
                                                <li style={{width: '100%'}}><a data-status='active' onClick={ e => set_status(e, item.AcademyId, e.target.innerHTML) } style={{width: '100%'}} className="dropdown-item" href="#">Active</a></li>
                                                <li style={{width: '100%'}}><a data-status='suspended' onClick={ e => set_status(e, item.AcademyId, e.target.innerHTML) } style={{width: '100%'}} className="dropdown-item" href="#">Suspended</a></li>
                                            </ul>
                                        </div>
                                    </td>

                                    <td data-src={null}>
                                        <img src={item.Photo} style={{height: '80px', width: '100px'}} />
                                    </td>
                                    <td data-src={item.AcademyId}>{item.AcademyId}</td>
                                    <td data-src={item.FirstName + ' ' + item.LastName}>{item.FirstName + ' ' + item.LastName}</td>
                                    <td data-src={item.Email}>{item.Email}</td>
                                    <td data-src={item.Cell}>{item.Cell}</td>
                                    <td data-src={item.GMT}>{item.GMT}</td>
                                    <td data-src={item.ResponseHrs}>{item.ResponseHrs}</td>
                                    <td data-src={null}>{null}</td>
                                    <td data-src={null}>{null}</td>
                                    <td data-src={item.IdVerified}>{item.IdVerified}</td>
                                    <td data-src={item.BackgroundVerified}>{item.BackgroundVerified}</td>
                                   
                                </tr>
                            )
                        }
                        
                        
                    </tbody>
                </table>

            </div>
        </>
    );
}
 
export default StudentTable;
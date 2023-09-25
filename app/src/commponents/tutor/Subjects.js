import { useTable } from 'react-table';
import { useState } from 'react';
import {AnimatePresence} from 'framer-motion'
import { useMemo } from 'react';
import { useEffect } from 'react';
import { get_rates, get_subject, get_user_data, upload_tutor_rates } from '../../axios/tutor';
import { COLUMNS } from '../../Tables/Subject/columns';
//import left from './../../images/arrow-circle-left-svgrepo-com'


const Subjects = () => { 

    const [data, set_data] = useState([]);
    const [data_ready, set_data_ready] = useState(false);
    //let [courses, set_courses] = useState([]);

    
    
    let [math_courses, set_math_courses] = useState([])
    let [software_courses, set_software_courses] = useState([])
    let [eng_courses, set_eng_courses] = useState([])
    let [lang_courses, set_lang_courses] = useState([])
    let [elem_courses, set_elem_courses] = useState([])
    let [sci_courses, set_sci_courses] = useState([])
    let [art_courses, set_art_courses] = useState([])
    let [social_s_courses, set_social_s_courses] = useState([])
    let [code_courses, set_code_courses] = useState([])
    let [test_prep_courses, set_test_prep_courses] = useState([])
    let [business_courses, set_business_courses] = useState([])
    let [health_courses, set_health_courses] = useState([])
    let [life_skill_courses, set_life_skill_courses] = useState([])
    let [pending_courses, set_pending_courses] = useState([])
    let [aviation_courses, set_aviation_courses] = useState([])
    let [engineering_courses, set_engineering_courses] = useState([])


    let [active_course, set_active_course] = useState([])

    useEffect(() => {
        let next = document.querySelector('.tutor-next')

        if(next.hasAttribute('id')){
            next.removeAttribute('id');
        }
    }, [])

    useEffect(() => {
        let user_id = window.localStorage.getItem('tutor_user_id');
        get_rates(window.localStorage.getItem('tutor_user_id')) 
        .then((result) => {
            console.log(result)

            result.map(item => {
                let c = item.subject
                let t = document.querySelector('.tables')
                let files = [...t.querySelectorAll('input[type=checkbox]')]
                let r = files.filter((item) => 
                    item.value.toLowerCase() === c.toLowerCase()
                )

                get_user_data(user_id)
                .then((result) => {
                r[0].checked = true;
                let elms = r[0].parentElement.parentElement.children;

                elms[2].innerHTML = result[0].EducationalLevel;
                elms[3].innerHTML = result[0].EducationalLevelExperience;
                elms[4].innerHTML = result[0].Certificate;
                elms[5].innerHTML = result[0].CertificateState;
                elms[6].innerHTML = result[0].CertificateExpiration;
                elms[7].innerHTML = `$ <input style='height: 25px; width: 40px; margin: 0;' type='text' placeholder='Dollars' value='${item.rate.split('').splice(1, 2).join('')}' maxlength='2' />.<input style='height: 25px; width: 40px; margin: 0;' type='text' placeholder='cents' value='${item.rate.split('').splice(4, 5).join('')}' maxlength='2' /> `;

            })
            .catch((err) =>  err) 
                
            })
        }, [])
        .catch((err) => console.log(err))
    })
   
    let courses = async(cb) => {
        let response = await get_subject()
        .then((result) => result.recordset)
        .catch((err) =>  err) 

        cb(response);
    }

    let populate_col = e => {
       if(e.target.checked){

        
            let user_id = window.localStorage.getItem('tutor_user_id');

            console.log(user_id)

            get_user_data(user_id)
            .then((result) => {
                let data = result;
                //console.log([...e.target.parentElement.parentElement.children][2].innerHTML)

                let elms = [...e.target.parentElement.parentElement.children];

                elms[2].innerHTML = result[0].EducationalLevel;
                elms[3].innerHTML = result[0].EducationalLevelExperience;
                elms[4].innerHTML = result[0].Certificate;
                elms[5].innerHTML = result[0].CertificateState;
                elms[6].innerHTML = result[0].CertificateExpiration;
                elms[7].innerHTML = "$ <input style='height: 25px; width: 40px; margin: 0;' type='text' placeholder='Dollars' value='00' maxlength='2' />.<input style='height: 25px; width: 40px; margin: 0;' type='text' placeholder='cents' value='00' maxlength='2' /> ";

                console.log(data)
            })
            .catch((err) =>  err) 
        }else{
            let elms = [...e.target.parentElement.parentElement.children];

            elms[2].innerHTML = ''    
            elms[3].innerHTML = ''
            elms[4].innerHTML = '' 
            elms[5].innerHTML = ''     
            elms[6].innerHTML = ''    
            elms[7].innerHTML = ''    
        }
    }

    useEffect(() => {

        courses((data) => {

            data.map((item) => {
                let id = item.FacultyId
                if(id === 1){
                    set_math_courses(old_list => [...old_list, item])
                }else if(id === 2){
                    set_software_courses(old_list => [...old_list, item])
                }else if(id === 3){
                    set_eng_courses(old_list => [...old_list, item])
                }else if(id === 4){
                    set_lang_courses(old_list => [...old_list, item])
                }else if(id === 5){
                    set_elem_courses(old_list => [...old_list, item])
                }else if(id === 6){
                    set_sci_courses(old_list => [...old_list, item])
                }else if(id === 7){
                    set_art_courses(old_list => [...old_list, item])
                }else if(id === 8){
                    set_social_s_courses(old_list => [...old_list, item])
                }else if(id === 9){
                    set_code_courses(old_list => [...old_list, item])
                }else if(id === 10){
                    set_test_prep_courses(old_list => [...old_list, item])
                }else if(id === 11){
                    set_business_courses(old_list => [...old_list, item])
                }else if(id === 12){
                    set_health_courses(old_list => [...old_list, item])
                }else if(id === 13){
                    set_life_skill_courses(old_list => [...old_list, item])
                }else if(id === 14){
                    //set_//aviation_courses(old_list => [...old_list, item]) 
                }else if(id === 15){
                    set_aviation_courses(old_list => [...old_list, item])
                }else if(id === 16){
                    set_engineering_courses(old_list => [...old_list, item])
                }
            })

        })

    }, []);
    

    useEffect(() => {
        set_active_course(math_courses)
    }, []) 

    let handle_active_course = e => {
        let elem = e.currentTarget;
        let tables = [...document.querySelectorAll('table')];
        let active_table = tables.filter(item => !item.hasAttribute('id'));
        active_table[0].setAttribute('id', 'hide_table');


        let index_of_elem = [...elem.parentElement.children].indexOf(elem);
        console.log(tables[index_of_elem])
        console.log(index_of_elem)
        tables[index_of_elem].removeAttribute('id');


        let clickedElem = e.currentTarget;
        let deactivedElem = [...clickedElem.parentElement.children].filter(item => item.hasAttribute('id'))[0];
        deactivedElem.removeAttribute('id');
        clickedElem.setAttribute('id', 'table_options_menu')

       

    }

    let handle_scroll_right = () => {

        let div = document.querySelector('.tutor-tab-subject-data-tabs');
        let scroll_elem = div.children[1];
        console.log(scroll_elem) 
        let w = scroll_elem.offsetWidth;
        scroll_elem.scrollLeft = w;

    }

    let handle_scroll_left = () => {
        
        let div = document.querySelector('.tutor-tab-subject-data-tabs');
        let scroll_elem = div.children[1];
        let w = scroll_elem.offsetWidth;
        scroll_elem.scrollLeft = -w

    }
    

    let save = document.querySelector('#tutor-save');
    save.onclick = () => {
        let checkboxs = [...document.querySelectorAll('input[type=checkbox]')];
        let checkedbox = checkboxs.filter(item => item.checked)
        let values = checkedbox.map(item => {
            return [...item.parentElement.parentElement.children]
        })
        let AcademyId = window.localStorage.getItem('tutor_user_id');
        let rate_list = [];
        let rate_err =[]

        let result = () => {
            let file = values.map((item, index, array) => {

                if( `${item[7].children[0].value}.${item[7].children[1].value}`  !== '00.00'){
                    //document.querySelector('.save-overlay').setAttribute('id', 'save-overlay')
                    let doc = {faculty: item[1].dataset.src, course: item[1].innerHTML, rate: "$" + item[7].children[0].value + "." + item[7].children[1].value}
                    item[7].children[0].style.border = '1px solid #000';
                    item[7].children[1].style.border = '1px solid #000';
                    rate_list.push(doc)
                    rate_err.push(true)


                }else{
                    item[7].children[0].style.border = '1px solid red';
                    item[7].children[1].style.border = '1px solid red';
                    rate_err.push(false)
                    //return false;
                }

            })

            let upload_agent = (items, id) => {

                upload_tutor_rates(items, id)
                .then((result) => {
                    if(result){
                        setTimeout(() => {
                            document.querySelector('.save-overlay').removeAttribute('id');
                        }, 1000);
        
                        document.querySelector('.tutor-popin').setAttribute('id', 'tutor-popin');
                        document.querySelector('.tutor-popin').innerHTML = 'Data Was Saved Successfully...'
                        setTimeout(() => {
                            document.querySelector('.tutor-popin').removeAttribute('id');
                        }, 2000);
                    }else{
                        
                        document.querySelector('.tutor-popin').setAttribute('id', 'tutor-popin');
                        document.querySelector('.tutor-popin').innerHTML = 'Data Was Not Saved Successfully...'
                        setTimeout(() => {
                            document.querySelector('.tutor-popin').removeAttribute('id');
                        }, 2000);
        
                    }
                })
                .catch((err) => console.log(err))
            }

            let errCheck =  rate_err.filter(item => item === false)
            if(errCheck.length > 0){
                alert('Please Ensure The Rate Field Is At Least $1')
            }else{
                document.querySelector('.save-overlay').setAttribute('id', 'save-overlay')
                upload_agent(rate_list, AcademyId) 
            }

          
        }

        result()
    }
    return ( 
        <>
            <div className="tutor-popin"></div>
            <div className="save-overlay">
                <span class="save_loader"></span>
            </div>
            <div className="tutor-tab-subjects">
                <div className="tutor-tab-subjects-info">
                    <input type='text' placeholder='Type your subject here' />
                    <input type='text' placeholder='Type your faculty here' />
                    <input type='text' placeholder='Select level' />
                    <input type='text' placeholder='Select experience' />
                    <input type='text' placeholder='Select Certification' />
                    <input type='text' placeholder='Select state' />
                    <input type='text' placeholder='Country' />
                    <input type='text' placeholder='Day state' />

                    <input type="submit" value="Upload" />
                </div>
                <div className="tutor-tab-subject-alert">
                    <p style={{fontSize: 'large', fontWeight: 'bold', color: 'blue', width: '100%', textAlign: 'center'}}>400+ subjects to select from across 15 faculties for tutoring. Didn't find your subject? List your expertise above and submit for review. We may list your subject after examination.</p>
                </div>


                <div className="tutor-tab-subject-data-collection-table">
                    
                    <div  className="tutor-tab-subject-data-tabs">
                        <div style={{margin: '0 0 0 0', display
                        : 'flex', alignItems: 'center', justifyContent: 'center',background: '#efefef', opacity: '.7', height: '100%', transform: 'skew(-0deg)'}}  className="scroller-left" onClick={handle_scroll_left}>
                            <div style={{opacity: '1'}}>
                            <svg width="30px" height="30px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M11 9L8 12M8 12L11 15M8 12H16M21 12C21 16.9706 16.9706 21 12 21C7.02944 21 3 16.9706 3 12C3 7.02944 7.02944 3 12 3C16.9706 3 21 7.02944 21 12Z" stroke="#000"  stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                            </svg>   
                            </div>           

                        </div>

                        
                        <ul>
                            
                            <li className='tutor-tab-subject-data-menu' id='table_options_menu' onClick={e => set_active_course(handle_active_course(e))}><a>Math</a></li>
                            <li className='tutor-tab-subject-data-menu' onClick={e => set_active_course(handle_active_course(e))}><a>Software</a></li>
                            <li className='tutor-tab-subject-data-menu' onClick={e => set_active_course(handle_active_course(e))}><a>English</a></li>
                            <li className='tutor-tab-subject-data-menu' onClick={e => set_active_course(handle_active_course(e))}><a>Languages</a></li>
                            <li className='tutor-tab-subject-data-menu' onClick={e => set_active_course(handle_active_course(e))}><a>Elementary Edu...</a></li>
                            <li className='tutor-tab-subject-data-menu' onClick={e => set_active_course(handle_active_course(e))}><a>Science</a></li>
                            <li className='tutor-tab-subject-data-menu' onClick={e => set_active_course(handle_active_course(e))}><a>Art</a></li>
                            <li className='tutor-tab-subject-data-menu' onClick={e => set_active_course(handle_active_course(e))}><a>Social Study</a></li>
                            <li className='tutor-tab-subject-data-menu' onClick={e => set_active_course(handle_active_course(e))}><a>Programming</a></li>
                            <li className='tutor-tab-subject-data-menu' onClick={e => set_active_course(handle_active_course(e))}><a>Test Prep</a></li>
                            <li className='tutor-tab-subject-data-menu' onClick={e => set_active_course(handle_active_course(e))}><a>Business</a></li>
                            <li className='tutor-tab-subject-data-menu' onClick={e => set_active_course(handle_active_course(e))}><a>Health </a></li>
                            <li className='tutor-tab-subject-data-menu' onClick={e => set_active_course(handle_active_course(e))}><a>Life Skills</a></li>
                            <li className='tutor-tab-subject-data-menu' onClick={e => set_active_course(handle_active_course(e))}><a>?</a></li>
                            <li className='tutor-tab-subject-data-menu' onClick={e => set_active_course(handle_active_course(e))}><a>Aviation</a></li>
                            <li className='tutor-tab-subject-data-menu' onClick={e => set_active_course(handle_active_course(e))}><a>Engineering</a></li>
                            
                        </ul>
                        <div style={{margin: '0 0 0 0',background: '#efefef', display
                        : 'flex', alignItems: 'center', justifyContent: 'center', opacity: '.7', height: '100%', transform: 'skew(-0deg)'}}  className="scroller-right" onClick={handle_scroll_right}>
                        <svg width="30px" height="30px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">``
                            <path d="M13 15L16 12M16 12L13 9M16 12H8M21 12C21 16.9706 16.9706 21 12 21C7.02944 21 3 16.9706 3 12C3 7.02944 7.02944 3 12 3C16.9706 3 21 7.02944 21 12Z" stroke="#000000" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                        </svg>

                        </div>

                    </div>           

                    <div className="highlight">
                        Checkbox any subject in any faculty where you are proficient enough to tutor, Ultimately you are being rated by the students feedback, if students feedback is only 2 stars then its free checkbox the subject then select the certificate, state expiration if available. Then click on the rate button which will pop up a table to select your rate
                    </div>

                    <div className="tutor-tab-subject-search-bar">
                        <div onClick={e => set_active_course()}>
                            <label style={{float: 'left', border: '1px solid #eee', padding: '5px 10px 0 10px'}} htmlFor="search"><h6>Search accross all faculties. type the subject of interest then checkbox to select</h6></label>

                            <div className="search-bar">
                                <input  style={{height: '50px', width: '300', margin: '0 5px 0 5px'}} type="search" placeholder='Search Here...' id="search"  /> 
                                <input  style={{height: '50px', width: '150px', margin: '0 0 0 5px'}} type="button" value="Search" />
                            </div>
                            

                        </div>

                    </div>

                       
                    <div className="tables" style={{height: '430px', width: '100%', overflow: 'auto', padding: '5px'}}>

                        <table style={{position: 'relative'}}>
                            <thead >
                                <tr>
                                    {COLUMNS.map(item => <th key={item.Header}>{item.Header}</th>)}
                                </tr>
                            </thead>
                            <tbody>
                                    
                                {

                                    math_courses.map((item, index) => 
                                        
                                        <tr key={index}>
                                           
                                            <td className={item.SubjectName} data-src={item.FacultyId}><input type='checkbox' onInput={populate_col} style={{margin: '8px 0 0 0', cursor: 'pointer', height: '20px', width: '20px'}} value={item.SubjectName} /></td>

                                            <td data-src={item.FacultyId}>{item.SubjectName}</td>

                                            <td data-src={item.FacultyId}></td>
                                            <td data-src={item.FacultyId}></td>
                                            <td data-src={item.FacultyId}></td>
                                            <td data-src={item.FacultyId}></td>
                                            <td data-src={item.FacultyId}></td>
                                            <td data-src={item.FacultyId}></td>
                                        </tr>
                                    )
                                }
                                
                                
                            </tbody>
                        </table>

                        <table id='hide_table'>
                            <thead>
                                <tr>
                                    {COLUMNS.map(item => <th key={item.Header}>{item.Header}</th>)}
                                </tr>
                            </thead>
                            <tbody>
                                    
                                {

                                    software_courses.map((item, index) => 
                                        <tr key={index}>
                                            <td data-src={item.FacultyId}><input type='checkbox' onInput={populate_col} style={{margin: '8px 0 0 0', cursor: 'pointer', height: '20px', width: '20px'}} value={item.SubjectName} /></td>

                                            <td data-src={item.FacultyId}>{item.SubjectName}</td>

                                            <td data-src={item.FacultyId}></td>
                                            <td data-src={item.FacultyId}></td>
                                            <td data-src={item.FacultyId}></td>
                                            <td data-src={item.FacultyId}></td>
                                            <td data-src={item.FacultyId}></td>
                                            <td data-src={item.FacultyId}></td>
                                        </tr>
                                    )
                                }
                                
                                
                            </tbody>
                        </table>

                        <table id='hide_table'>
                            <thead>
                                <tr>
                                    {COLUMNS.map(item => <th key={item.Header}>{item.Header}</th>)}
                                </tr>
                            </thead>
                            <tbody>
                                    
                                {

                                    eng_courses.map((item, index) => 
                                        <tr key={index}>
                                            <td data-src={item.FacultyId}><input type='checkbox' onInput={populate_col} style={{margin: '8px 0 0 0', cursor: 'pointer', height: '20px', width: '20px'}} value={item.SubjectName} /></td>

                                            <td data-src={item.FacultyId}>{item.SubjectName}</td>

                                            <td data-src={item.FacultyId}></td>
                                            <td data-src={item.FacultyId}></td>
                                            <td data-src={item.FacultyId}></td>
                                            <td data-src={item.FacultyId}></td>
                                            <td data-src={item.FacultyId}></td>
                                            <td data-src={item.FacultyId}></td>
                                        </tr>
                                    )
                                }
                                
                                
                            </tbody>
                        </table>

                        <table id='hide_table'>
                            <thead>
                                <tr>
                                    {COLUMNS.map(item => <th key={item.Header}>{item.Header}</th>)}
                                </tr>
                            </thead>
                            <tbody>
                                    
                                {

                                    lang_courses.map((item, index) => 
                                        <tr key={index}>
                                            <td data-src={item.FacultyId}><input type='checkbox' onInput={populate_col} style={{margin: '8px 0 0 0', cursor: 'pointer', height: '20px', width: '20px'}} value={item.SubjectName} /></td>

                                            <td data-src={item.FacultyId}>{item.SubjectName}</td>

                                            <td data-src={item.FacultyId}></td>
                                            <td data-src={item.FacultyId}></td>
                                            <td data-src={item.FacultyId}></td>
                                            <td data-src={item.FacultyId}></td>
                                            <td data-src={item.FacultyId}></td>
                                            <td data-src={item.FacultyId}></td>
                                        </tr>
                                    )
                                }
                                
                                
                            </tbody>
                        </table>

                        <table id='hide_table'>
                            <thead>
                                <tr>
                                    {COLUMNS.map(item => <th key={item.Header}>{item.Header}</th>)}
                                </tr>
                            </thead>
                            <tbody>
                                    
                                {

                                    elem_courses.map((item, index) => 
                                        <tr key={index}>
                                            <td data-src={item.FacultyId}><input type='checkbox' onInput={populate_col} style={{margin: '8px 0 0 0', cursor: 'pointer', height: '20px', width: '20px'}} value={item.SubjectName} /></td>

                                            <td data-src={item.FacultyId}>{item.SubjectName}</td>

                                            <td data-src={item.FacultyId}></td>
                                            <td data-src={item.FacultyId}></td>
                                            <td data-src={item.FacultyId}></td>
                                            <td data-src={item.FacultyId}></td>
                                            <td data-src={item.FacultyId}></td>
                                            <td data-src={item.FacultyId}></td>
                                        </tr>
                                    )
                                }
                                
                                
                            </tbody>
                        </table>

                        <table id='hide_table'>
                            <thead>
                                <tr>
                                    {COLUMNS.map(item => <th key={item.Header}>{item.Header}</th>)}
                                </tr>
                            </thead>
                            <tbody>
                                    
                                {

                                    sci_courses.map((item, index) => 
                                        <tr key={index}>
                                            <td data-src={item.FacultyId}><input type='checkbox' onInput={populate_col} style={{margin: '8px 0 0 0', cursor: 'pointer', height: '20px', width: '20px'}} value={item.SubjectName} /></td>

                                            <td data-src={item.FacultyId}>{item.SubjectName}</td>

                                            <td data-src={item.FacultyId}></td>
                                            <td data-src={item.FacultyId}></td>
                                            <td data-src={item.FacultyId}></td>
                                            <td data-src={item.FacultyId}></td>
                                            <td data-src={item.FacultyId}></td>
                                            <td data-src={item.FacultyId}></td>
                                        </tr>
                                    )
                                }
                                
                                
                            </tbody>
                        </table>

                        <table id='hide_table'>
                            <thead>
                                <tr>
                                    {COLUMNS.map(item => <th key={item.Header}>{item.Header}</th>)}
                                </tr>
                            </thead>
                            <tbody>
                                    
                                {

                                    art_courses.map((item, index) => 
                                        <tr key={index}>
                                            <td data-src={item.FacultyId}><input type='checkbox' onInput={populate_col} style={{margin: '8px 0 0 0', cursor: 'pointer', height: '20px', width: '20px'}} value={item.SubjectName} /></td>

                                            <td data-src={item.FacultyId}>{item.SubjectName}</td>

                                            <td data-src={item.FacultyId}></td>
                                            <td data-src={item.FacultyId}></td>
                                            <td data-src={item.FacultyId}></td>
                                            <td data-src={item.FacultyId}></td>
                                            <td data-src={item.FacultyId}></td>
                                            <td data-src={item.FacultyId}></td>
                                        </tr>
                                    )
                                }
                                
                                
                            </tbody>
                        </table>

                        <table id='hide_table'>
                            <thead>
                                <tr>
                                    {COLUMNS.map(item => <th key={item.Header}>{item.Header}</th>)}
                                </tr>
                            </thead>
                            <tbody>
                                    
                                {

                                    social_s_courses.map((item, index) => 
                                        <tr key={index}>
                                            <td data-src={item.FacultyId}><input type='checkbox' onInput={populate_col} style={{margin: '8px 0 0 0', cursor: 'pointer', height: '20px', width: '20px'}} value={item.SubjectName} /></td>

                                            <td data-src={item.FacultyId}>{item.SubjectName}</td>

                                            <td data-src={item.FacultyId}></td>
                                            <td data-src={item.FacultyId}></td>
                                            <td data-src={item.FacultyId}></td>
                                            <td data-src={item.FacultyId}></td>
                                            <td data-src={item.FacultyId}></td>
                                            <td data-src={item.FacultyId}></td>
                                        </tr>
                                    )
                                }
                                
                                
                            </tbody>
                        </table>

                        <table id='hide_table'>
                            <thead>
                                <tr>
                                    {COLUMNS.map(item => <th key={item.Header}>{item.Header}</th>)}
                                </tr>
                            </thead>
                            <tbody>
                                    
                                {

                                    code_courses.map((item, index) => 
                                        <tr key={index}>
                                            <td data-src={item.FacultyId}><input type='checkbox' onInput={populate_col} style={{margin: '8px 0 0 0', cursor: 'pointer', height: '20px', width: '20px'}} value={item.SubjectName} /></td>

                                            <td data-src={item.FacultyId}>{item.SubjectName}</td>

                                            <td data-src={item.FacultyId}></td>
                                            <td data-src={item.FacultyId}></td>
                                            <td data-src={item.FacultyId}></td>
                                            <td data-src={item.FacultyId}></td>
                                            <td data-src={item.FacultyId}></td>
                                            <td data-src={item.FacultyId}></td>
                                        </tr>
                                    )
                                }
                                
                                
                            </tbody>
                        </table>

                        <table id='hide_table'>
                            <thead>
                                <tr>
                                    {COLUMNS.map(item => <th key={item.Header}>{item.Header}</th>)}
                                </tr>
                            </thead>
                            <tbody>
                                    
                                {

                                    test_prep_courses.map((item, index) => 
                                        <tr key={index}>
                                            <td data-src={item.FacultyId}><input type='checkbox' onInput={populate_col} style={{margin: '8px 0 0 0', cursor: 'pointer', height: '20px', width: '20px'}} value={item.SubjectName} /></td>

                                            <td data-src={item.FacultyId}>{item.SubjectName}</td>

                                            <td data-src={item.FacultyId}></td>
                                            <td data-src={item.FacultyId}></td>
                                            <td data-src={item.FacultyId}></td>
                                            <td data-src={item.FacultyId}></td>
                                            <td data-src={item.FacultyId}></td>
                                            <td data-src={item.FacultyId}></td>
                                        </tr>
                                    )
                                }
                                
                                
                            </tbody>
                        </table>

                        <table id='hide_table'>
                            <thead>
                                <tr>
                                    {COLUMNS.map(item => <th key={item.Header}>{item.Header}</th>)}
                                </tr>
                            </thead>
                            <tbody>
                                    
                                {

                                    business_courses.map((item, index) => 
                                        <tr key={index}>
                                            <td data-src={item.FacultyId}><input type='checkbox' onInput={populate_col} style={{margin: '8px 0 0 0', cursor: 'pointer', height: '20px', width: '20px'}} value={item.SubjectName} /></td>

                                            <td data-src={item.FacultyId}>{item.SubjectName}</td>

                                            <td data-src={item.FacultyId}></td>
                                            <td data-src={item.FacultyId}></td>
                                            <td data-src={item.FacultyId}></td>
                                            <td data-src={item.FacultyId}></td>
                                            <td data-src={item.FacultyId}></td>
                                            <td data-src={item.FacultyId}></td>
                                        </tr>
                                    )
                                }
                                
                                
                            </tbody>
                        </table>

                        <table id='hide_table'>
                            <thead>
                                <tr>
                                    {COLUMNS.map(item => <th key={item.Header}>{item.Header}</th>)}
                                </tr>
                            </thead>
                            <tbody>
                                    
                                {

                                    health_courses.map((item, index) => 
                                        <tr key={index}>
                                            <td data-src={item.FacultyId}><input type='checkbox' onInput={populate_col} style={{margin: '8px 0 0 0', cursor: 'pointer', height: '20px', width: '20px'}} value={item.SubjectName} /></td>

                                            <td data-src={item.FacultyId}>{item.SubjectName}</td>

                                            <td data-src={item.FacultyId}></td>
                                            <td data-src={item.FacultyId}></td>
                                            <td data-src={item.FacultyId}></td>
                                            <td data-src={item.FacultyId}></td>
                                            <td data-src={item.FacultyId}></td>
                                            <td data-src={item.FacultyId}></td>
                                        </tr>
                                    )
                                }
                                
                                
                            </tbody>
                        </table>

                        <table id='hide_table'>
                            <thead>
                                <tr>
                                    {COLUMNS.map(item => <th key={item.Header}>{item.Header}</th>)}
                                </tr>
                            </thead>
                            <tbody>
                                    
                                {

                                    life_skill_courses.map((item, index) => 
                                        <tr key={index}>
                                            <td data-src={item.FacultyId}><input type='checkbox' onInput={populate_col} style={{margin: '8px 0 0 0', cursor: 'pointer', height: '20px', width: '20px'}} value={item.SubjectName} /></td>

                                            <td data-src={item.FacultyId}>{item.SubjectName}</td>

                                            <td data-src={item.FacultyId}></td>
                                            <td data-src={item.FacultyId}></td>
                                            <td data-src={item.FacultyId}></td>
                                            <td data-src={item.FacultyId}></td>
                                            <td data-src={item.FacultyId}></td>
                                            <td data-src={item.FacultyId}></td>
                                        </tr>
                                    )
                                }
                                
                                
                            </tbody>
                        </table>

                        <table id='hide_table'>
                            <thead>
                                <tr>
                                    {COLUMNS.map(item => <th key={item.Header}>{item.Header}</th>)}
                                </tr>
                            </thead>
                            <tbody>
                                    
                                {

                                    pending_courses.map((item, index) => 
                                        <tr key={index}>
                                            <td data-src={item.FacultyId}><input type='checkbox' onInput={populate_col} style={{margin: '8px 0 0 0', cursor: 'pointer', height: '20px', width: '20px'}} value={item.SubjectName} /></td>

                                            <td data-src={item.FacultyId}>{item.SubjectName}</td>

                                            <td data-src={item.FacultyId}></td>
                                            <td data-src={item.FacultyId}></td>
                                            <td data-src={item.FacultyId}></td>
                                            <td data-src={item.FacultyId}></td>
                                            <td data-src={item.FacultyId}></td>
                                            <td data-src={item.FacultyId}></td>
                                        </tr>
                                    )
                                }
                                
                                
                            </tbody>
                        </table>

                        <table id='hide_table'>
                            <thead>
                                <tr>
                                    {COLUMNS.map(item => <th key={item.Header}>{item.Header}</th>)}
                                </tr>
                            </thead>
                            <tbody>
                                    
                                {

                                    aviation_courses.map((item, index) => 
                                        <tr key={index}>
                                            <td data-src={item.FacultyId}><input type='checkbox' onInput={populate_col} style={{margin: '8px 0 0 0', cursor: 'pointer', height: '20px', width: '20px'}} value={item.SubjectName} /></td>

                                            <td data-src={item.FacultyId}>{item.SubjectName}</td>

                                            <td data-src={item.FacultyId}></td>
                                            <td data-src={item.FacultyId}></td>
                                            <td data-src={item.FacultyId}></td>
                                            <td data-src={item.FacultyId}></td>
                                            <td data-src={item.FacultyId}></td>
                                            <td data-src={item.FacultyId}></td>
                                        </tr>
                                    )
                                }
                                
                                
                            </tbody>
                        </table>

                        <table id='hide_table'>
                            <thead>
                                <tr>
                                    {COLUMNS.map(item => <th key={item.Header}>{item.Header}</th>)}
                                </tr>
                            </thead>
                            <tbody>
                                    
                                {

                                    engineering_courses.map((item, index) => 
                                        <tr key={index}>
                                            <td data-src={item.FacultyId}><input type='checkbox' onInput={populate_col} style={{margin: '8px 0 0 0', cursor: 'pointer', height: '20px', width: '20px'}} value={item.SubjectName} /></td>

                                            <td data-src={item.FacultyId}>{item.SubjectName}</td>

                                            <td data-src={item.FacultyId}></td>
                                            <td data-src={item.FacultyId}></td>
                                            <td data-src={item.FacultyId}></td>
                                            <td data-src={item.FacultyId}></td>
                                            <td data-src={item.FacultyId}></td>
                                            <td data-src={item.FacultyId}></td>
                                        </tr>
                                    )
                                }
                                
                                
                            </tbody>
                        </table>

                    </div>

                </div>

                
            </div>
        </>
     );
}
 
export default Subjects;
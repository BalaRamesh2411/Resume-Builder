


// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.9.0/firebase-app.js";
import { getFirestore,addDoc,collection,query,where,getDocs, deleteDoc,updateDoc ,doc  } from "https://www.gstatic.com/firebasejs/10.9.0/firebase-firestore.js";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyDAiftRcxMwY0clDjZA5K0zPUV3eU61qOg",
    authDomain: "my-resume-3911e.firebaseapp.com",
    projectId: "my-resume-3911e",
    storageBucket: "my-resume-3911e.appspot.com",
    messagingSenderId: "419543526125",
    appId: "1:419543526125:web:28c00c118e291d0d5e7ae4"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// Initialize Cloud Firestore and get a reference to the service
 const db = getFirestore(app);



 /**********************************regisister_page********************************************************* */

 async function register(){
    
//  register.addEventListener('click',async (e) =>  {

    var name=document.getElementById("name").value
    var email=document.getElementById("email").value
    var password=document.getElementById("password").value
    let find=await addDoc(collection(db, 'register'), {
        name: name,
        email_id:email,
        password: password,
        
    });
    alert("users register")
    const id=find.id
    location="index.html"
  
}
window.register=register
// /**********************************login_page********************************************************* */
function loginData(){
 let params = new URLSearchParams(document.location.search);    
 let id = params.get("id");

//  login.addEventListener('click',(e)  =>  {
    getDocs(collection(db,"register")).then(loginpage =>{
        let email=document.getElementById("email").value
        let password=document.getElementById("password").value
           
        if(email==""   && password==""){
            alert("please fill the details")
            return
        }
        let user_data=false
        loginpage.forEach((each) =>{
        let datas=each.data()
            if(email==datas.email_id && password==datas.password){
                user_data={
                    email_id:datas.email_id,
                    name:datas.name,
                    Id:each.id
                   
                }
                alert('login successfull')
                console.log(user_data)
                localStorage.setItem("user_data",JSON.stringify(user_data))
                window.location=`homepage.html`
                user_data=true
                      
            }
            })
            if(!user_data){
                alert("yours password or email incorrect")
            }
        })
    
        
    }
window.loginData=loginData

// /**********************************home_page[submite]********************************************************* */


async function  submitData() {
   
        let local_data=localStorage.getItem("user_data")
        let parse_local_data=JSON.parse(local_data)
        const docRef= await addDoc(collection(db,"resume"),{...myresume,UserId:parse_local_data.Id});
         window.location="view.html"


         
    }

    window.submitData=submitData 

// /**********************************all page logout********************************************************* */


   function logoutData(){
    // logout.addEventListener("click",(e) =>{
        localStorage.removeItem("user_data")
        window.location="index.html"
    
   }

     window.logoutData=logoutData 
     
     
/**********************************view_page**********************************************************/
async  function get_resumelist(){
    let local_data=localStorage.getItem("user_data")
    let parse_local_data=JSON.parse(local_data)
    await getDocs(query(collection(db,"resume"),where("UserId","==",parse_local_data.Id))).then(docSnap =>{
            let rander='';
            docSnap.forEach((each) =>{
           let eachresume=each.data();
           rander=rander+`<li><a href="template.html?id=${each.id}">${eachresume.title}</a>
              <button onclick="del('${each.id}')">delete</button></a>
              <a href="edit.html?id=${each.id}"><button type='button' id='edit'>edit</button></a> </li>`
            });
            document.getElementById("list").innerHTML=rander
        })
      }
window.get_resumelist=get_resumelist

    //   get_resumelist()

        function del(del_id){
        deleteDoc(doc(db,"resume",del_id))
        get_resumelist()
        }
        window.del=del
   
        
       
 
    

/**********************************edit_page**********************************************************/
function editview(){
    let params = new URLSearchParams(document.location.search);    
    let index = params.get("id");
    getDocs(collection(db,"resume")).then(edit =>{
    edit.forEach((doc) =>{
    if(index==doc.id){
    let datas=doc.data()
    myresume = datas
    document.getElementById("up_date_title").value=myresume.title
    document.getElementById("up_date_name").value=myresume.name
    document.getElementById("up_date_email").value=myresume.email
    document.getElementById("up_date_contact").value=myresume.contact
    document.getElementById("up_date_objective").value=myresume.objective
    document.getElementById("up_date_declaration").value=myresume.declaration
    document.getElementById("up_date_place").value=myresume.place

    // ********************personal details**********************
    document.getElementById("up_date_father'sname").value=myresume.personal_details.father_name
    document.getElementById("up_date_mother'sname").value=myresume.personal_details.mother_name
    document.getElementById("up_date_adderss").value=myresume.personal_details.address
    document.getElementById("up_date_dob").value=myresume.personal_details.dob

    //***********************skills*****************************
    let skilladd=''
    for(const each of myresume.skills){
        skilladd=skilladd+`<input class="skills" value=${each}  />`
    }

    document.getElementById("skill").innerHTML=skilladd

    //***********************hobbies*****************************
    let hobbieadd=''
    for(const each of myresume.hobbies){
        hobbieadd=hobbieadd+`<input class="hobbies" value=${each}  />`
    }

    document.getElementById("hobbie").innerHTML=hobbieadd

    //********************languages*************************
    let languageadd=''
    for(const each of myresume.languages){
        languageadd=languageadd+`<input class="languages" value=${each}  />`
    }

    document.getElementById("languages").innerHTML=languageadd


    //********************area_of_interest*************************
    let area_of_interestadd=''
    for(const each of myresume.area_of_interest){
        area_of_interestadd=area_of_interestadd+`<input class="area_of_interestes" value=${each}  />`
    }

    document.getElementById("area_of_interest").innerHTML=area_of_interestadd



        //***********************************for in loop education *************************************


    let editoperation=myresume.education_details  
    let updateeditdata="";
    for(let eachdatas in  editoperation){
        updateeditdata=updateeditdata+`<tr>
            <td><input type="text" value="${editoperation[eachdatas].int_name}" onkeyup="update_function(this,${eachdatas},'int_name','education_details')"/></td>
            <td><input type="text" value="${editoperation[eachdatas].course_name}" onkeyup="update_function(this,${eachdatas},'course_name','education_details')"/></td>
            <td><input type="text" value="${editoperation[eachdatas].persentage}" onkeyup="update_function(this,${eachdatas},'persentage','education_details')"/></td>
            <td><input type="text" value="${editoperation[eachdatas].pass_year}"  onkeyup="update_function(this,${eachdatas},'pass_year','education_details')"/></td>
        </tr>`
        }
        document.getElementById("educatinput").innerHTML=updateeditdata



        //*************************************for in loop project**************************************
    let  update_project=myresume.project
    let PROject=""
    for(let each in update_project){
    PROject=PROject+`<tr>
        <td><input type=text value="${update_project[each].pro_name}"  onkeyup="update_function(this,'${each}','pro_name','project')"  /></td>
        <td><input type=text value="${update_project[each].org_name}"  onkeyup="update_function(this,'${each}','org_name','project')"  /></td>
        <td><input type=text value="${update_project[each].team_member}"  onkeyup="update_function(this,'${each}','team_member','project')"  /></td>
        <td><input type=text value="${update_project[each].duration}"  onkeyup="update_function(this,'${each}','duration','project')"  /></td>
    </tr>`
    }
        
    document.getElementById("pro_ject").innerHTML=PROject


     
    }
    })
    })
    }

window.editview=editview


async function update_edit(){
 let params = new URLSearchParams(document.location.search);    
 let index = params.get("id");
    let TITLE=document.getElementById("up_date_title").value
    let Name= document.getElementById("up_date_name").value
    let Email=document.getElementById("up_date_email").value
    let Place=document.getElementById("up_date_place").value
    let Objective=document.getElementById("up_date_objective").value
    let Declaration=document.getElementById("up_date_declaration").value
    let Contact=document.getElementById("up_date_contact").value
    /*****************personal details********************/
    let f_name=document.getElementById("up_date_father'sname").value
    let m_name=document.getElementById("up_date_mother'sname").value
    let add_ress= document.getElementById("up_date_adderss").value
    let DOB=document.getElementById("up_date_dob").value


//   /*******************************using class [skil,hob,aoi,lag]************************************************/
  let Skills=document.getElementsByClassName("skills")
  let Hobbie=document.getElementsByClassName("hobbies")
  let Language=document.getElementsByClassName("languages")
  let Area_of_Interest=document.getElementsByClassName("area_of_interestes")

 let Updating_Skills=[]
 let Updating_HObbies=[]
 let Updating_Language=[]
 let Updating_Area_of_Interest=[]



 for(const each of Skills){
   Updating_Skills.push(each.value)
 }
 for(const each of Hobbie){
   Updating_HObbies.push(each.value)
 }
 for(const each of Language){
   Updating_Language.push(each.value)
 }
 for(const each of Area_of_Interest){
   Updating_Area_of_Interest.push(each.value)
 }
 

  await updateDoc(doc(db, "resume",index), {
   title:TITLE,
   name:Name,
   email:Email,
   place:Place,
   objective:Objective,
   declaration:Declaration,
   contact:Contact,
   personal_details:{
       father_name:f_name,
       mother_name:m_name,
       address:add_ress,
       dob:DOB,
   },

   skills:Updating_Skills,
   hobbies:Updating_HObbies,
   languages:Updating_Language,
   area_of_interest:Updating_Area_of_Interest,
   education_details:myresume.education_details,
   project:myresume.project

  })
  alert("update sucessfull")

  window.location="view.html"
  
}
window.update_edit=update_edit



// /********************************** temblate_1 [index.html]********************************************************* */
   function edit_temp(){
    let params = new URLSearchParams(document.location.search);    
    let index = params.get("id");
  getDocs(collection(db,"resume")).then(edit =>{
  
  edit.forEach((doc) =>{
  if(index==doc.id){
  let datas=doc.data()
      document.getElementById("re_title").innerHTML=datas.title
      document.getElementById("re_name").innerHTML=datas.name
      document.getElementById("re_name_1").innerHTML=` ${datas.name}`
      document.getElementById("re_email").innerHTML=`EMAIL ID:${datas.email}`
      document.getElementById("re_contact").innerHTML=`CONTACT : ${datas.contact}`
      document.getElementById("re_objective").innerHTML=datas.objective
      document.getElementById("re_declaration").innerHTML=datas.declaration
      document.getElementById("re_place").innerHTML=`Location :${datas.place}`
      document.getElementById("re_dob").innerHTML=`BIRTHDAY :${datas.personal_details.dob}`
      


    //***********************skills*****************************
      let skilladd=''
    for(const each of datas.skills){
        skilladd=skilladd+`<p>${each}</p>`
    }

    document.getElementById("re_skills").innerHTML=skilladd
     //***********************hobbies*****************************
    let hobbieadd=''
    for(const each of datas.hobbies){
        hobbieadd=hobbieadd+`<p>${each}</p> `
    }

    document.getElementById("re_hobbies").innerHTML=hobbieadd

    //********************languages*************************
    let languageadd=''
    for(const each of datas.languages){
        languageadd=languageadd+`<p>${each}</p>`
    }

    document.getElementById("re_language").innerHTML=languageadd


    //********************area_of_interest*************************
    let area_of_interestadd=''
    for(const each of datas.area_of_interest){
        area_of_interestadd=area_of_interestadd+`<p>${each}</p> `
    }

    document.getElementById("re_area_of interest").innerHTML=area_of_interestadd


 //*********************for loop education********************************
 let empty_education=""
 for(let each of datas.education_details){
   empty_education=empty_education+` <li class="time-line-item">
                       <span class="badge badge-primary">${each.pass_year}</span>
                       <h3 class="time-line-item-title">${each.course_name}</h3>
                       <p class="time-line-item-subtitle">${each.persentage}</p>
                        <p class="time-line-item-subtitle">${each.int_name}</p>
                   </li>`
 }
 document.getElementById("re_education").innerHTML=empty_education

 //*************************************for in loop project**************************************
 
 let PROject=""
 for(let each of datas.project){
   PROject=PROject+` <li class="time-line-item">
    <span class="badge badge-primary">${each. duration}</span>
    <h3 class="time-line-item-title">${each.pro_name}</h3>
    <p class="time-line-item-subtitle">${each.team_member}</p>
     <p class="time-line-item-subtitle">${each.org_name}</p>
   </li>`
 }
       
  document.getElementById("re_project").innerHTML=PROject


  }
  })
 })
}
   window.edit_temp=edit_temp

   
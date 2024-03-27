let myresume={
   
    skills:[],
    hobbies:[],
    languages:[],
    area_of_interest:[],
    personal_details:{ },
    education_details:[
        {
            int_name: "",
            course_name:"",
            persentage:"",
            pass_year:"",
        },
        {
            int_name: "",
            course_name:"",
            persentage:"",
            pass_year:"",
        },
        {
            int_name: "",
            course_name:"",
            persentage:"",
            pass_year:"",
        },
        {
            int_name: "",
            course_name:"",
            persentage:"",
            pass_year:"",
        },
    ],
    project:[
        {
        pro_name:"",
        org_name:"",
        team_member:'',
        duration:"",
    },
    {
        pro_name:"",
        org_name:"",
        team_member:'',
        duration:"",
    },{
        pro_name:"",
        org_name:"",
        team_member:'',
        duration:"",
    },
    ],
  }


  function array(Key,id){
    let data=document.getElementById(id).value;
    myresume[Key].push(data)
    document.getElementById(id).value=""
   

}
function get(ele,key,p_key,index,c_key){
    if (p_key){
      myresume[p_key][key]=ele.value
    }else if(c_key){
     myresume[key][index][c_key]=ele.value
    }else{
     myresume[key]=ele.value
    }
    
 }
 /*let resume=[];                         /* values local storage store panna
 function save(){
resume.push(myresume);
let savesend=JSON.stringify(resume)
localStorage.setItem("resum",savesend)      /*session storageit store the data temporary
alert('submit')
document.getElementById("form").reset()
 }*/
 /* 
function saved(){
    alert('submit')
    if(!localStorage.getItem("resumes")){
        localStorage.setItem("resumes",JSON.stringify([]))
    }
    let existing=localStorage.getItem("resumes")    //get data in localstorage
    let existing_parsh=JSON.parse(existing)
    let updating_list=[...existing_parsh,myresume]       //push  the data in list
    let updating_list_item=JSON.stringify(updating_list)
    
    localStorage.setItem("resumes",updating_list_item)
    document.getElementById("form").reset()
    window.location="view.html"
}

  

 function appresume(){
    let existing=localStorage.getItem("resumes")
    let existing_parsh=JSON.parse(existing)
    let rander="";
    for (const each in existing_parsh) {
        rander=rander+`<li><a href="viewpage.html?index=${each}">${existing_parsh[each].title}</a>
        <button onclick="remove(${each})">delete</button>
        <a href="edit.html?index=${each}"><button>edit</button></a> </li>`             
    }
    document.getElementById("list").innerHTML=rander
}
  








// remove function
function remove(del){
let newresume=[];
let getdata=localStorage.getItem("resumes")
let parsedata=JSON.parse(getdata)                               //convert to object
  for(let each in parsedata){

    if( each!= del){
            
            newresume.push( parsedata[each])
    }
    localStorage.setItem("resumes",JSON.stringify(newresume))
  window. location="view.html"
  }
  
   
}


*/


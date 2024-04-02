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
// *****************************single function in multi functioncall the edit page education and project****************************
  
  
function update_function(elem,index_no,key_word,prKey){
    let params = new URLSearchParams(document.location.search);    
    let index = params.get("index");
    
    myresume[prKey][index_no][key_word]=elem.value
   
}



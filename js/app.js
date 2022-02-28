
/* click Event hendler */

document.getElementById("search-btn").addEventListener("click",function(){
    const searchFeild = document.getElementById("search-feild");
    const searchFeildValue = searchFeild.value;
    if(searchFeildValue==""){
        alert("Please Write somthing !!")
    }
    else{
        searchFeild.value = "";
        fetch(`https://openapi.programming-hero.com/api/phones?search=${searchFeildValue.toLowerCase()}`)
        .then((res)=>res.json())
        .then((data)=>displayPhoneInfo(data.data))
    }

}) 

/* card append */
const displayPhoneInfo = (phones)=>{
    // console.log(phones)
    const container = document.getElementById("container");

    /* clear container */
    container.textContent="";

    phones.forEach(phone=>{
        console.log(phone)
        const div = document.createElement("div");
        div.innerHTML=`
        <div class="col">
        <div class="card h-100 ">
        <img src="${phone.image}" class="card-img-top px-5 py-2 pt-4" alt="...">
        <div class="card-body">
          <h5 class="card-title">${phone.phone_name}</h5>
          <p>Brand: ${phone.brand}</p>
          <button onclick="PhoneDetils('${phone.slug}')" class="btn btn-primary">Details</button>
        </div>
        </div>
        </div>
        `
        container.appendChild(div);

    })
    if(container.textContent==""){
        document.getElementById("notFound").style.display="block";
    }
    else{
        document.getElementById("notFound").style.display="none";
    }
}

const PhoneDetils = (id)=>{
    fetch(`https://openapi.programming-hero.com/api/phone/${id}`)
    .then(res=>res.json())
    .then(data=>displayDetils(data))
}

const displayDetils = ()=>{
    
}
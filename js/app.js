const lodingSpinner=(condition)=>{
    document.getElementById("spinner").style.display=condition;
}
/* click Event hendler */

document.getElementById("search-btn").addEventListener("click",function(){
    lodingSpinner("block");
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
    console.log(phones)
    const container = document.getElementById("container");
    const twenty = phones.slice(0,20);
    console.log(twenty)
    /* clear container */
    container.textContent="";

    phones.forEach(phone=>{
        // console.log(phone)
        const div = document.createElement("div");
        div.innerHTML=`
        <div class="col">
        <div class="card h-100 shadow stl">
        <img src="${phone.image}" class="card-img-top px-5 py-2 pt-4" alt="...">
        <div class="card-body">
          <h5 class="card-title">${phone.phone_name}</h5>
          <p>Brand: ${phone.brand}</p>
          <button onclick="PhoneDetils('${phone.slug}')" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#staticBackdrop">Details</button>
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
    lodingSpinner("none")
}

const PhoneDetils = (id)=>{
    fetch(`https://openapi.programming-hero.com/api/phone/${id}`)
    .then(res=>res.json())
    .then(data=>displayDetils(data))
}

const displayDetils = (phone)=>{
    console.log(phone)
    const details = document.getElementById("details");
    details.textContent="";
    const title =document.getElementById("staticBackdropLabel");
    title.innerText=`${phone.data.name}`
    const div = document.createElement("div");

    /* releaseDate condition add */
    if(phone.data.releaseDate===""){
        phone.data.releaseDate="No release date found"
      }

    if(phone?.data?.others?.Bluetooth == undefined){
        console.log("error hsdkfl")
    }

    div.innerHTML=`
    <div class="">
    <div class='d-flex justify-content-center'>
    <img src="${phone.data.image}" alt="">
    </div>
    <div class="ms-4">
    <h6><span class="title">Brand:</span> ${phone.data.brand}</h6>
    <h6><span class="title">ChipSet:</span> ${phone.data.mainFeatures.chipSet}</h6>
    <h6><span class="title">Display Size:</span> ${phone.data.mainFeatures.displaySize}</h6>
    <h6><span class="title">Storage:</span> ${phone.data.mainFeatures.storage}</h6>
    <h6><span class="title">Bluetooth:</span> ${phone?.data?.others?.Bluetooth}</h6>

    <h6><span class="title">ReleaseDate:</span> ${phone.data.releaseDate}</h6>
    <h6><span class="title">Sensors:</span> ${phone.data.mainFeatures.sensors}</h6>
    </div>
    </div>
      `
      details.appendChild(div);
      
    //   ${phone.data.phone_name}
}
let data =[];
const ticketCardArea = document.querySelector(".ticketCard-area");
const regionSearch = document.querySelector(".regionSearch");
const dataNum = document.querySelector("#searchResult-text");
const addTicketBtn = document.querySelector(".addTicket-btn");
const ticketName = document.querySelector("#ticketName");
const ticketImgUrl = document.querySelector("#ticketImgUrl");
const ticketRegion = document.querySelector("#ticketRegion");
const ticketPrice = document.querySelector("#ticketPrice");
const ticketNum = document.querySelector("#ticketNum");
const ticketRate = document.querySelector("#ticketRate");
const ticketDescription = document.querySelector("#ticketDescription");
const ticketForm = document.querySelector(".addTicket-form");

function getData (){
  axios.get("https://raw.githubusercontent.com/hexschool/js-training/main/travelApi.json")
  .then(function(res){
    console.log(res.data.data);
    data = res.data.data;
    renderCard(data);
  })
  .catch(function(error){
    console.log(error);
  });
}
getData();

function renderCard(cardInfo){
    let str ="";
    cardInfo.forEach(function(item){
        str+= `<li class="ticketCard">
        <div class="ticketCard-img">
          <a href="#">
            <img src=${item.imgUrl} alt="">
          </a>
          <div class="ticketCard-region">${item.area}</div>
          <div class="ticketCard-rank">${item.rate}</div>
        </div>
        <div class="ticketCard-content">
          <div>
            <h3>
              <a href="#" class="ticketCard-name">${item.name}</a>
            </h3>
            <p class="ticketCard-description">
            ${item.description}
            </p>
          </div>
          <div class="ticketCard-info">
            <p class="ticketCard-num">
              <span><i class="fas fa-exclamation-circle"></i></span>
              剩下最後 <span id="ticketCard-num">${item.group} </span> 組
            </p>
            <p class="ticketCard-price">
              TWD <span id="ticketCard-price">$${item.price}</span>
            </p>
          </div>
        </div>
      </li>`;
    });
    ticketCardArea.innerHTML = str;
    dataNum.textContent = `本次搜尋共 ${cardInfo.length} 筆資料`;
}


regionSearch.addEventListener("change", function(e){
  if(e.target.value === "全部地區"){
    renderCard(data);
    return;
  }
  let filterData = []; // for暫存

  data.forEach(function(item){
      if(e.target.value === item.area ){
          filterData.push(item);
      } 
  });
  renderCard(filterData);
  
});

addTicketBtn.addEventListener("click",function(e){
 const obj = {};
 obj.id = new Date().getTime();
 obj.name = ticketName.value;
 obj.imgUrl= ticketImgUrl.value;
 obj.area= ticketRegion.value;
 obj.description= ticketDescription.value;
 obj.group= ticketNum.value;
 obj.price= ticketPrice.value;
 obj.rate= ticketRate.value;
 data.push(obj);
 renderCard(data);
 ticketForm.reset();
 regionSearch.value = "全部地區";

});
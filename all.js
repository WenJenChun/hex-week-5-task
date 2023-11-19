let apiData = [];
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
    apiData = res.data.data;
    // let { apiData } = res.data.data //簡化 解構賦值
    console.log(apiData);
    renderCard(apiData);
    renderC3();
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
    renderCard(apiData);
    return;
  }
  let filterData = []; // for暫存

  apiData.forEach(function(item){
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
 apiData.push(obj);
 console.log("新增景點資訊：");
 console.log(apiData);
 renderCard(apiData);
 renderC3();
 ticketForm.reset();
 regionSearch.value = "全部地區";
 

});

function renderC3(){
  //C3 需要陣列包陣列格式  chartData  [["高雄",1],["台中",2],]
  //在這之前先建立物件格式 chartObj {"高雄":"1", "台中":"1"}
  //再用 ary 建立 chartData 裏的個別陣列 ["高雄",1]
  //再把 ary 分別 push 進 chartData

  let chartData =[]; //C3陣列包陣列 
  let chartObj = {}; //資料整理用

  apiData.forEach((item, index)=>{
    if(chartObj[item.area]){
      chartObj[item.area]+=1;
    } else {
      chartObj[item.area] = 1;
    }
  });
  console.log(chartObj);

  Object.keys(chartObj).forEach((city)=>{
    let ary = [];
    ary.push(city); //城市名
    ary.push(chartObj[city]); //城市名對應的數量
    console.log(ary); //["高雄",1]
    chartData.push(ary);
  });
  console.log(chartData);

  const  chart = c3.generate({
    data: {
      columns: chartData,
        type : 'donut',
    },
    donut: {
        title: "套票地區比重",
        label: {
          show: false,  // 设置为 false 不显示百分比标签
        },
        width: 10
    },
    color: {
      pattern: ['#26C0C7',  '#5151D3', '#E68618']  // 自定义颜色方案
    },
    size: {
      width: 184, 
      height: 184, 
    }
  });
};



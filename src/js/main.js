var data = localStorage.getItem("expensesApp")
  ? JSON.parse(localStorage.getItem("expensesApp"))
  : {
      totalExpenses:595.96
      ,categoryList:
      [
         {name:"Food", color:"#519fc6", amount:103}
        ,{name:"Clothes", color:"#a36acb",  amount:120.65}
        ,{name:"Relaxation", color:"#e55789", amount:50.95}
        ,{name:"Fuel", color:"#1dd1a1", amount:260.80}
        ,{name:"Services", color:"#d5a32a", amount:34}
        ,{name:"House", color:"#6eb239", amount:26.56}      
      ]
      ,dailyList:
      [
        [//array of a single day
          {name:"Food", amount:1}
          ,{name:"Clothes",  amount:2}
          ,{name:"Relaxation", amount:3}
          ,{name:"Fuel", amount:4}
          ,{name:"Services", amount:5}        
          ,{name:"House", amount:6}
        ]
      ]
      ,detailedList:
      [
        [// array of a single day
          {listName:"Food", name:"patatos", amount:1}
          ,{listName:"Food", name:"tomatos", amount:1}
          ,{listName:"Food", name:"onions", amount:1}
          ,{listName:"Food", name:"cucumbers", amount:1}          
          ,{listName:"Clothes", name:"t-shirt", amount:5}
        ]
      ]      
    };

//console.log(data);

const myCanvas = document.getElementById("myCanvas");
myCanvas.width = 400;
myCanvas.height = 400;
const ctx = myCanvas.getContext("2d");


//
const DAY_PIE = 0; 
const WEEK_PIE = 1; 
const MONTH_PIE = 2; 
//

var totalAmountByType = 0;
var totalEverExpenses = data.totalExpenses;
var briefDailyList = data.dailyList[data.dailyList.length-1];
var categoryList = data.categoryList;
var listProgressArray = [];

// console.log("TOTAL EXPENSES EVER =>> ", totalEverExpenses);
// console.log("CATEGORIES =>> ", categoryList);
// console.log("BRIEF DAILY LIST =>> ", briefDailyList);

createPieChart(0);
createGenericTabs(0);



//
function createGenericTabs(type) {

  if(type == DAY_PIE)// brief list of daily category
  {

  }
  var highestValue = 0;

  for (let i = 0; i < briefDailyList.length; i++) {
    totalAmountByType += briefDailyList[i].amount;
  }

  // console.log("totalAmountByType = ", totalAmountByType);
  var list = document.getElementById("listCategory");

  for(let i = 0; i<briefDailyList.length ;i ++)
  {
    let bgCategory = document.createElement("div");
    let progress = document.createElement("div");
    let label = document.createElement("p");
    let expenses = document.createElement("p");

    progress.classList.add("progress");
    label.classList.add("label");
    expenses.classList.add("expenses");  
    bgCategory.setAttribute("class", "bgCategory");
    progress.setAttribute("id", "progress");
    
    bgCategory.appendChild(progress);
    bgCategory.appendChild(label);
    bgCategory.appendChild(expenses);

    list.appendChild(bgCategory, list.childNodes[0]);
    listProgressArray.push(progress);

    
    let percent = Math.round(100 * briefDailyList[i].amount / totalAmountByType);
    if (highestValue <= percent) highestValue = percent;
    // console.log(percent);
    for(let j = 0; j< categoryList.length ; j++)
    {
      if(briefDailyList[i].name === categoryList[j].name)
      {
        progress.innerHTML = briefDailyList[i].name;
        progress.style.backgroundColor = categoryList[j].color;
        progress.style.width = percent + "%";
        label.innerHTML = percent + "%";
        expenses.innerHTML = briefDailyList[i].amount + " Ron";
      }
    }    
  }

  
  for (var i = 0; i < listProgressArray.length; i++)
  {
    var str = parseFloat(listProgressArray[i].style.width);
    if (str != 0)
      listProgressArray[i].style.width = (100 - highestValue + str).toString() + "%";
  }
}


//
function saveData() {
  // console.log(data);
  localStorage.setItem("expensesApp", JSON.stringify(data));
}

//
function getAllCategoriesList(arr)
{
  let categories = [];
  for(let i = 0; i<arr.length;i++)
  {
    categories.push(arr[i].name);
  }
  return categories;
}

function getAllColors(arr1, arr2)
{
  let colors = [];
  for(let i = 0; i<arr1.length; i++)
  {
    for(let j = 0; j<arr2.length; j++)
    {
      if(arr1[i].name == arr2[j].name)
        colors.push(arr2[j].color)
    }
  }
  return colors;
}

//
function createPieChart(type)
{
  let c = getAllColors(briefDailyList, categoryList)
  var myPiechart = new Piechart({
    canvas: myCanvas,
    data: briefDailyList,
    colors: c,
    doughnutHoleSize: 0.8
    //doughnutHoleSize: 0
  });
  myPiechart.draw();
}
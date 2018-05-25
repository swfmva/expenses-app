var data = localStorage.getItem("expensesApp")
  ? JSON.parse(localStorage.getItem("expensesApp"))
  : {
      totalExpenses:595.96
      ,firstInput:true
      ,dailyList:
      [
        [//array of a single day
          {name:"Food", amount:5}
          ,{name:"Clothes",  amount:1}
          ,{name:"Leasure", amount:1}
          ,{name:"Transporation", amount:1}
          ,{name:"Entertainment", amount:1}  
          ,{name:"Vehicle", amount:1}      
          ,{name:"Housing", amount:1}       
          ,{name:"Taxes", amount:1}    
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


var myCanvas;
var ctx;
var cntReportForm = document.getElementById("cntReportForm");
//console.log(data);
var categoryList =  
[
   {name:"Food", color:"#F4B350", amount:103}
  ,{name:"Clothes", color:"#EC644B",  amount:120.65}
  ,{name:"Leasure", color:"#E08283", amount:50.95}
  ,{name:"Transporation", color:"#BE90D4", amount:260.80}
  ,{name:"Entertainment", color:"#52B3D9", amount:34}
  ,{name:"Vehicle", color:"#4ECDC4", amount:22}  
  ,{name:"Housing", color:"#87D37C", amount:26.56}  
  ,{name:"Taxes", color:"#00B16A", amount:34}    
]
//
const DAY_PIE = 0; 
const WEEK_PIE = 1; 
const MONTH_PIE = 2; 
//

var firstInput = data.firstInput;
var totalAmountByType = 0;
var totalEverExpenses = data.totalExpenses;
var briefDailyList = data.dailyList[data.dailyList.length-1];
var listProgressArray = [];

var btnNewEntry = document.getElementById("addNewEntry");
var btnClose = document.getElementById("btnClose");
var btnConfirm = document.getElementById("btnConfirm");
btnNewEntry.addEventListener("mousedown", openEntryForm);
btnClose.addEventListener("mousedown", closeEntryForm);
btnConfirm.addEventListener("mousedown", updateReport);

var keyPad = new Calculator();

function updateReport()
{
  closeEntryForm();
}
function closeEntryForm()
{
  console.log("Entry Form open true");
  cntReportForm.style.display = "block";
  cntEntryForm.style.display = "none";
  inputExpenses.innerHTML = "0";
}

// console.log("TOTAL EXPENSES EVER =>> ", totalEverExpenses);
// console.log("CATEGORIES =>> ", categoryList);
// console.log("BRIEF DAILY LIST =>> ", briefDailyList);


createPieChart(0);
createGenericTabs(0);

function openEntryForm()
{
  console.log("Entry Form open true");
  cntReportForm.style.display = "none";
  cntEntryForm.style.display = "block";  
}


//
function createGenericTabs(type) {

  var list = document.getElementById("listCategory");
  var noExpenses = document.createElement("p");

  if(firstInput == false)
  {
    console.log("no Inputs added yet");
    
    noExpenses.classList.add("noExpenses");
    noExpenses.innerHTML = "No expenses have yet been added"
    list.appendChild(noExpenses);
    return 0 ;
  }
  if(type == DAY_PIE)// brief list of daily category
  {

  }
  var highestValue = 0;

  for (let i = 0; i < briefDailyList.length; i++) {
    totalAmountByType += briefDailyList[i].amount;
  }

  // console.log("totalAmountByType = ", totalAmountByType);
  

  for(let i = 0; i<briefDailyList.length ;i ++)
  {
    //var noExpenses = document.getElementsByClassName("noExpenses");
    if(list.childNodes[0] === noExpenses)
    { 
      console.log(list.childNodes[0])
      list.removeChild(noExpenses);
    }
    
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
  myCanvas= document.getElementById("myCanvas");
  myCanvas.width = 400;
  myCanvas.height = 400;
  ctx = myCanvas.getContext("2d");

  let c = getAllColors(briefDailyList, categoryList)
  var myPiechart = new Piechart
  (
    {
      canvas: myCanvas,
      data: briefDailyList,
      colors: c,
      doughnutHoleSize: 0.8
      //doughnutHoleSize: 0
    }
  );
  myPiechart.draw();
}
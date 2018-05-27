var data = localStorage.getItem("expensesApp")
  ? JSON.parse(localStorage.getItem("expensesApp"))
  : {
      currentDate: new Date().getDate(),
      totalExpenses: 595.96,
      firstInput: true,
      dailyList: 
      [
        [
          // here we add category name and the expenses 
          // { month: 4, categoryName: "Food", amount: 5},
        ]
      ],
      detailedList: 
      [
        [
          // here we save a detailed list for every category.
          // { month: 4, categoryName: "Food", name: "patatos", amount: 1 },
        ]
      ]
    };
console.log(data);
var currentMonth = currentDate.getMonth();
//declare variables >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
var myCanvas = document.getElementById("myCanvas");
myCanvas.width = 400;
myCanvas.height = 400;
var ctx = myCanvas.getContext("2d");
var cntReportForm = document.getElementById("cntReportForm");

//console.log(data);
var categoryList =
[
  { categoryName: "Salary", color: "#ff0000"},
  { categoryName: "Food", color: "#F4B350"},
  { categoryName: "Clothes", color: "#EC644B"},
  { categoryName: "Leasure", color: "#E08283"},
  { categoryName: "Transporation", color: "#BE90D4"},
  { categoryName: "Entertainment", color: "#52B3D9"},
  { categoryName: "Vehicle", color: "#4ECDC4"},
  { categoryName: "Housing", color: "#87D37C"},
  { categoryName: "Taxes", color: "#00B16A"}
];
//
const DAY_PIE = 0;
const MONTH_PIE = 1;
const TOTAL = 2;
//
var firstInput = data.firstInput;
var totalAmountByType = 0;
var totalEverExpenses = data.totalExpenses;
var briefDailyList;
var listProgressArray = [];

var btnNewEntry = document.getElementById("addNewEntry");
var btnClose = document.getElementById("btnClose");
var btnConfirm = document.getElementById("btnConfirm");
var btnReportByType = document.getElementsByClassName("reportButton")
btnNewEntry.addEventListener("mousedown", openEntryForm);
btnClose.addEventListener("mousedown", closeEntryForm);
btnConfirm.addEventListener("mousedown", updateReport);
for(let i = 0; i< btnReportByType.length;i++)
{
  btnReportByType[i].addEventListener("mousedown", onBtnReportDown);
}
var keyPad = new Calculator();
var dropDownCategories = new AddCategories();

/// end of VAR DECLARATIONS >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>


//
checkIfDateHasChanged();

//
createPieChart(1);
createGenericTabs();
//
function openEntryForm() {
  console.log("Entry Form open true");
  cntReportForm.style.display = "none";
  cntEntryForm.style.display = "block";
}

//
function createGenericTabs()
{
  var list = document.getElementById("listCategory");
  var myNode = document.getElementById("foo");

  while (list.firstChild)
  {
    list.removeChild(list.firstChild);
  }

  var noExpenses = document.createElement("p");

  if (firstInput == true || emptyArray == true ) {
    console.log("no Inputs added yet", firstInput, emptyArray);

    noExpenses.classList.add("noExpenses");
    noExpenses.innerHTML = "No expenses have yet been added for today.<BR> Keep it up :D";
    list.appendChild(noExpenses);
    return 0;
  }
  
  firstInput = data.firstInput;


  var highestValue = 0;
  totalAmountByType = 0;

  for (let i = 0; i < briefDailyList.length; i++) {
    totalAmountByType += briefDailyList[i].amount;
  }

  // console.log("totalAmountByType = ", totalAmountByType);

  for (let i = 0; i < briefDailyList.length; i++) {
    //var noExpenses = document.getElementsByClassName("noExpenses");
    if (list.childNodes[0] === noExpenses)
    {
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

    let percent = Math.round(
      100 * briefDailyList[i].amount / totalAmountByType
    );
    if (highestValue <= percent) highestValue = percent;
    // console.log(percent);
    for (let j = 0; j < categoryList.length; j++) {
      if (briefDailyList[i].categoryName === categoryList[j].categoryName) {
        progress.innerHTML = briefDailyList[i].categoryName;
        progress.style.backgroundColor = categoryList[j].color;
        progress.style.width = percent + "%";
        label.innerHTML = percent + "%";
        expenses.innerHTML = briefDailyList[i].amount + " Ron";
      }
    }
  }

  for (var i = 0; i < listProgressArray.length; i++) {
    var str = parseFloat(listProgressArray[i].style.width);
    if (str != 0)
      listProgressArray[i].style.width =
        (100 - highestValue + str).toString() + "%";
  }
}

function getAllColors(arr) {
  let colors = [];
  for (let i = 0; i < arr.length; i++) {
    for (let j = 0; j < categoryList.length; j++) {
      if (arr[i].categoryName == categoryList[j].categoryName) colors.push(categoryList[j].color);
    }
  }
  return colors;
}


//
function createPieChart(type) {

  briefDailyList = getListByType(type);
  
  let colors = getAllColors(briefDailyList);
  if(briefDailyList.length == 0)
  {
    console.log("lenght = 0");
    var myPiechart = new Piechart({canvas: myCanvas, data: [{categoryName:"NONE"}], colors: ["#aaa"], doughnutHoleSize: 0.8 /*, doughnutHoleSize: 0*/ });
  }
  else
  {
    console.log("lenght > 0");
    var myPiechart = new Piechart({canvas: myCanvas, data: briefDailyList, colors: colors, doughnutHoleSize: 0.8 /*, doughnutHoleSize: 0*/ });
  }
  myPiechart.draw();
}
function getDuplicateIndex(name)
{
  for(let i = 0; i < data.dailyList[0].length;i++)
  {
    if(data.dailyList[0][i].categoryName == name && data.dailyList[0][i].month == currentMonth)
    {
      return i;
    }
  }
  return - 1;
}
//
function updateReport() {

  let objIndex = getDuplicateIndex(btnCategories.innerHTML);
  if(btnCategories.innerHTML != "Select Category")
  {
    if(objIndex == -1)
    {
      
    console.log(currentMonth);
      let newEntry = {month:currentMonth, categoryName:btnCategories.innerHTML, amount:parseFloat(inputExpenses.innerHTML)}
      data.dailyList[0].push(newEntry); 
    }
    else
    {        
      data.dailyList[0][objIndex].amount += parseFloat(inputExpenses.innerHTML);
    }

    emptyArray = false;
    closeEntryForm();   
    saveData();
    briefDailyList = getListByType(1);
    colors = getAllColors(briefDailyList);
    var myPiechart = new Piechart({canvas: myCanvas, data: briefDailyList, colors: colors, doughnutHoleSize: 0.8 /*, doughnutHoleSize: 0*/ });
    myPiechart.draw(); 
    createGenericTabs();
    btnCategories.innerHTML = "Select Category";
    btnCategories.style.backgroundColor = "#fff";
    btnCategories.style.color = "#6C7A89";
  }
}

//
function closeEntryForm() {
  console.log("Entry Form open true");
  cntReportForm.style.display = "block";
  cntEntryForm.style.display = "none";
  inputExpenses.innerHTML = "0";
}

//
function saveData() 
{
  localStorage.setItem("expensesApp", JSON.stringify(data));
}

//
function checkIfDateHasChanged()
{
  // we also want to save data for the first time the user enters the game
  if(data.firstInput == true)
  {
    data.firstInput = false;
    firstInput = false;
    saveData();
    
    console.log("firstTipe open = " , data);
  }


  //check date
  var tempDate = new Date();
  if (tempDate.getDate() != data.currentDate) {
    console.log("date has been changed");
    data.currentDate = tempDate.getDate();
    data.dailyList.unshift([]);
    saveData();
  }
}

//
function onBtnReportDown(evt)
{
  if(evt.target.innerHTML == "Day")
  {
    createPieChart(0);
    createGenericTabs();
  }
  if(evt.target.innerHTML == "Month")
  {
    createPieChart(1);
    createGenericTabs();
  }
  if(evt.target.innerHTML == "Total")
  {
    createPieChart(2);
    createGenericTabs();
  }
}


//
function getListByType(type)
{
  var tempData = copy(data);
  //console.log("type = ", type);
  if(type == DAY_PIE)
  {
    var value = [];
    for(let i = 0; i< tempData.dailyList[0].length; i++)
    {
      value.push(tempData.dailyList[0][i])
    }   
  }
  else 
  {
    var days = [0,31,tempData.dailyList.length];
    var value = [];
    var tempArr = [];
    
    for(let i = 0; i < days[type]; i++)
    {
      if(tempData.dailyList[i] != undefined)
      {
        for(let j = 0; j < tempData.dailyList[i].length; j++)
        {
          if(type == 1 && tempData.dailyList[i][j].month == currentMonth)
          {
            tempArr.push(tempData.dailyList[i][j])
            console.log("month =" ,tempData.dailyList[i][j].month)
          }
          else if(type == 2)
          {
            tempArr.push(tempData.dailyList[i][j])
          }
        }
      }
    } 
    //console.log(tempArr);
    
    while(tempArr.length > 0)
    {
      var index = checkDuplicate(tempArr[0], value);
      if(index == -1)
      {
        value.push(tempArr[0]);
        tempArr.splice(0,1);
      }
      else
      {
        value[index].amount += tempArr[0].amount;
        tempArr.splice(0,1);
      }
    }
  }

  value.sort(function(a,b){return b.amount - a.amount});
  //value.reverse();

  return value;
}

function checkDuplicate(elem, arr)
{
  if(arr.length == 0)
   return -1;
  let index; 
  for(var i = 0; i < arr.length; i++)
  {
    if(elem.categoryName == arr[i].categoryName)
    {
      index = i;
      return index;
    }
  }
  return -1;
}

function copy(o) {
  var out, v, key;
  out = Array.isArray(o) ? [] : {};
  for (key in o) {
      v = o[key];
      out[key] = (typeof v === "object" && v !== null) ? copy(v) : v;
  }
  return out;
}



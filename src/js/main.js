var data = localStorage.getItem("expensesApp")
  ? JSON.parse(localStorage.getItem("expensesApp"))
  : {
      categories:
      [
        {
        "Food": 0,
        "Clothes": 0,
        "Relaxation": 0,
        "Fuel": 0,
        "Services": 0,
        "House": 0
        }
      ],
    };

console.log(data);

var myCanvas = document.getElementById("myCanvas");
myCanvas.width = 400;1
myCanvas.height = 400;
var ctx = myCanvas.getContext("2d");

var total_value = 0;

var myCategories = [
  "Food",
  "Clothes",
  "Relaxation",
  "Fuel",
  "Services",
  "House"
];

//
var myPiechart = new Piechart({
  canvas: myCanvas,
  data: myVinyls,
  colors: ["#519fc6", "#a36acb", "#e55789", "#1dd1a1", "#d5a32a", "#6eb239"],
  doughnutHoleSize: 0.8
  //doughnutHoleSize: 0
});

createPieChart();
createGenericTabs();

//
function createPieChart() {
  myPiechart.draw();
}


//
function createGenericTabs() {
  var listCategory = document.getElementsByClassName("progress");
  var listLabels = document.getElementsByClassName("label");
  var listExpenses = document.getElementsByClassName("expenses");
  var highestValue = 0;

  for (var i = 0; i < listCategory.length; i++) {
    total_value += myVinyls[myCategories[i]];
  }

  for (var i = 0; i < listCategory.length; i++) {
    var label = myCategories[i];
    var expenses = myVinyls[myCategories[i]];
    var value = Math.round(100 * myVinyls[myCategories[i]] / total_value);

    //console.log(expenses);
    listCategory[i].style.backgroundColor = myPiechart.colors[i];
    listCategory[i].style.width = value.toString() + "%";
    listCategory[i].innerHTML = label;
    listLabels[i].innerHTML = value + "%";

    listExpenses[i].innerHTML = Math.floor(expenses);
    if (highestValue <= value) highestValue = value;
  }

  //console.log(highestValue);

  for (var i = 0; i < listCategory.length; i++) {
    var str = parseFloat(listCategory[i].style.width);
    if (str != 0)
      listCategory[i].style.width = (100 - highestValue + str).toString() + "%";
  }
}


//
function saveData() {
  console.log(data);
  localStorage.setItem("expensesApp", JSON.stringify(data));
}
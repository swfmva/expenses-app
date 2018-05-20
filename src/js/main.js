var myCanvas = document.getElementById("myCanvas");
myCanvas.width = 500;
myCanvas.height = 500;
 
var ctx = myCanvas.getContext("2d");

function drawLine(ctx, startX, startY, endX, endY){
    ctx.beginPath();
    ctx.moveTo(startX,startY);
    ctx.lineTo(endX,endY);
}
function drawArc(ctx, centerX, centerY, radius, startAngle, endAngle){
    ctx.beginPath();
    ctx.arc(centerX, centerY, radius, startAngle, endAngle);
    ctx.strokeStyle = '#2c2c54';
    ctx.lineWidth=12;
    ctx.stroke();
}
function drawPieSlice(ctx,centerX, centerY, radius, startAngle, endAngle, color ){
    ctx.fillStyle = color;
    ctx.beginPath();
    ctx.moveTo(centerX,centerY);
    ctx.arc(centerX, centerY, radius, startAngle, endAngle);
    ctx.closePath();
    ctx.fill();
    ctx.strokeStyle = '#2c2c54';
    ctx.lineWidth=6;
    ctx.stroke();
   
}
var myVinyls =
{
    "Food": 1,
    "Clothes": 2,
    "Relaxation": 3,
    "Fuel": 4,
    "Services": 4,
    "House": 4
}

var Piechart = function(options){
    this.options = options;
    this.canvas = options.canvas;
    this.ctx = this.canvas.getContext("2d");
    this.colors = options.colors;
 
    this.draw = function(){
        var total_value = 0;
        var color_index = 0;
        for (var categ in this.options.data){
            var val = this.options.data[categ];
            total_value += val;
        }
 
        var start_angle = 0;
        for (categ in this.options.data){
            val = this.options.data[categ];
            var slice_angle = 2 * Math.PI * val / total_value;
 
            drawPieSlice(
                this.ctx,
                this.canvas.width/2,
                this.canvas.height/2,
                Math.min(this.canvas.width/2-10,this.canvas.height/2-10),
                start_angle,
                start_angle+slice_angle,
                this.colors[color_index%this.colors.length]
            );
 
            start_angle += slice_angle;
            color_index++;
        }

        //drawing a white circle over the chart
        //to create the doughnut chart
        if (this.options.doughnutHoleSize){
            drawArc(
                this.ctx,
                this.canvas.width/2,
                this.canvas.height/2,
                this.options.doughnutHoleSize * Math.min(this.canvas.width/2-10,this.canvas.height/2-10),
                0,
                2 * Math.PI,
                "#2c2c54"
            );
            ctx.fillStyle = "#2c2c54";
            ctx.fill();
        }
        // var labelText = "MAY 2018";
        // this.ctx.fillStyle = "white";
        // this.ctx.font = "bold 20px Arial";
        // var textWidth = ctx.measureText(labelText);
        // this.ctx.fillText(labelText, this.canvas.width/2 - ctx.measureText(labelText).width/2, this.canvas.height/2-20);
        // var labelText = "Total amount: 203Ron";
        // this.ctx.fillStyle = "white";
        // this.ctx.font = "16px Arial";
        // var textWidth = ctx.measureText(labelText);
        // this.ctx.fillText(labelText, this.canvas.width/2 - ctx.measureText(labelText).width/2, this.canvas.height/2+20);
      
        //console.log(textWidth);
 
        
    }
}
var myPiechart = new Piechart(
    {
        canvas:myCanvas,
        data:myVinyls,
        colors:["#feca57","#ff6b6b", "#48dbfb","#1dd1a1","#ff9ff3","#c8d6e5"],
        //doughnutHoleSize:.7
        doughnutHoleSize:0
    }
);
console.log(myVinyls)

myPiechart.draw();

// var buttonNames =
// [
//     {name:"Food", color:"#feca57"},
//     {name:"Clothes", color:"#ff6b6b"},
//     {name:"Relaxation", color:"#48dbfb"},
//     {name:"Fuel", color:"#1dd1a1"},
//     {name:"Services", color:"#ff9ff3"},
//     {name:"House", color:"#c8d6e5"}
// ]
// var buttons = document.getElementsByClassName("btnCategory");
// console.log(buttons);
// for (i = 0; i < buttons.length; i++) {
//     buttons[i].innerHTML = buttonNames[i].name;
// }

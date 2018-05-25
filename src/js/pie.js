var currentDate = new Date();
var month = ["JANUARY","FEBRUARY","MARCH","APRIL","MAY","JUNE",
            "JULY","AUGUST","SEPTEMBER","OCTOBER","NOVEMBER","DECEMBER"];
var emptyArray = false;
var slices = 0;
var totalExpensesSum = 20;
var myVinyls =
{
    "Food":35.3,
    "Clothes": 69.78,
    "Relaxation":310.30,
    "Fuel": 120.65,
    "Services": 150.10,
    "House": 86.3
}

function Piechart (options){
    this.options = options;
    this.canvas = options.canvas;
    this.ctx = this.canvas.getContext("2d");
    this.colors = options.colors;
    if(this.options.data[0].name == "NONE")
        emptyArray = true;
    else 
        emptyArray = false;

    this.draw = function(){
        var total_value = 0;
        var color_index = 0;
        if(emptyArray)
        {
            total_value = 1;
        }
        else
        {
            for (var categ in this.options.data){
                var val = this.options.data[categ].amount;
                total_value += val;
            }
        }
        slices = 0;
        var start_angle = 0;
        for (categ in this.options.data){
            slices ++ ;
            val = (emptyArray)? 1:this.options.data[categ].amount;
            var slice_angle = 2 * Math.PI * val / total_value;
            console.log(slices);
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
                2 * Math.PI
            );
            
            ctx.fillStyle = "#dfe6e9";
            ctx.fill();
        }


        this.ctx.fillStyle = "#2d3436";
        var monthNumber = 8;

        var monthText = month[monthNumber];
        var yearText = currentDate.getFullYear();
        var expensesText = (emptyArray)?("0 RON"):(Math.floor(total_value) + " RON");

        this.ctx.font = "normal 60px Arial";
        var yearWidth = this.ctx.measureText(yearText).width;
        this.ctx.fillText(yearText, this.canvas.width/2 - yearWidth/2,this.canvas.height/2-40);

        this.ctx.font = "normal 40px Arial";
        var monthWidth = this.ctx.measureText(monthText).width;
        this.ctx.fillText(monthText, this.canvas.width/2 - monthWidth/2,this.canvas.height/2+4);

        this.ctx.font = "normal 45px Arial";
        var expensesWidth = this.ctx.measureText(expensesText).width;    
        this.ctx.fillText(expensesText, this.canvas.width/2 - expensesWidth/2,this.canvas.height/2+80);
        
    }
}

function drawArc(ctx, centerX, centerY, radius, startAngle, endAngle){
    ctx.beginPath();
    ctx.arc(centerX, centerY, radius, startAngle, endAngle);
    ctx.strokeStyle = '#dfe6e9'; 
    ctx.lineWidth=10;
    ctx.stroke();
}
function drawPieSlice(ctx,centerX, centerY, radius, startAngle, endAngle, color ){
    ctx.fillStyle = color;    
    ctx.beginPath();
    ctx.moveTo(centerX,centerY);
    ctx.arc(centerX, centerY, radius, startAngle, endAngle);    
    ctx.closePath();
    ctx.fill();    
    ctx.strokeStyle = '#dfe6e9'; 
    ctx.lineWidth=5;
    if(!emptyArray && slices > 1)
        ctx.stroke();   
}


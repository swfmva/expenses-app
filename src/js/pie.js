var currentDate = new Date();
var month = ["JANUARY","FEBRUARY","MARCH","APRIL","MAY","JUNE",
            "JULY","AUGUST","SEPTEMBER","OCTOBER","NOVEMBER","DECEMBER"];
var emptyArray = false;
var slices = 0;

function Piechart (options){
    this.options = options;
    this.canvas = options.canvas;
    this.ctx = this.canvas.getContext("2d");
    this.colors = options.colors;

    if(this.options.data[0].categoryName == "NONE")
        emptyArray = true;
    else 
        emptyArray = false;

    //console.log(" = emptyArray = " , emptyArray)
    this.draw = function(){
        
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
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
            
            ctx.fillStyle = "#403E52";
            ctx.fill();
        }


       
        var dayNumber = currentDate.getDate();
        var monthNumber = currentDate.getMonth();

        var monthText = month[monthNumber].substring(0,3);
        var yearText = currentDate.getFullYear();
        var expensesText = (emptyArray)?("0"):(Math.floor(total_value));

        this.ctx.fillStyle = "#aaa";
        this.ctx.font = "40px Roboto";
        var monthWidth = this.ctx.measureText(dayNumber + " " + monthText + " " + yearText).width;
        this.ctx.fillText(dayNumber + " " + monthText + " " + yearText, this.canvas.width/2 - monthWidth/2,this.canvas.height/2-40);

        this.ctx.fillStyle = "#fff";
        this.ctx.font = "70px Roboto";
        var expensesWidth = this.ctx.measureText(expensesText).width;    
        this.ctx.fillText(expensesText, this.canvas.width/2 - expensesWidth/2,this.canvas.height/2+40);

        this.ctx.fillStyle = "#aaa";
        this.ctx.font = "30px Roboto";
        var currencyWidth = this.ctx.measureText("RON").width;    
        this.ctx.fillText("RON", this.canvas.width/2 - currencyWidth/2,this.canvas.height/2+80);
        
    }
}

function drawArc(ctx, centerX, centerY, radius, startAngle, endAngle){
    ctx.beginPath();
    ctx.arc(centerX, centerY, radius, startAngle, endAngle);
    ctx.strokeStyle = '#403E52'; 
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
    ctx.strokeStyle = '#403E52'; 
    ctx.lineWidth=5;
    if(!emptyArray && slices > 1)
        ctx.stroke();   
}


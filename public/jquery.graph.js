/** 
* @file                         jquery.graph.js
* @note                         JQuery Graph File for use in Metrics
*                               
* @appdef                       graph 0.1
* @link                         http: //www.qualeapps.com
* @copyright                    Michael C. Beck michael.beck@qualeapps.com
*                               
* @js-for                       IE8+, FF3+, Opera 10, Safari 3+
* 
*/


$.fn.graph=function(options){
  
  var data = $(this).attr('id');
  var opts = {
    barSpacing: 10,
	 	barWidth: 20, 
	  canvasHeight: 220,
		numYLabel: 8,
		xOffset: 30,
		xLabelOffset: 10,
		maxVal: 0, 
		gWidth: 750, 
		gHeight: 220,
		font: "10px Helvetica",
		fontColor:'#ccc',
		gridStyle: '#444853',
		barColor: '#4ab8f5',
		strokeColor: '#4ab8f5',
		strokeWidth: '3',
		dotSize: '5',
		dotColor: '#fff',
		yColumn: 2,
		xColumn: 1,
		drawNullLine: true,
		drawBarGraph: false,
		drawLineGraph: false
  };
  
  $.extend(opts, options);
	
	this.each(function() {
		
    	// Graph variables
    	var gValues = [];
    	var xLabels = [];
    	var yLabels = [];
 		  
    	// Canvas Variables
      var canvas, context;
	 
    	if (opts.data) getValues(); else getValuesFromTable();
    	initCanvas(); 
    	maxValues(gValues);
    	drawXlabels();
      drawYLabel();
      drawGrid();
    	if (opts.drawBarGraph) drawBarGraph();
    	if (opts.drawLineGraph) drawLineGraph();

      function drawGrid () {
          for(index=0; index<opts.numYLabel; index++) {
            context.beginPath();  
            context.moveTo(opts.xOffset+0.5,y(yLabels[index])+0.5);
            context.lineTo(opts.xOffset + opts.gWidth, y(yLabels[index])+0.5);
            context.strokeStyle = opts.gridStyle;
            context.stroke();
            context.closePath();
          }  
      }

    	function getValuesFromTable () {
    		 $("#"+data+" tr td:nth-child("+opts.yColumn+")").each(function(){
    		   gValues.push($(this).text());
    	 	 });
	 
    		 $("#"+data+" tr td:nth-child("+opts.xColumn+")").each(function(){
    	 	   xLabels.push($(this).text());
    	 	 });
    	 } 
    	 
    	function getValues() {
    	  $.each(opts.data, function(n, data){
    	    gValues.push(data);
    	  })
    	  $.each(opts.intervals, function(n, data){
    	    xLabels.push(data);
    	  })
    	}

    	function initCanvas () {
	  
    	  $('#'+data).hide();

        $('#'+data).after($('<canvas />').attr({
           'width': opts.gWidth+50,
           'height': opts.gHeight+30,
           'id': data+'-graph',
           'class':'graph'
         }));
         
        canvas = $('#'+data+'-graph').get(0);
    	 	if (!canvas) { return; }
	 
        context = canvas.getContext('2d');
    	 	if (!context) { return; }
    	 }
	   
        function drawBarGraph () {
    	    $.each(gValues, function(index,val){
    			  context.fillStyle = opts.barColor;
    	      context.fillRect( x(index), y(gValues[index]), opts.barWidth, height(gValues[index]));  
    	    })
    	 }
    	 
    	function drawDots(){
    	  $.each(gValues, function(index,val){
    	    context.fillStyle = opts.dotColor;
    	    context.fillRect(x(index)+(opts.barWidth/2)-(opts.dotSize/2), y(gValues[index])-(opts.dotSize/2), opts.dotSize, opts.dotSize);
    	  })
    	}
    	 
    	function drawLineGraph() {    	      	  
    	  context.beginPath(); 
    	  if (opts.drawNullLine) context.moveTo(opts.xOffset,(opts.gHeight+y(gValues[0]))/2);
    	  $.each(gValues, function(index,val){
    	    context.lineTo(x(index)+(opts.barWidth/2), y(gValues[index]));
    	    context.strokeStyle = opts.strokeColor;
    	    context.lineWidth = opts.strokeWidth;
    	  })
    	  context.stroke();
    	  context.closePath();
    	  drawDots();
    	}

    	function drawYLabel() {
    		   yLabels.unshift("0"); //drawing a zero line
    	     for(index=0; index<opts.numYLabel; index++)  {
      		   yLabels.push(Math.round(opts.maxVal/opts.numYLabel)*(index+1));
      		   context.fillStyle = opts.fontColor;
      		   context.fillText(yLabels[index], opts.xLabelOffset, y(yLabels[index])+4);
    	      }
          }  

    	function drawXlabels (){
    		 //context.save();
    		 context.font = opts.font;
    		 context.fillStyle = opts.fontColor;
		 
    		 $.each(gValues, function(index,val){
    		   context.fillText(xLabels[index], x(index), opts.gHeight+17);
    		 })
      }
	 
    	function height (param) {
    	   return scale(param);
      }
	 
    	function x (param) {
    	   return (param*opts.barWidth)+((param+1)*opts.barSpacing)+opts.xOffset;
      }
	 
    	function y (param) {
    	   return opts.gHeight - scale (param);
      }
	  
    	function scale (param) {
    	   return  Math.round((param/opts.maxVal)*opts.gHeight);
      }
	 
    	function maxValues (arr) {
    		opts.maxVal=0;
    		$.each(arr, function(i,val){
    		    if (opts.maxVal<parseInt(arr[i])) {
        		  opts.maxVal=parseInt(arr[i]);
        	  }
    		  })
    	   opts.maxVal*= 1.1;
    	 }
    	  
	 return this;  
	 })
	 
};         


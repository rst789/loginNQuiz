 document.getElementById("demo").onchange = (event) => {
        // NEW FILE READER
        const reader = new FileReader();
        const data = [];

        // ON FINISH LOADING
        reader.addEventListener("loadend", (evt) => {
            // GET THE FIRST WORKSHEET
            const workbook = XLSX.read(evt.target.result, {type: "binary"}),
                worksheet = workbook.Sheets[workbook.SheetNames[0]],
                range = XLSX.utils.decode_range(worksheet["!ref"]);

            // READ CELLS IN ARRAY
            for (let row = range.s.r; row <= range.e.r; row++) {
                let i = data.length;
                data.push([]);
                for (let col = range.s.c; col <= range.e.c; col++) {
                    let cell = worksheet[XLSX.utils.encode_cell({r: row, c: col})];
                    data[i].push(cell.v);
                }
            }
            console.log(data);
        });

        document.getElementById("load_quiz").addEventListener("click", (event) =>{
            document.getElementById("theDiv").innerHTML = "Question 1: " + data[0][0];
        });

        document.getElementById("load_quiz").addEventListener("click", (event) => {
            document.getElementById("theDivRadio1").innerHTML = data[0][1];
        });

        document.getElementById("load_quiz").addEventListener("click", (event) => {
            document.getElementById("theDivRadio2").innerHTML = data[0][2];
        });

         document.getElementById("load_quiz").addEventListener("click", (event) => {
             document.getElementById("theDivRadio3").innerHTML = data[0][3];
        });

         /*------------------------------------------------------------------------*/

         document.getElementById("load_quiz").addEventListener("click", (event) =>{
             document.getElementById("theDiv2").innerHTML = "Question 2: " + data[1][0];
         });

         document.getElementById("load_quiz").addEventListener("click", (event) => {
             document.getElementById("theDivRadio11").innerHTML = data[1][1];
         });

         document.getElementById("load_quiz").addEventListener("click", (event) => {
             document.getElementById("theDivRadio22").innerHTML = data[1][2];
         });

         document.getElementById("load_quiz").addEventListener("click", (event) => {
             document.getElementById("theDivRadio33").innerHTML = data[1][3];
         });

         /*------------------------------------------------------------------------*/

         document.getElementById("load_quiz").addEventListener("click", (event) =>{
             document.getElementById("theDiv3").innerHTML = "Question 3: " + data[2][0];
         });

         document.getElementById("load_quiz").addEventListener("click", (event) => {
             document.getElementById("theDivRadio111").innerHTML = data[2][1];
         });

         document.getElementById("load_quiz").addEventListener("click", (event) => {
             document.getElementById("theDivRadio222").innerHTML = data[2][2];
         });

         document.getElementById("load_quiz").addEventListener("click", (event) => {
             document.getElementById("theDivRadio333").innerHTML = data[2][3];
         });

         // START - READ SELECTED EXCEL FILE
            reader.readAsArrayBuffer(event.target.files[0]);
};

     function formVis() {
         const formThing = document.getElementById("formQuiz");
             formThing.style.opacity = 1;
     }

     function getScore(){

         let quizScore = 0;
         let allAnswers = 3;
         let falseAnswers = 0;

         const score = document.querySelector('input[name="quizQ1"]:checked').value;
         if(!score){
             alert('No score was selected. Try again.');
             falseAnswers++;
             return false;
         }

         if(score === "data[0][1]") {
             quizScore++;
         }

         const score2 = document.querySelector('input[name="quizQ2"]:checked').value;
         if(!score2){
             alert('No score was selected. Try again.');
             falseAnswers++;
             return false;
         }

         if(score2 === "data[1][3]") {
             quizScore++;
         }

         const score3 = document.querySelector('input[name="quizQ3"]:checked').value;
         if(!score3){
             alert('No score was selected. Try again.');
             falseAnswers++;
             return false;
         }

         if(score3 === "data[2][3]") {
             quizScore++;
         }

         // console.log(quizScore);
         alert("You have scored: " + quizScore + "/3 points!");

         allAnswers = 3;
         falseAnswers = allAnswers - quizScore;
         // console.log(falseAnswers);

         /*------------------------------------------------------------------------*/
         /*---------------------------Drawer Method Below--------------------------*/
         /*------------------------------------------------------------------------*/

         let myCanvas = document.getElementById("myCanvas");
         myCanvas.width = 600;
         myCanvas.width = 400;

         function drawPieSlice(ctx,centerX, centerY, radius, startAngle, endAngle, fillColor, strokeColor) {
             ctx.save();
             ctx.fillStyle = fillColor;
             ctx.strokeStyle = strokeColor;
             ctx.beginPath();
             ctx.moveTo(centerX, centerY);
             ctx.arc(centerX, centerY, radius, startAngle, endAngle, strokeColor);
             ctx.closePath();
             ctx.fill();
             ctx.restore();
         }

         const Piechart = function (options) {
             this.options = options;
             this.canvas = options.canvas;
             this.ctx = this.canvas.getContext("2d");
             this.colors = options.colors;

             this.draw = function () {
                 let val;
                 let categ;
                 let total_value = 0;
                 let color_index = 0;
                 for (categ in this.options.data) {
                     val = this.options.data[categ];
                     total_value += val;
                 }
                 let start_angle = 0;
                 for (categ in this.options.data) {
                     val = this.options.data[categ];
                     const slice_angle = 2 * Math.PI * val / total_value;

                     drawPieSlice(
                         this.ctx,
                         this.canvas.width / 2,
                         this.canvas.height / 2,
                         Math.min(this.canvas.width / 2, this.canvas.height / 2),
                         start_angle,
                         start_angle + slice_angle,
                         this.colors[color_index % this.colors.length]
                     );
                     start_angle += slice_angle;
                     color_index++;
                 }

                 if (this.options.doughnutHoleSize){

                     start_angle = 0;
                     for (categ in this.options.data){
                         val = this.options.data[categ];
                         slice_angle = 2 * Math.PI * val / total_value;
                         var pieRadius = Math.min(this.canvas.width/2,this.canvas.height/2);
                         var labelX = this.canvas.width/2 + (pieRadius / 2) * Math.cos(start_angle + slice_angle/2);
                         var labelY = this.canvas.height/2 + (pieRadius / 2) * Math.sin(start_angle + slice_angle/2);

                         if (this.options.doughnutHoleSize){
                             var offset = (pieRadius * this.options.doughnutHoleSize ) / 2;
                             labelX = this.canvas.width/2 + (offset + pieRadius / 2) * Math.cos(start_angle + slice_angle/2);
                             labelY = this.canvas.height/2 + (offset + pieRadius / 2) * Math.sin(start_angle + slice_angle/2);
                         }

                         var labelText = Math.round(100 * val / total_value);
                         this.ctx.fillStyle = "white";
                         this.ctx.font = "bold 20px Arial";
                         this.ctx.fillText(labelText+"%", labelX,labelY);
                         start_angle += slice_angle;
                     }

                     drawPieSlice(
                         this.ctx,
                         this.canvas.width/2,
                         this.canvas.height/2,
                         this.options.doughnutHoleSize * Math.min(this.canvas.width/2,this.canvas.height/2),
                         0,
                         2 * Math.PI,
                         "#FFF5EEFF"
                     );
                 }

                 if (this.options.legend){
                     color_index = 0;
                     let legendHTML = "";
                     for (categ in this.options.data){
                         legendHTML += "<div><span style='display:inline-block;width:20px;background-color:"+this.colors[color_index++]+";'>&nbsp;</span> "+categ+"</div>";
                     }
                     this.options.legend.innerHTML = legendHTML;
                 }
             }
         };

         const myVinyls = {
             "Correct": quizScore,
             "Wrong": falseAnswers
         };

         const myLegend = document.getElementById("myLegend");

         const myPiechart = new Piechart({
                 canvas: myCanvas,
                 data: myVinyls,
                 colors: ["#4fe34f","#f33810"],
                 legend: myLegend,
                 doughnutHoleSize: 0.5
             }
         );
         myPiechart.draw();
     }
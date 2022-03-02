// import {
//     AnimatedAxis, // any of these can be non-animated equivalents
//     AnimatedGrid,
//     AnimatedLineSeries,
//     XYChart,
//     Tooltip,
//     PatternLines
//   } from "@visx/xychart";
  import { Zoom } from "@visx/zoom";
  import {Chart as ChartJS,LineElement,CategoryScale,LinearScale,PointElement} from 'chart.js'
  import zoomPlugin from 'chartjs-plugin-zoom';
  import {Bar,Line,Pie,tooltips,Bubble,PolarArea, Scatter,Chart} from 'react-chartjs-2'
import { ContextExclusionPlugin } from "webpack";
let delayed
//   import Chart from './Ch'
  ChartJS.register(zoomPlugin,LineElement,CategoryScale,LinearScale,PointElement)
  
  const Chartcomponent =({dataerror,dataans,datafx})=>{
    // var xValues = [50,60,70,80,90,100,110,120,130,140,150];
    // var yValues = [7,8,8,9,9,9,10,11,14,14,15];
    const accessors ={
        xAccessor:d=>d.x,
        yAccessor:d=>d.y,
        
    }
    const labels=[]
    let x1=[]
    let x2=[]
    let x3=[]
    
    for (let i = 0 ;i<dataans.length;i++){
        labels.push(String(i+1))
        let t = dataans[i]?.y
        // console.log(t)
        x1.push(t)
        t = dataerror[i]?.y
        x2.push(t);
        t = datafx[i]?.y
        x3.push(t);
    }
    // console.log(x1)
    x1 = Object.keys(x1).map((e) =>Number(x1[e]))
    x2 = Object.keys(x2).map((e) =>Number(x2[e]))
    x3 = Object.keys(x3).map((e) =>Number(x3[e]))
    const d = [{x1:x1},{x2:x2},{x3:x3},{label:labels}]
    console.log(d)
    // console.log(x1)
    let data = {}
    
    // console.log(labels)
    if (x1.length > 1) {
      data = {
        labels: labels,
        datasets: [
          
          {
            label: "error",
            data: x2,
            fill: false,
            // backgroundColor: ,
            borderColor: "red",
          },
          // {
          //   label: "f(x)",
          //   data: x3,
          //   fill: false,
          //   // backgroundColor: "rgba(75,192,192,0.2)",
          //   borderColor: "blue",
          // },
          {
            label: "answer",
            data: x1,
            fill: true,
            backgroundColor: "#CCFFCC",
            borderColor: "green",
            // borderWidth:"3",
            tension:0.45
          },
          // {
          //   label: "",
          //   data: [,-1,-0.5,0,1,2,4,5],
          //   fill: false,
          //   // backgroundColor: "rgba(75,192,192,0.2)",
          //   borderColor: "white",
          // },
        ],
      };
    } else {
      data = {
        labels: [1, 2, 3, 4, 5, 6, 7, 8],
        datasets: [
          {
            label: "name",
            data: [],
            fill: true,
            backgroundColor: "rgba(75,192,192,0.2)",
            borderColor: "rgba(75,192,192,1)",
          },
        ],
      };
    }
    const tooltipline ={
      id:'tooltipLine',
      beforeDraw:chart=>{
        const ctx = chart.ctx;
        console.log(chart)
      }
    }
      const options={
          responsive:true,
          // radius:0,
          // hoverRadius:12,
          tension:10,
          hitRadius:20,
          // hoverRadius:100,
        
          maintainAspectRatio:false,
          // animation:{
          //   onComplete:()=>{
          //     delayed =true;
          //   },
          //   delay:(context)=>{
          //     let delay =0;
          //     if(context.type ==="data" && context.mode==="default" &&!delayed){
          //       delay = context.dataIndex*300+context.datasetIndex*100
          //     }
          //     return delay;
          //   },
          // },
          plugins: {
            zoom: {
              zoom: {
                wheel: {
                  enabled: true // SET SCROOL ZOOM TO TRUE
                },
                mode: "xy",
                speed: 100
              },
              pan: {
                enabled: true,
                mode: "xy",
                speed: 100
              }
            }
          },
          scales: {

    
            // y: {

            //   suggestMin:0,
            //   suggestMax:20,
            //   type:"logarithmic",
            //   grid: {
            //     display: true,
            //     color: "rgba(255,99,132,0.2)"
            //   }
            // },
            // x: {
            //   grid: {
            //     display: false
            //   }
            // }
          }
      }
    
      // console.log(data)
    return (
        // <h1>h</h1>
        // className="graph"
        <div >

              <Line data={data} 
                option={options}
                height={1000}
                width={1500}
                activedot={{r:8}
                
              }
            />
            {/* <canvas id="chart1" height="400px" width="800px"></canvas> */}
        </div>
    //   <div>
    //     <script src="https://cdnjs.cloudflare.com/ajax/libs/Chart.js/2.9.4/Chart.js"></script>
    //     <canvas id="myChart"></canvas>
    //     <Line 
    //         datasets :[{
    //             labels:xValues

    //         }]
            
    //         // height={50}
    //         // options={
    //         //     {maintainAspectRatio:false}
    //         // }
    //     />
            
      
    //   </div>

        // <div>
        //     <XYChart
        //         height={600}
        //         width={1500}
        //         xScale={{ type: "band" }}
        //         yScale={{ type: "linear" }}>
        //         <AnimatedAxis orientation="bottom" />
        //         <AnimatedGrid columns={false} rows={false} numTicks={4} />
        //         <AnimatedLineSeries dataKey="answer" data={dataans} {...accessors} stroke="black" strokeWidth={2} />
        //         <AnimatedLineSeries dataKey="error" data={dataerror} {...accessors} stroke="red" />
        //         <AnimatedLineSeries dataKey="fx" data={datafx} {...accessors} stroke="green" />
        //         {/* <PatternLines id="lines"/> */}
        //         <Tooltip
        //             snapTooltipToDatumX
        //             snapTooltipToDatumY
        //             showVerticalCrosshair
        //             showSeriesGlyphs
        //             renderTooltip={({ tooltipData }) => (
        //                 <div>
        //                     <div
        //                         style={{ color: "red" }}
        //                     >
        //                         {tooltipData.nearestDatum.key}
        //                     </div>
        //                     {"round : " + accessors.xAccessor(tooltipData.nearestDatum.datum)}
        //                     {", "}
        //                     {accessors.yAccessor(tooltipData.nearestDatum.datum)}

        //                 </div>
        //             )}
        //         />
        //     </XYChart>
        // </div>
    )
  }
  export default Chartcomponent;



//   const data = {
//     labels: [1,2,3,4,5,6,7,8],
//     datasets: [
//         {
//             label: "First dataset",
//             data: [3, 1, 8, 41, 44, 1.115,7],
//             fill: true,
//             backgroundColor: "rgba(75,192,192,0.2)",
//             borderColor: "rgba(75,192,192,1)"
//         }
//         ,
//     {
//       label: "Second dataset",
//       data: [33, 25, 35, 51, 54, 76],
//       fill: false,
//       borderColor: "#742774"
//     }
//   ]}
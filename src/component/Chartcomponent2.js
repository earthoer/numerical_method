
import {
    Chart as ChartJS,
    LineElement,
    CategoryScale,
    LinearScale,
    PointElement,
    Title,
    Tooltip,
    Legend,
    Filler
  } from "chart.js";
  import {
    Bar,
    Line,
  
  } from "react-chartjs-2";
  import zoomPlugin from "chartjs-plugin-zoom";
  import { evaluate,parse,sqrt,abs,derivative,format,matrix,det,multiply,subset,index,row,column,transpose} from "mathjs";
  import { ContextExclusionPlugin } from "webpack";
  import Chart from "react-apexcharts"
  import { useState,useEffect, createElement,useRef } from "react";
  import "./Chartcomponent2.css"
  let delayed;
  //   import Chart from './Ch'

  ChartJS.register(
    zoomPlugin,
    LineElement,
    CategoryScale,
    LinearScale,
    PointElement,
    Title,
    Tooltip,
    Legend,
    Filler
  );
  
  const Chartcomponent2 = ({fx,l,r }) => {
    const Fx = parse(fx)
    let datas =[]
    let c = 0;
    let pos =0;
    // let l = [];
    // const [Data,setData] = useState([])
    let data =[]
    let labels = []
    let Data = []
    
    // 
    let count =0;
    if(fx.length>0){
        for(let i =-40; i<41;i+=1){
                labels.push(i)
                data.push(Fx.evaluate({x:i}))
                // 
            count++;
        }
        Data = {
          options: {
            chart: {
              type:"line",
              id: "chart1",

              toolbar:{
                autoSelected:'pan',
                show:false
              }
              ,
              
            },
            colors:['#FF0000'],
              stroke:{
                curve:"straight"
              },
              grid:{
                padding:{
                  right:20,
                  left:16,
                }
              },
              
            annotations:{
                yaxis:[{
                  y:0,
                  tickAmount:10,
                  strokeDashArray: 0,
                  borderColor:'black',
                  style:{
                    color:"#fff",
                    background:'#00E396',
                  }
                }],


                xaxis: [{
                  x: 0,
                  strokeDashArray: 0,
                  borderColor: 'black',
                }, {
                  x:l,
                  // x2: r,
                  strokeDashArray: 0,
                  borderColor: '#0099FF',
                  label: {
                    borderColor: 'black',
                    style: {
                      fontSize: '10px',
                      color: 'black',
                      fontSize:'15px'
                    },
                    text: 'Left',
                  }
                }, {
                  x:r,
                  strokeDashArray: 0,
                  borderColor: '#0099FF',
                  label: {
                    borderColor: 'black',
                    style: {
                      fontSize: '10px',
                      color: 'black',
                      fontSize:'15px'
                    },
                    text: 'Right',
                  }
                }]
            },
            xaxis: {
              categories: labels
            }
 
          },
          
          series: [
            {
              name: "f(x)",
              data: data
            }
          ],

          optionsLine:{
            chart:{
              id:'chart2',
              type:'area',
              brush:{
                target:'chart1',
                enabled: true,
              },
              selection:{
                enabled: true,
                xaxis: {
                  min:5,
                  max:75
                }
              }
            },
            colors:['black'],
            fill:{
              type:'gradient',
              gradient:{
                opacityFrom:0.9,
                opacityTO:0.1
              }
            },
            yaxis: {
              tickAmount:2
            }
            ,
            xaxis: {
              categories: labels
            }
          }
          
        }

    }  
    return (
      <div>
        {fx.length > 0 && (
          <div   className="chart2"> 
            <Chart
              
              options={Data.options}
              series={Data.series}
              type="line"
              height={650}
            />
            <Chart
              // className="chart"
              options={Data.optionsLine}
              series={Data.series}
              type ="area"
              height={200}
            />
          </div>
        )}
      </div>
    );
  };
  export default Chartcomponent2;
  
  
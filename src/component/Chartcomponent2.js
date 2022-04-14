
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
  
  const Chartcomponent2 = ({fx }) => {
    const Fx = parse(fx)
    let datas =[]
    let c = 0;
    let pos =0;
    let l = [];
    // const [Data,setData] = useState([])
    let data =[]
    let labels = []
    let Data = []
    console.log(fx)
    // console.log(fx.length)
    let count =0;
    if(fx.length>0){
        for(let i =-10; i<11;i++){
            
            
                labels.push(i)
                data.push(Fx.evaluate({x:i}))
                console.log("labels : ",labels[count]," f(x) = ",Fx.evaluate({x:i}))
            
            
            count++;
            
        }
      
        // console.log(labels)
        // console.log(data)
        Data = {
          options: {
            chart: {
              id: "basic-bar",
              toolbar:{
                show:true,
                tools:{
                  zoom:true,
                  zoomin:true,
                  zoomout:true,
                  pan:true
                }
               
              }
            },
            annotations:{
                yaxis:[{
                  y:0,
                  borderColor:'black',
                  style:{
                    color:"#fff",
                    background:'#00E396',
                  }
                }],
                xaxis:[{
                  x:0,
                  borderColor:'black',
                  style:{
                    color:"#fff",
                    background:'#00E396',
                  }
                }],
                

            },
            xaxis: {
              categories: labels
            }
          },
          
          series: [
            {
              name: "x",
              data: data
            }
          ],
          
        }

    }  
    return (
    
      <div >
        
        {fx.length>0&&
        <Chart 
        options={Data.options}
        series={Data.series}
        type="line"
      />}
        
      </div>
    )
  };
  export default Chartcomponent2;
  
  
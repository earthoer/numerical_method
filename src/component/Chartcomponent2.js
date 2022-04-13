
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
    let eps = 0.1;
    let data ={}
    if(fx.length>0){
        for(let i =-10; i<20;i+=0.01){
            console.log("i : ",i," : ",abs(Fx.evaluate({x:i})))
            if(abs(Fx.evaluate({x:i}))<eps){
                eps = abs(Fx.evaluate({x:i}));
                pos = i;
            }
            if(eps<0.000001){
                console.log(eps)
                break;
            }
            // c++;
            // l.push(c)
            // datas.push(Fx.evaluate({x:i}))
            
        }
        console.log("c ",c)
        data = {
            labels: l,
            datasets: [
              {
                label: "name",
                data: datas,
                fill: false,
                backgroundColor: "rgba(75,192,192,0.2)",
                borderColor: "black",
              },
            ],
          };
    }
    else{
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
    return (
    
      <div >
        
        {/* <Line 
          data={data}
        //   option={options}
          height={900}
          width={1300}
        /> */}
       
        
      </div>
    );
  };
  export default Chartcomponent2;
  
  
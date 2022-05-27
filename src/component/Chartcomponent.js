
import {
  Chart as ChartJs,
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
  Line,Chart

} from "react-chartjs-2";
// import Chart from "react-apexcharts"
// import Hammer from "react-hammerjs"
import Hammer  from 'hammerjs'
import * as zoom from "chartjs-plugin-zoom";
// import 'chartjs-plugin-zoom';
import { ContextExclusionPlugin } from "webpack";
import './Chartcomponent.css'
let delayed;
//   import Chart from './Ch'
ChartJs.register(
  zoom,
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
  Title,
  Tooltip,
  Legend,
  Filler
);

const Chartcomponent = ({ dataerror, dataans }) => {
  let labels = [];
  let x1 = [];
  let x2 = [];
  let Data = []
  try{
    
   
  
    if(typeof dataans[0]==="object"){
      
      dataans =dataans.map((item)=>item.map((i)=>Number(i)))
      labels = Object.keys(dataans[0]).map((e) => String(Number(e)+1));
    }
    else{
      dataans =dataans.map((item)=>Number(item))
      labels = Object.keys(dataans).map((e) => String(Number(e)+1));
  
    }
    Data={
      options: {
        chart: {
          id: "basic-bar"
        },
        xaxis: {
          categories: labels
        }
      },
      series: [
        {
          name: "x",
          data: dataans
        }
      ],
      
    };
  }catch(e){
    
  }


  let data = {};
  let data2= {}
  let pointhoverrad = 10;
  if (dataans.length > 1) {
    let dataset = [];
    if (typeof dataans[0] === "object") {
      for (let i = 0; i < dataans.length; i++) {
        let x1 = Object.keys(dataans[i]).map((e) => Number(dataans[i][e]));
        dataset.push({
          label: "X " + (i+1),
          data: x1,
          fill: false,
          backgroundColor:'lightgreen',
          cubicInterpolationMode: "monotone",
          borderColor: "green",
          tension: 0.45,
          pointRadius: 4,
          pointHoverBackgroundColor:'green',
          pointHoverRadius:pointhoverrad,
          pointBackgroundColor:"green",
        });
      }
    } else {
      let x1 = Object.keys(dataans).map((e) => Number(dataans[e]));
      // 
      dataset.push({
        label: "X",
        data: x1,
        fill: false,
        backgroundColor:"green",
        cubicInterpolationMode: "monotone",
        borderColor: "green",
        tension: 0.45,
        pointRadius: 4,
        pointHoverBackgroundColor:'green',
        pointHoverRadius:pointhoverrad,
        pointBackgroundColor:"green",
      });
    }
    data = {
      labels: labels,
      datasets: dataset,
    };
    let dataset1 = []
    if(typeof(dataerror[0])==="object"){
      
      for (let i = 0; i < dataerror.length; i++) {
        let x2 = Object.keys(dataerror[i]).map((e) => Number(dataerror[i][e]));
        dataset1.push({
          label: "Error " + (i+1),
          data: x2,
          fill: false,
          // backgroundColor:"lightred",
          cubicInterpolationMode: "monotone",
          borderColor: "red",
          tension: 0.45,
          pointRadius: 4,
          pointHoverBackgroundColor:'red',
          pointHoverRadius:pointhoverrad,
          pointBackgroundColor:"red",
          
        });
      }
    }
    else{
      let x2 = Object.keys(dataerror).map((e) => Number(dataerror[e]));

        dataset1.push({
          label: "Error",
          data: x2,
          fill: false,
          backgroundColor:"red",
          cubicInterpolationMode: "monotone",
          borderColor: "red",
          tension: 0.45,
          pointRadius: 4,
          pointHoverBackgroundColor:'red',
          pointHoverRadius:pointhoverrad,
          pointBackgroundColor:"red",
        });
    }
    data2 = {
      labels: labels,
      datasets: dataset1,
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
    data2 = {
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
    }
  }

  const options = ({
  
    responsive:true,
    maintainAspectRatio:false,
    plugins:{
      zoom:{
        pan:{
          enabled:true,
          mode:'x'
        },
        zoom:{
          enabled:true,
          drag:true,
          mode:'xy',
          wheel:{
            enabled:true,
            // drag:true,
            // mode:'xy'
          }
        }
      },
      legend:{
        position:"top"
      },
      title:{
        display:true
      },
      tooltip:{
        enabled:true,
        position:'nearest',
      }
    },
    interaction: {
      intersect: false,
    },
  }) 

  return (
    <div>
      {/* <script src="https://cdnjs.cloudflare.com/ajax/libs/chartjs-plugin-zoom/1.2.1/chartjs-plugin-zoom.min.js" integrity="sha512-klQv6lz2YR+MecyFYMFRuU2eAl8IPRo6zHnsc9n142TJuJHS8CG0ix4Oq9na9ceeg1u5EkBfZsFcV3U7J51iew==" crossorigin="anonymous" referrerpolicy="no-referrer"></script> */}
      <Line
        id ="mychart"
        className="Lines"
        data={data}
        option={options}
        width={1100}
        height={650}
        plugins={[zoom]}
      />
      <Line
        className="Lines"
        data={data2}
        option={options}
        width={1100}
        height={650}
      />
      <script>
        {/* const ctx = document.getElementById('mychart').getContext('2d')
        const myChart = new ChartJs(ctx,{
          type:"line"
        }) */}
      </script>
    
    </div>
  );
};
export default Chartcomponent;


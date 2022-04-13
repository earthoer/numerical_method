
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

const Chartcomponent = ({ dataerror, dataans }) => {
  let labels = [];
  let x1 = [];
  let x2 = [];
  
  try{
    if(typeof dataans[0]==="object"){
      labels = Object.keys(dataans[0]).map((e) => String(Number(e)+1));
    }
    else{
      labels = Object.keys(dataans).map((e) => String(Number(e)+1));
  
    }
    
  }catch(e){
    console.log(e);
  }


  const d = [{ x1: dataans }, { x2: x2 }, { label: labels }];
  // console.log(d);
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
      // console.log(x1)
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
    plugins:{
      legend:{
        position:"top"
      },
      title:{
        display:true
      },
      tooltip:{
        // enabled:false,
        // titleFontSize:10,
        position:'nearest',
      }
    },
    interaction: {
      intersect: false,
    },
  }) 

  
  // console.log(data)
  return (
  
    <div >
      <span className="Lines">
      <Line 
        data={data}
        option={options}
        height={900}
        width={1300}
      />
      </span>
      <span className="Lines">
      <Line 
        data={data2}
        option={options}
        height={900}
        width={1300}
      />
      </span>
    </div>
  );
};
export default Chartcomponent;


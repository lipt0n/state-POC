import React, { Component } from "react";
import "./App.css";
import { get_steps, get_operators, run_step,change_config } from "./api";
const status_colors = {
  new:'white',
  up_to_date: "green",
  outdated: "gray",
  in_progress: "blue",
  error: "red"
};
const Step = ({ position, name, status, value, onClick }) => {
  const p = position * 300 + 50;
  return (
    <g>
      <rect
        x={p}
        y="20"
        rx="20"
        ry="20"
        width="150"
        height="150"
        style={{
          fill: status_colors[status],
          stroke: "black",
          strokeWidth: 5,
          opacity: 0.5
        }}
        onClick={onClick}
      />
      <svg width="150" height="50" x={p}>
        <text
          x="50%"
          y="10"
          fill="black"
          dominantBaseline="middle"
          textAnchor="middle"
        >
          {name}
        </text>
      </svg>
      <svg width="150" height="50" x={p} y="80">
        <text
          x="50%"
          y="10"
          fill="black"
          dominantBaseline="middle"
          textAnchor="middle"
        >
          status: {status}
        </text>
        {value &&  <text
          x="50%"
          y="40"
          fill="black"
          dominantBaseline="middle"
          textAnchor="middle"
        >
          value : {value}
        </text>}
      </svg>
    </g>
  );
};
const Arrow = ({ from, to }) => (
  <line
    x1={from * 300 + 210}
    y1="90"
    x2={to * 300}
    y2="90"
    stroke="#000"
    strokeWidth="5"
    markerEnd="url(#arrow)"
  />
);

class App extends Component {
  interval_handler = null
  state = {
    steps: undefined,
    step_id:undefined
  };
  async componentDidMount() {
    const operators_r = await get_operators();
    const operators = await operators_r.json();
    const steps_r = await get_steps(1, 1);
    const steps = await steps_r.json();
    this.setState({
      steps,
      operators
    });
    this.interval_handler =  setInterval(async ()=>{
      const steps_r = await get_steps(1, 1);
      const steps = await steps_r.json();
      if(JSON.stringify(steps) !== JSON.stringify(this.state.steps)) this.setState({steps})
    },1000)
  }
  componentWillUnmount(){
    if(this.interval_handler) clearInterval(this.interval_handler)
  }
  render() {
    if (!this.state.steps ) return <div>loading</div>;
    const { steps, operators,step_id } = this.state;
    return (
      <>
        <svg width={1240} height={400}>
          <defs>
            <marker
              id="arrow"
              markerWidth="10"
              markerHeight="10"
              refX="0"
              refY="3"
              orient="auto"
              markerUnits="strokeWidth"
            >
              <path d="M0,0 L0,6 L9,3 z" fill="#f00" />
            </marker>
          </defs>
          {steps.map(s => {
            let value
            if(s.outputs && s.outputs.length && typeof s.outputs[0].value!=='undefined') value = s.outputs[0].value
            return (
              <React.Fragment key={s.id}>
                <Step 
                  position={s.id}
                  status={s.status}
                  name={operators.filter(o => s.operator_id === o.id)[0].name}
                  value={`${value}`}
                  onClick={()=>this.setState({step_id:s.id})}
                />
                {s.inputs.map(i => (
                  <Arrow key={`${s.id}_${i.other_step_id}`} to={s.id} from={i.other_step_id} />
                ))}
              </React.Fragment>
            );
          })}
        </svg>
        <Config steps={steps} operators={operators} step_id={step_id} key={step_id}/>
      </>
    );
  }
}
class Config extends React.PureComponent {
  state={}
  render(){
    const {step_id,steps,operators} = this.props
    
    if(typeof step_id==='undefined') return null
    const step = steps.filter(s=>step_id===s.id)[0]
    return <div className='options'>
      <div>
      <div><b>ID:</b> <span>{step.id}</span></div>
      <div><b>OPERATOR ID:</b> <span>{step.operator_id}</span></div>
      <div><b>STATUS:</b> <span>{step.status}</span></div>
      <div><b>LAST EXECUTED AT:</b> <span>{step.last_executed_at}</span></div>
      <div><b>CONFIGURATION:</b> <span>{step.configuration.map(c=><form onSubmit={(e)=>e.preventDefault()}>
          <label>{Object.keys(c)[0]}:</label><input onChange={(e)=>this.setState({[Object.keys(c)[0]]:parseInt(e.target.value)})} defaultValue={Object.values(c)[0]}></input><button disabled={typeof this.state[Object.keys(c)[0]]!=='number'} onClick={()=>change_config(1,1,step.id,{configuration:[this.state,]})}>change to {this.state[Object.keys(c)[0]]}</button>
        </form>)}</span>
      </div>
      </div>
      <button style={{width:'100%'}} onClick={()=>run_step(1,1,step.id)}>RUN</button>

    </div>
  }
}
export default App;

import React, { Component } from "react";
import {connect} from 'react-redux'
import "./App.css";
import {Step} from './components/Step'
import {Arrow} from './components/Arrow'
import {ConnectedConfig as Config} from './components/Config'
import {getOperators,selectOperators} from './redux/ducks/operators'
import {getSteps, selectSteps} from './redux/ducks/steps'
class App extends Component {
  state = {
    step_id:undefined
  }
  componentDidMount() {
    this.props.getOperators()
    this.props.getSteps()
  }
  componentWillUnmount(){
  }
  render() {
    if (!this.props.steps ) return <div>loading</div>
    const { step_id } = this.state
    const {steps, operators} = this.props
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
        <Config step_id={step_id} key={step_id}/>
      </>
    );
  }
}
export {App}
const ConnectedApp = connect(state=>({
  steps:selectSteps(state),
  operators:selectOperators(state)
}),{
  getOperators,
  getSteps
})(App)
export default ConnectedApp


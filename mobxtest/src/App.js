import React, { Component } from "react";
import "./App.css";
import {Step} from './components/Step'
import {Arrow} from './components/Arrow'
import { Config} from './components/Config'

import {observer,inject} from 'mobx-react'
@inject("store")
@observer
class App extends Component {
  state = {
    step_id:undefined
  }
  componentDidMount(){
    this.props.store.stepsStore.fetchSteps()
    this.props.store.stepsStore.watchStart()
  }
  componentWillUnmount(){
    this.props.store.stepsStore.watchStop()
  }
  render() {
    console.log(this.props)
    const { step_id } = this.state
    const {operators} = this.props.store.operatorsStore
    const {steps,state} = this.props.store.stepsStore
    if (!steps || steps.length===0) return <div>{state}</div>
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
export default App



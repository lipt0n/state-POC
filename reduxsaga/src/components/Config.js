import React from "react"
import {connect} from 'react-redux'

import {selectOperators} from '../redux/ducks/operators'
import {runStep,selectSteps,changeStepConfig} from '../redux/ducks/steps'
const change_config=()=>null

export class Config extends React.PureComponent {
  state = {};
  render() {
    const { step_id, steps, runStep,changeStepConfig } = this.props
    if (typeof step_id === "undefined") return null
    const step = steps.filter(s => step_id === s.id)[0]
    return (
      <div className="options">
        <div>
          <div>
            <b>ID:</b> <span>{step.id}</span>
          </div>
          <div>
            <b>OPERATOR ID:</b> <span>{step.operator_id}</span>
          </div>
          <div>
            <b>STATUS:</b> <span>{step.status}</span>
          </div>
          <div>
            <b>LAST EXECUTED AT:</b> <span>{step.last_executed_at}</span>
          </div>
          <div>
            <b>CONFIGURATION:</b>{" "}
            <span>
              {step.configuration.map((c,i) => (
                <form key={i} onSubmit={e => e.preventDefault()}>
                  <label>{Object.keys(c)[0]}:</label>
                  <input
                    onChange={e =>
                      this.setState({
                        [Object.keys(c)[0]]: parseInt(e.target.value)
                      })
                    }
                    defaultValue={Object.values(c)[0]}
                  />
                  <button
                    disabled={typeof this.state[Object.keys(c)[0]] !== "number"}
                    onClick={() =>
                        changeStepConfig( step.id, {
                        configuration: [this.state]
                      })
                    }
                  >
                    change to {this.state[Object.keys(c)[0]]}
                  </button>
                </form>
              ))}
            </span>
          </div>
        </div>
        <button
          style={{ width: "100%" }}
          onClick={() => runStep(step.id)}
        >
          RUN
        </button>
      </div>
    );
  }
}
const ConnectedConfig = connect(state=>({
    steps:selectSteps(state),
    operators:selectOperators(state)
  }),{
    runStep,
    changeStepConfig
  })(Config)
export {ConnectedConfig}
  
  
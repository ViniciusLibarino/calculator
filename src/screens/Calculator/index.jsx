import React, { Component } from "react";
import { StatusBar } from "expo-status-bar";
import { Container, Calc } from "./style";
import Button from "../../components/Button";
import Display from "../../components/Display";

const initialState = {
  displayValue: "0",
  clearDisplay: false,
  operation: null,
  values: [0, 0],
  current: 0,
};

export default class Calculator extends Component {
  state = { ...initialState };

  constructor(props) {
    super(props);
    this.clearMemory = this.clearMemory.bind(this);
    this.setOperation = this.setOperation.bind(this);
    this.addDigit = this.addDigit.bind(this);
  }

  clearMemory() {
    this.setState({ ...initialState });
  }

  setOperation(operation) {
    if (this.state.current === 0) {
      this.setState({ operation, current: 1, clearDisplay: true });
    } else {
        const equals = operation === "=";
        const currentOperation = this.state.operation

        const values = [...this.state.values]
        try{
          values[0] = eval(`${values[0]} ${currentOperation} ${values[1]}`)
        } catch(e) {
          values[0] = this.state.values[0]
        }
        values[1] = 0

        this.setState({
          displayValue: values[0],
          operation: equals ? null : operation,
          current: equals ? 0 : 1, 
          clearDisplay: !equals,
          values
        })
    }
  }

  addDigit(n) {
    if (n === "." && this.state.displayValue.includes(".")) {
      return;
    }

    const clearDisplay =
      this.state.displayValue === "0" || this.state.clearDisplay;

    const currentValue = clearDisplay ? "" : this.state.displayValue;

    const displayValue = currentValue + n;

    this.setState({ displayValue, clearDisplay: false });

    if (n !== ".") {
      const i = this.state.current;
      const newValue = parseFloat(displayValue);
      const values = [...this.state.values];
      values[i] = newValue;
      this.setState({ values });
    }
  }

  render() {
    return (
      <Container>
        <StatusBar
          style="light"
          backgroundColor={"#060709"}
          translucent={true}
        />
        <Display value={this.state.displayValue} />
        <Calc>
          <Button label="AC" click={this.clearMemory} color={{color: "#4DD07C"}} style={{width: "70%", alignItems: 'center'}}/>
          <Button label="*" click={this.setOperation} color={{color: "#4DD07C"}}/>
          <Button label="7" click={this.addDigit} />
          <Button label="8" click={this.addDigit} />
          <Button label="9" click={this.addDigit} />
          <Button label="/" click={this.setOperation} color={{color: "#4DD07C"}}/>
          <Button label="4" click={this.addDigit} />
          <Button label="5" click={this.addDigit} />
          <Button label="6" click={this.addDigit} />
          <Button label="-" click={this.setOperation} color={{color: "#4DD07C"}}/>
          <Button label="1" click={this.addDigit} />
          <Button label="2" click={this.addDigit} />
          <Button label="3" click={this.addDigit} />
          <Button label="+" click={this.setOperation} color={{color: "#4DD07C"}}/>
          <Button label="0" click={this.addDigit} style={{ width: "45%", alignItems: 'center'}}/>
          <Button label="." click={this.addDigit} />
          <Button label="=" click={this.setOperation} color={{color: "#4DD07C"}}/>
        </Calc>
      </Container>
    );
  }
}
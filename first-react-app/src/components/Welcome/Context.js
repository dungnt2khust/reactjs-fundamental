import React from "react";
//Khởi tạo môt
const NumberContext = React.createContext();
 
class UpdateNumber extends React.Component {
  render() {
    return (
      <button onClick={() => {
        console.log(this.context.update())
      }}>Update Number</button>
    );
  }
}
UpdateNumber.contextType = NumberContext;
 
class ShowNumber extends React.Component {
  render() {
    return (
      <p>{this.context.number}</p>
    );
  }
}
ShowNumber.contextType = NumberContext;
 
 
export default class ContextComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      number: 0,
    };
  }
  updateNumber = () => {
    this.setState({
      number: Math.random(),
    });
  };
  render() {
    return (
      <NumberContext.Provider
        value={{
          number: this.state.number,
          update: this.updateNumber.bind(this),
        }}
      >
        <NumberContext.Consumer>
            { () =>  (
              <>
                <ShowNumber />
                <UpdateNumber />
              </>
            )}
        </NumberContext.Consumer>
      </NumberContext.Provider>
    );
  }
}
import React from "react";
import { mount, shallow, render } from "enzyme";
import { DropdownCore } from "../../../react-atlas-core/src/Dropdown/index";

function _findItem(n, text) {
  if (n.props().children) {
    if (n.props().children.props) {
      let str = n.props().children.props.value;
      return str == text;
    }
  }
  return false;
}

describe("Test Dropdown component - Mouse tests", () => {
  it("Test Dropdown component - Basic test", function() {
    const component = mount(
      <DropdownCore onChange={function() {}}>
        <span>May</span>
        <span value="the">the</span>
        <span value="force">force</span>
        <span value="be">be</span>
        <span value="with">with</span>
        <span value="you">you</span>
      </DropdownCore>
    );

    expect(component.props().value).toEqual('');
    expect(component.text()).toEqual('May');
  });

  it("Test Dropdown component - Basic test (disabled)", function() {
    const component = mount(
      <DropdownCore onChange={function() {}} disabled={true}>
        <span>May</span>
        <span value="the">the</span>
        <span value="force">force</span>
        <span value="be">be</span>
        <span value="with">with</span>
        <span value="you">you</span>
      </DropdownCore>
    );
  
    expect(component.props().value).toEqual('');
    expect(component.text()).toEqual('May');

    component.find("Dropdown").simulate("focus");
    expect(component.text()).toEqual('May');
    expect(component.state().active).toEqual(false);

    component.find("Dropdown").simulate("click");
    expect(component.text()).toEqual('May');
    expect(component.state().active).toEqual(false);
  });

  //	it("Test Dropdown component - Basic test with errorCallback", function(){
  //		const component =  mount(<DropdownCore onChange={ function(){} } errorCallback={ function(ev, val){return {valid: true, message: "Simple text"} } }>
  //									<span value="May">May</span>
  //									<span value="the">the</span>
  //									<span value="force">force</span>
  //									<span value="be">be</span>
  //									<span value="with">with</span>
  //									<span value="you">you</span>
  //								</DropdownCore>);
  //		expect(component.state().value).toEqual('May');
  //		expect(component.state().output).toEqual('May');
  //
  //		component.find('Dropdown').simulate('focus');
  //		expect(component.state().output).toEqual('May');
  //		expect(component.state().focus).toEqual(true);
  //
  //		component.findWhere(n => _findItem(n, 'you')).simulate('mouseDown');
  //	});
  
  it("Test Dropdown component - Select one item: onChange", function() {
    const _onChange = (inputValue) => {
      this.component.setProps({value: inputValue});
    };
    this.component = mount(
      <DropdownCore onChange={_onChange}>
        <span value="May">May</span>
        <span value="the">the</span>
        <span value="force">force</span>
        <span value="be">be</span>
        <span value="with">with</span>
        <span value="you">you</span>
      </DropdownCore>
    );
    this.component.find("Dropdown").simulate("focus");
    expect(this.component.text()).toEqual('May');
    expect(this.component.state().focus).toEqual(true);
    this.component.find("Button").simulate("click");
    expect(this.component.state().active).toEqual(true);
    
    this.component.findWhere(n => _findItem(n, "you")).simulate("mouseDown");
    expect(this.component.text()).toEqual('you');
  });
  
  it("Test Dropdown component - Select one item: onClick", function() {
    const _onClick = (inputValue) => {
      this.component.setProps({value: inputValue});
    };
    this.component = mount(
      <DropdownCore onClick={_onClick}>
        <span value="May">May</span>
        <span value="the">the</span>
        <span value="force">force</span>
        <span value="be">be</span>
        <span value="with">with</span>
        <span value="you">you</span>
      </DropdownCore>
    );
    this.component.find("Dropdown").simulate("focus");
    expect(this.component.text()).toEqual('May');
    expect(this.component.state().focus).toEqual(true);
    this.component.find("Button").simulate("click");
    expect(this.component.state().active).toEqual(true);
    
    this.component.findWhere(n => _findItem(n, "you")).simulate("mouseDown");
    expect(this.component.text()).toEqual('you');
  });
  
  it("Test Dropdown component - Select one item", function() {
    this.component = mount(
      <DropdownCore>
        <span value="May">May</span>
        <span value="the">the</span>
        <span value="force">force</span>
        <span value="be">be</span>
        <span value="with">with</span>
        <span value="you">you</span>
      </DropdownCore>
    );
    this.component.find("Button").simulate("click");
    this.component.findWhere(n => _findItem(n, "you")).simulate("mouseDown");
    
    expect(this.component.state().index).toEqual(5);
  });

  it("Test Dropdown component - Select one item (twice)", function() {
    const component = mount(
      <DropdownCore onChange={function() {}}>
        <span value="May">May</span>
        <span value="the">the</span>
        <span value="force">force</span>
        <span value="be">be</span>
        <span value="with">with</span>
        <span value="you">you</span>
      </DropdownCore>
    );

    component.find("Button").simulate("click");
    expect(component.state().active).toEqual(true);

    component.findWhere(n => _findItem(n, "you")).simulate("mouseDown");
    expect(component.state().index).toEqual(5);

    component.find("Button").simulate("click");
    component.findWhere(n => _findItem(n, "May")).simulate("mouseDown");
    expect(component.state().index).toEqual(0);
  });

  it("Test Dropdown component - Simple Click on Dropdown with onBeforeChange(false)", function() {
    const component = mount(
      <DropdownCore
        onChange={function() {}}
        onBeforeChange={function() {
          return false;
        }}
      >
        <span value="May">May</span>
        <span value="the">the</span>
        <span value="force">force</span>
        <span value="be">be</span>
        <span value="with">with</span>
        <span value="you">you</span>
      </DropdownCore>
    );
    component.find("Button").simulate("click");
    component.findWhere(n => _findItem(n, "you")).simulate("mouseDown");
    expect(component.state().index).toEqual(0);
  });

  it("Test Dropdown component - Simple Click on Dropdown with onBeforeChange(true)", function() {
    const component = mount(
      <DropdownCore
        onChange={function() {}}
        onBeforeChange={function() {
          return true;
        }}
      >
        <span value="May">May</span>
        <span value="the">the</span>
        <span value="force">force</span>
        <span value="be">be</span>
        <span value="with">with</span>
        <span value="you">you</span>
      </DropdownCore>
    );
    component.find("Button").simulate("click");
    component.findWhere(n => _findItem(n, "you")).simulate("mouseDown");
    expect(component.state().index).toEqual(5);
  });
});

describe("Test Dropdown component - Keyboard tests", () => {
  it("Test Dropdown component - Select one item (only ArrowDown used)", function() {
    const _onChange = (inputValue) => {
      this.component.setProps({value: inputValue});
    };
    this.component = mount(
      <DropdownCore onChange={_onChange}>
        <span value="May">May</span>
        <span value="the">the</span>
        <span value="force">force</span>
        <span value="be">be</span>
        <span value="with">with</span>
        <span value="you">you</span>
      </DropdownCore>
    );
    this.component.find("Dropdown").simulate("focus");
    this.component.find("Dropdown").simulate("keyDown", { key: "ArrowDown" });
    this.component.find("Dropdown").simulate("keyDown", { key: "ArrowDown" });
    this.component.find("Dropdown").simulate("keyDown", { key: "ArrowDown" });
    this.component.find("Dropdown").simulate("keyDown", { key: "Enter" });
    expect(this.component.state().index).toEqual(3);
  });

  it("Test Dropdown component - Select one item (ArrowDown & ArrowUp used)", function() {
    const _onChange = (inputValue) => {
      this.component.setProps({value: inputValue});
    };
    this.component = mount(
      <DropdownCore onChange={_onChange}>
        <span value="May">May</span>
        <span value="the">the</span>
        <span value="force">force</span>
        <span value="be">be</span>
        <span value="with">with</span>
        <span value="you">you</span>
      </DropdownCore>
    );
    this.component.find("Dropdown").simulate("focus");
    this.component.find("Dropdown").simulate("keyDown", { key: "ArrowDown" });
    this.component.find("Dropdown").simulate("keyDown", { key: "ArrowDown" });
    this.component.find("Dropdown").simulate("keyDown", { key: "ArrowDown" });
    this.component.find("Dropdown").simulate("keyDown", { key: "ArrowUp" });
    this.component.find("Dropdown").simulate("keyDown", { key: "Enter" });

    expect(this.component.props().value).toEqual("force");
    expect(this.component.text()).toEqual("force");
    expect(this.component.state().index).toEqual(2);
  });

  it("Test Dropdown component - Select last item (only ArrowDown used)", function() {
    const component = mount(
      <DropdownCore onChange={function() {}} onClick={function() {}}>
        <span value="May">May</span>
        <span value="the">the</span>
        <span value="force">force</span>
        <span value="be">be</span>
        <span value="with">with</span>
        <span value="you">you</span>
      </DropdownCore>
    );
    component.find("Dropdown").simulate("focus");
    expect(component.state().output).toEqual("May");
    expect(component.state().focus).toEqual(true);

    for (let i = 0; i < 9; i++) {
      component.find("Dropdown").simulate("keyDown", { key: "ArrowDown" });
    }
    component.find("Dropdown").simulate("keyDown", { key: "Enter" });

    expect(component.state().value).toEqual("you");
    expect(component.state().output).toEqual("you");
    expect(component.state().index).toEqual(5);
  });

  it("Test Dropdown component - Select first item (going down & up with ArrowDown & Arrow up)", function() {
    const component = mount(
      <DropdownCore onChange={function() {}} onClick={function() {}}>
        <span value="May">May</span>
        <span value="the">the</span>
        <span value="force">force</span>
        <span value="be">be</span>
        <span value="with">with</span>
        <span value="you">you</span>
      </DropdownCore>
    );
    component.find("Dropdown").simulate("focus");
    expect(component.state().output).toEqual("May");
    expect(component.state().focus).toEqual(true);

    for (let i = 0; i < 9; i++) {
      component.find("Dropdown").simulate("keyDown", { key: "ArrowDown" });
    }
    component.find("Dropdown").simulate("keyDown", { key: "Enter" });
    expect(component.state().value).toEqual("you");
    expect(component.state().output).toEqual("you");
    expect(component.state().index).toEqual(5);

    component.find("Dropdown").simulate("focus");
    expect(component.state().output).toEqual("you");
    expect(component.state().active).toEqual(true);

    for (let i = 0; i < 9; i++) {
      component.find("Dropdown").simulate("keyDown", { key: "ArrowUp" });
    }
    component.find("Dropdown").simulate("keyDown", { key: "Enter" });
    expect(component.state().value).toEqual("May");
    expect(component.state().output).toEqual("May");
    expect(component.state().index).toEqual(0);
  });

  it("Test Dropdown component - Press unhandled key", function() {
    const component = mount(
      <DropdownCore onChange={function() {}} onClick={function() {}}>
        <span value="May">May</span>
        <span value="the">the</span>
        <span value="force">force</span>
        <span value="be">be</span>
        <span value="with">with</span>
        <span value="you">you</span>
      </DropdownCore>
    );
    component.find("Dropdown").simulate("focus");
    expect(component.state().output).toEqual("May");
    expect(component.state().focus).toEqual(true);

    component.find("Dropdown").simulate("keyDown", { key: "Ctrl" });
  });
});

describe("Test Dropdown component - Window blur tests", () => {
  it("Test Dropdown component - onBlur event test", function() {
    const component = mount(
      <DropdownCore onChange={function() {}}>
        <span value="May">May</span>
        <span value="the">the</span>
        <span value="force">force</span>
        <span value="be">be</span>
        <span value="with">with</span>
        <span value="you">you</span>
      </DropdownCore>
    );

    expect(component.state().value).toEqual("May");
    expect(component.state().output).toEqual("May");
    component.find("Dropdown").simulate("focus");
    component.find("Dropdown").simulate("blur");
  });
});

describe("Test Dropdown component - Dropdown Regression tests", () => {
  it("Regression test for bug #249", function() {
    expect(function() {
      const component = mount(<DropdownCore />);
    }).toThrow(
      new Error("You must pass at least one child component to Dropdown")
    );
    // expect.assertions(0);
  });
});

describe("Test Dropdown component - Dropdown Regression tests", () => {
  it("Regression test for bug #405", function() {
    const component = mount(
      <DropdownCore isValid={false}>
        <span value="May">May</span>
        <span value="the">the</span>
        <span value="force">force</span>
        <span value="be">be</span>
        <span value="with">with</span>
        <span value="you">you</span>
      </DropdownCore>
    );
    expect(component.state().isValid).toEqual(false);
  });
});

import React, { cloneElement } from "react";
import PropTypes from "prop-types";
import cx from "classnames";

class RadioGroup extends React.PureComponent {
  constructor(props) {
    super(props);
    // Initial state
    this.state = {
      "checkedRadio": this.props.selectedValue
    };
  }

  componentWillMount() {
    React.Children.map(this.props.children, (child, index) => {
      if (
        child.props.defaultChecked ||
        !this.state.checkedRadio && index === 0
      ) {
        this.setState({ "checkedRadio": child.props.value });
      }
    });
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.selectedValue) {
      this.setState({ "checkedRadio": nextProps.selectedValue });
    }
  }

  groupSetChecked = value => {
    this.setState({ "checkedRadio": value });
  };

  render() {
    const {
      className,
      children,
      name,
      inline,
      inlineChildren,
      title,
      style
    } = this.props;

    const radioGroupStyles = cx({
      "radioGroup": !inline,
      "inline": inline
    });

    const radioButtons = React.Children.map(children, child => {
      child = cloneElement(child, {
        "inline": inlineChildren,
        "name": name,
        "groupSetChecked": this.groupSetChecked,
        "checked": this.state.checkedRadio === child.props.value
      });
      return child;
    });

    return (
      <div style={style} className={cx(className)} styleName={radioGroupStyles}>
        {title && 
          <div styleName={cx({ "header": !inline })}>
            <span styleName={"headerFont"}>{title}</span>
          </div>
        }
        {radioButtons}
      </div>
    );
  }
}

RadioGroup.propTypes = {
  /**
   * Child elements, typically Radio components.
   * @examples '<RadioGroup><Radio/><Radio/></RadioGroup>'
   */
  "children": PropTypes.node.isRequired,

  /** An object, array, or string of CSS classes to apply to RadioGroup.*/
  "className": PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.object,
    PropTypes.array
  ]),

  /**
   * When true, RadioGroup will display inline.
   * @examples '<RadioGroup inline></RadioGroup>'
   */
  "inline": PropTypes.bool,

  /**
   * When true, children will display inline.
   * @examples '<RadioGroup inlineChildren></RadioGroup>'
   */
  "inlineChildren": PropTypes.bool,

  /**
   * Form name for the element, this will set all Radio children the same form name (so they can't be selected at the same time).
   * @examples '<RadioGroup name="test"></RadioGroup>'
   */
  "name": PropTypes.string,

  /**
   * Pass inline styling here.
   */
  "style": PropTypes.object,

  /**
   * Will define the selected/checked Radio component in the RadioGroup.
   */
  "selectedValue": PropTypes.string,

  /**
   * Defines the element title.
   * @examples '<RadioGroup title="Test"></RadioGroup>'
   */
  "title": PropTypes.string
};

RadioGroup.defaultProps = {
  "selectedValue": null
};

export default RadioGroup;

// react
import React, { Component } from 'react';


// ============================================================================ //
// Editable inline
// ============================================================================ //
// Component matched against React Inline Edit https://github.com/kaivi/ReactInlineEdit

class EditableLine extends Component{
  constructor(props){
    super(props)
    this.activeInput = React.createRef();
    this.state = {
      editable  : false,
      value     : ''
    };
  };

  componentWillReceiveProps(nextProps){
    if(this.props.value !== nextProps.value){
       return this.setState({ value: nextProps.value })
    }
  };

  componentDidUpdate(prevProps, prevState){
    if(this.state.editable && !prevState.editable){
       this.activeInput.current.focus()
       this.activeInput.current.setSelectionRange(0, this.activeInput.current.value.length)
       return
    }
  };

  // utilities
  cancelEditing = () => this.setState({ editable: !this.state.editable, value: this.props.value });
  passesValidation = (value) => this.props.minlen <= value.length && value.length <= this.props.maxlen;
  submitEditing = () => {
    this.props.submitFn(this.state.value)
    this.setState({ editable: !this.state.editable })
  };

  // event handlers
  handleTyping = (event) => this.setState({ value: event.target.value });

  handleKeyDown = (event) => {
    if(event.keyCode === 13){
      return this.stopEditing()
    }
    if(event.keyCode === 27){
      return this.cancelEditing()
    }
  };

  startEditing = (event) => {
    event.stopPropagation()
    this.setState({ editable: !this.state.editable, value: this.props.value })
  };

  stopEditing = (event) => {
    if(this.props.value !== this.state.value && this.passesValidation(this.state.value.trim())){
       return this.submitEditing()
    }
    this.cancelEditing()
  };


  render(){
    if(!this.state.editable){
      return (
        <span className={ this.props.altclassName }
              onClick={ this.startEditing }>
          { this.state.value || this.props.value }
        </span>
      )
    } else {
      return (
        <input type='text'
               tabIndex= '0'
               className={ this.props.className }
               ref={ this.activeInput }
               value={ this.state.value }
               onBlur={ this.stopEditing }
               onChange={ this.handleTyping }
               onKeyDown={ this.handleKeyDown } />
      )
    }
  };
// component end
};

EditableLine.defaultProps = {
  minlen    : 1,
  maxlen    : 256
};

export { EditableLine };

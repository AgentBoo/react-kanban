// react
import React, { Component } from 'react';
// components
import { Button, Glyphicon } from 'react-bootstrap';


// ============================================================================ //
// Card component
// ============================================================================ //
class Card extends Component {
  // pass down
  removeCard = () => this.props.removeCard({
    luid  : this.props.luid,
    id    : this.props.id
  });

  render(){
    const { text, isDragging, connectDragSource, connectDropTarget } = this.props;
    const draggingStyle = isDragging ? 'panel panel-default is-dragging' : 'panel panel-default'

    return connectDragSource(
      connectDropTarget(
        <div className={ draggingStyle }>
          <p> { text } </p>
          <div className='panel-footer'>
            <Button onClick={ this.removeCard }>
              <Glyphicon glyph='remove' />
            </Button>
          </div>
        </div>
      )
    )
  }
// component end
};

export default Card;

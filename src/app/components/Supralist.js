// react
// redux
import { connect } from 'react-redux';
import { reorder } from './../actions/actions';
// components
import List from './List';


// ============================================================================ //
// Redux stuff
// ============================================================================ //
const mapStateToProps = function(state){
  return { lists: state.lists }
};


// Supralist is a List's container component
// connect(mapStateToProps, mapDispatchToProps)(Component);
const Supralist = connect(mapStateToProps, { reorder })(List);

export default Supralist;

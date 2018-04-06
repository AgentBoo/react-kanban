// react
// redux
import { connect } from 'react-redux';
import { shiftList, transitCard } from './../actions';
// components
import List from './List';


// ============================================================================ //
// Redux stuff
// ============================================================================ //

// Supralist is the List's container component
// connect(mapStateToProps, mapDispatchToProps)(Component);
const Supralist = connect(null, { shiftList, transitCard })(List);

export default Supralist;

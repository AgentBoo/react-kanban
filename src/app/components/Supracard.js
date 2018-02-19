// react
// redux
import { connect } from 'react-redux';
import { shiftCard, transitCard } from './../actions';
// components
import Card from './Card';


// ============================================================================ //
// Redux stuff
// ============================================================================ //

// Supracard is the Card's container component
// connect(mapStateToProps, mapDispatchToProps)(Component);
const Supracard = connect(null, { shiftCard, transitCard })(Card);

export default Supracard;

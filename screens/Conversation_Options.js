import React from "react";
import { connect } from "react-redux";

class Conversation_Options extends React.Component {}

const mapStateToProps = state => ({ channels: state.channels });

export default connect(mapStateToProps)(Conversation_Options);

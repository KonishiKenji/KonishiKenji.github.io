import { connect } from "react-redux";
import { AppState } from "@stores/type";
import Loading from "@components/atoms/Loading";

interface StateProps {
  isShown: boolean;
}

const mapStateToProps = (state: AppState): StateProps => ({
  isShown: state.loading
});

export default connect(mapStateToProps)(Loading);

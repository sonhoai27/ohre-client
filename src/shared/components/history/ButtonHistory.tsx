import * as React from "react";
import ModalHistory from "./ModalHistory";
import { reGetHistoryProduct } from "../../../reducers/init";
import { connect } from "react-redux";
declare var $:any;

interface Props {
    reGetHistoryProduct: Function
}
class ButtonHistory extends React.Component<Props, {}> {
    constructor(props){
        super(props)
    }
    showMyHistory = () => {
        $("#my-history").modal('show')
        this.props.reGetHistoryProduct()
    }
    render(){
        return (
            <>
            <div className="btn-history" onClick={() => this.showMyHistory()}>
                    <i className="la la-history"></i>
            </div>
            <ModalHistory isReLoading={true}/>
            </>
        )
    }
}
const mapStateToProps = (storeState, ownProps) => ({
});
const mapDispatchToProps = {
    reGetHistoryProduct
}
export default connect(mapStateToProps, mapDispatchToProps)(ButtonHistory);
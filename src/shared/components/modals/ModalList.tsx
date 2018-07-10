import * as React from 'react';
interface Props {
    size?:String,
    list?: any
}
class ModalList extends React.Component<Props, {}>{
    constructor(props){
        super(props)
    }
    render(){
        const list = this.props.list
            .map((item, index)=> {
                return (
                    <div key={index} className="col-sm-2 col-6 item">
                        <a href="">
                            {item.category_name}
                        </a>
                    </div>
                )
            })
        return (
            <div className="custom-modal modal text-left" id="all-list-category" tabIndex={-1} role="dialog" aria-labelledby="myModalLabel1">
                <div className={"modal-dialog " + (this.props.size ? this.props.size : '')} role="document">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h4 className="modal-title" id="myModalLabel1">List Categories</h4>
                            <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                <svg viewBox="0 0 8 8" fill="currentColor" width="8" height="8">
                                    <path d="M7.2 0L4 3.2.8 0 .1.7 3.3 4 0 7.3l.7.7L4 4.7 7.3 8l.7-.7L4.7 4 7.9.7z"></path>
                                </svg>
                            </button>
                        </div>
                        <div className="modal-body">
                            <div className="row" style={{padding: '0rem 1rem'}}>
                                {list}
                            </div>
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn grey btn-outline-secondary" data-dismiss="modal">Cancel</button>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default ModalList
import * as React from "react";

class AboutUs extends React.Component {
    render() {
        return (
            <div className="about-us">
                <div className="custom-modal modal text-left" id="about-us" tabIndex={-1} role="dialog" aria-labelledby="myModalLabel1">
                    <div className={"modal-dialog modal-sm"} role="document">
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
                                <div className="row" style={{ padding: '0rem 1rem' }}>
                                </div>
                            </div>
                            <div className="modal-footer">
                                <button type="button" className="btn grey btn-outline-secondary" data-dismiss="modal">Cancel</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default AboutUs
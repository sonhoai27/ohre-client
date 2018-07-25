import * as React from 'react';
class Ads extends React.Component{
    render(){
        return(
            <div className="content-wrapper main-quangcao" style={{background: 'white'}}>
                <div className="container">
                    <div className="row">
                        <div className="col-sm-2"></div>
                        <div className="col-sm-4 title-form-contact">
                            <i className="la la-line-chart icon-chart"></i>
                            <div className="title">
                                Liên hệ<br/>quảng cáo
                            </div>
                        </div>
                        <div className="col-sm-4" style={{display: 'flex', alignItems: 'center'}}>
                            <div className="form-contact" style={{width: '100%'}}>
                                <input type="text" className="form-control" placeholder="Email của bạn" name="contact-email"/>
                                <i className="la la-inbox"></i>
                            </div>
                        </div>
                        <div className="col-sm-2"></div>
                    </div>
                </div>
            </div>
        )
    }
}
export default Ads

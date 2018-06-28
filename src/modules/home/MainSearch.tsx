import * as React from 'react';

export default class MainSearch extends React.Component{
    render(){
        return (
            <div className="app-content content main-search">
                <div className="content-wrapper">
                    <div className="content-body">
                        <div className="row">
                            <div className="col-sm-3"></div>
                            <div className="col-sm-6">
                                <div className="content-search">
                                    <input type="text" name="input-main-search"
                                           placeholder="What are you looking for?"
                                           className="form-control" style={
                                               {
                                                   padding: 15,
                                                   borderRadius: '4px 0px 0px 4px'
                                               }
                                           }/>
                                    <i className="la la-search btn btn-info" style={
                                        {
                                            borderRadius: '0px 4px 4px 0px'
                                        }
                                    }></i>
                                </div>
                            </div>
                            <div className="col-sm-3"></div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}
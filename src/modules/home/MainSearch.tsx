import * as React from 'react';

export default class MainSearch extends React.Component {
    render() {
        return (
            <div className="content-wrapper main-search" style={{padding: 0}}>
                <div className="row">
                    <div className="col-sm-3"></div>
                    <div className="col-sm-6">
                        <div className="content-search">
                            <input type="text" name="input-main-search"
                                   placeholder="What are you looking for?"
                                   className="form-control" style={
                                {
                                    padding: 15,
                                    borderRadius: '4px 0px 0px 4px',
                                    border: 'unset'
                                }
                            }/>
                            <i className="la la-search" style={
                                {
                                    borderRadius: '0px 4px 4px 0px',
                                    paddingRight: '16px'
                                }
                            }></i>
                        </div>
                    </div>
                    <div className="col-sm-3"></div>
                </div>
            </div>
        )
    }
}
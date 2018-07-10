import * as React from 'react';
import {connect} from 'react-redux';

interface Props {

}
class SideLeftMenu extends React.Component<Props, {}>{
    render(){
        return(
            <div className="card">
                <div className="card-header">
                    <h3 className="card-title custom">Danh mục</h3>
                </div>
                <div className="card-content">
                    <div id="side-left-category" className="media-list position-relative ps-container ps-theme-default">
                        <ul className="list-group">
                            <h5 className="title-list">Danh mục</h5>
                            <li className="list-group-item">
                                {/*<input id='two1' type='checkbox' className="checkbox"/>*/}
                                {/*<label htmlFor='two1'>*/}
                                    {/*<span></span>*/}
                                    {/*<h6 className="text-bold-500" style={{margin: 0}}>Cras justo odio</h6>*/}
                                {/*</label>*/}
                                <h6 className="text-bold-500" style={{margin: 0}}>Cras justo odio</h6>
                            </li>
                            <li className="list-group-item">
                                <h6 className="text-bold-500" style={{margin: 0}}>Cras justo odio</h6>
                            </li>
                            <li className="list-group-item">
                                <h6 className="text-bold-500" style={{margin: 0}}>Cras justo odio</h6>
                            </li>
                            <li className="list-group-item">
                                <h6 className="text-bold-500" style={{margin: 0}}>Cras justo odio</h6>
                            </li>
                        </ul>
                        <ul className="list-group">
                            <h5 className="title-list">Danh mục</h5>
                            <li className="list-group-item">
                                {/*<input id='two1' type='checkbox' className="checkbox"/>*/}
                                {/*<label htmlFor='two1'>*/}
                                {/*<span></span>*/}
                                {/*<h6 className="text-bold-500" style={{margin: 0}}>Cras justo odio</h6>*/}
                                {/*</label>*/}
                                <h6 className="text-bold-500" style={{margin: 0}}>Cras justo odio</h6>
                            </li>
                            <li className="list-group-item">
                                <h6 className="text-bold-500" style={{margin: 0}}>Cras justo odio</h6>
                            </li>
                            <li className="list-group-item">
                                <h6 className="text-bold-500" style={{margin: 0}}>Cras justo odio</h6>
                            </li>
                            <li className="list-group-item">
                                <h6 className="text-bold-500" style={{margin: 0}}>Cras justo odio</h6>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        )
    }
}

const mapStateToProps = storeState => ({

});
const mapDispatchToProps = {

}
export default connect(mapStateToProps, mapDispatchToProps)(SideLeftMenu);

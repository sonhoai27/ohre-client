import * as React from 'react';

class HomeCategory extends React.Component{
    render(){
        return (
            <div className="app-content content">
                <div className="content-wrapper">
                    <div className="content-body container">
                        <div className="row">
                           <div className="col-sm-1"></div>
                           <div className="col-sm-10">
                               <div className="home-category">
                                   <div className="card">
                                       <div className="card-content">
                                           <div className="card-body">
                                               <i className="icon-screen-smartphone"></i>
                                               <h4 className="card-title info">Phones</h4>
                                               <p>Samsung, Apple</p>
                                           </div>
                                       </div>
                                   </div>
                                   <div className="card">
                                       <div className="card-content">
                                           <div className="card-body">
                                               <i className="icon-screen-tablet"></i>
                                               <h4 className="card-title info">Tablet</h4>
                                               <p>Samsung, Apple</p>
                                           </div>
                                       </div>
                                   </div>
                                   <div className="card">
                                       <div className="card-content">
                                           <div className="card-body">
                                               <i className="la la-magic"></i>
                                               <h4 className="card-title info">Make Up</h4>
                                               <p>Mac, Shu Reemura</p>
                                           </div>
                                       </div>
                                   </div>
                                   <div className="card">
                                       <div className="card-content">
                                           <div className="card-body">
                                               <i className="la la-stethoscope"></i>
                                               <h4 className="card-title info">Health</h4>
                                               <p>Nokia, Withings</p>
                                           </div>
                                       </div>
                                   </div>
                                   <div className="card">
                                       <div className="card-content">
                                           <div className="card-body">
                                               <i className="la la-black-tie"></i>
                                               <h4 className="card-title info">Clothes</h4>
                                               <p>Cucci, Channel</p>
                                           </div>
                                       </div>
                                   </div>
                                   <div className="card">
                                       <div className="card-content">
                                           <div className="card-body">
                                               <i className="icon-arrow-right"></i>
                                               <h4 className="card-title info">More</h4>
                                               <p>Foods, TV</p>
                                           </div>
                                       </div>
                                   </div>
                               </div>
                           </div>
                           <div className="col-sm-1"></div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default HomeCategory
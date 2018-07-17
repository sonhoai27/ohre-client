import * as React from 'react';
import * as ReactDOM from 'react-dom';

interface Props {
    src: string,
    width: number,
    height: number,
    alt?: string,
    backgroundColor?: string,
    style?: Object
}

interface State {
    width: number,
    height: number
}

class Image extends React.Component<Props, State> {
    constructor(props: Props) {
        super(props);
        this.state = {
            width: 0,
            height: 0
        };
    }
    resizeImage = () => {
        const target = ReactDOM.findDOMNode(this.refs.image);
        if (target === null) {
            return;
        }
        const originalWidth = target instanceof HTMLImageElement ? target.naturalWidth : 0;
        const originalHeight = target instanceof HTMLImageElement ? target.naturalHeight : 0;
        const widthRatio = this.props.width / originalWidth;
        const heightRatio = this.props.height / originalHeight;
        if (widthRatio < heightRatio) {
            this.setState({
                width: originalWidth * widthRatio,
                height: originalHeight * widthRatio
            });
        } else {
            this.setState({
                width: originalWidth * heightRatio,
                height: originalHeight * heightRatio
            });
        }
    }
    render() {
        const style:any = {
            wrapper: {
                margin: 'auto',
                position: 'relative',
                width: this.props.width,
                height: this.props.height,
                backgroundColor: this.props.backgroundColor
            },
            image: {
                position: 'absolute',
                display: 'block',
                left: (this.props.width - this.state.width) / 2,
                top: (this.props.height - this.state.height) / 2,
                width: this.state.width,
                height: this.state.height
            }
        };
        return (
            <div style={style.wrapper}>
                <img
                    ref="image" src={this.props.src} alt={this.props.alt} style={style.image}
                    onLoad={this.resizeImage}
                />
            </div>
        )
    }
}
export default Image
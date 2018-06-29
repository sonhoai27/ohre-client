import * as React from 'react';
declare var $: any;

class BackToTop extends React.Component {
    componentDidMount() {
        $(window).scroll(function () {
            const scroll = $(window).scrollTop();
            if (scroll >= 100) {
                $('.back-to-top').show()
            } else {
                $('.back-to-top').hide();
            }
        });
    }
    backToTop = () => {
        const body = $('html, body')
        body.stop().animate({scrollTop: 0}, 500, 'swing')
    }

    render() {
        return (
            <>
                <i className="back-to-top la la-arrow-circle-up" onClick={this.backToTop}>
                </i>
            </>
        )
    }
}

export default BackToTop
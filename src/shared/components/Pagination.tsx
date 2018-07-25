import * as React from 'react';
interface Props {
    totalItems: any,
    onChangePage: Function,
    initialPage?: number,
    pageSize?: number
}
interface State {
    pager: any,
    isOne: boolean
}
class Pagination extends React.Component<Props, State> {
    static defaultProps = {
        initialPage: 1,
        pageSize: 10
    }
    constructor(props) {
        super(props)
        this.state = {
            pager: {},
            isOne: false
        }
    }
    componentWillMount() {
        // set page if items array isn't empty
        if (this.props.totalItems) {
            this.setPage(this.props.initialPage);
        }
    }
    componentDidUpdate(prevProps, prevState) {
        // reset page if items array has changed
        if (this.props.totalItems !== prevProps.totalItems) {
            this.setPage(this.props.initialPage);
        }
    }
    setPage(page) {
        let { totalItems, pageSize } = this.props;
        let pager = this.state.pager;

        if (page < 1 || page > pager.totalPages) {
            return;
        }

        // get new pager object for specified page
        pager = this.getPager(totalItems, page, pageSize);

        // update state
        this.setState({ pager });

        // // call change page function in parent component
        if(this.state.isOne === true && page == 1){
            this.props.onChangePage(pager);
        } else if(page > 1){
            this.props.onChangePage(pager);
            this.setState({
                isOne: true
            })
        }
    }
    getPager(totalItems, currentPage, pageSize) {
        // default to first page
        currentPage = currentPage || 1;

        // default page size is 10
        pageSize = pageSize || 10;

        // calculate total pages
        let totalPages = Math.ceil(totalItems / pageSize);

        let startPage, endPage;
        if (totalPages <= 10) {
            // less than 10 total pages so show all
            startPage = 1;
            endPage = totalPages;
        } else {
            // more than 10 total pages so calculate start and end pages
            if (currentPage <= 6) {
                startPage = 1;
                endPage = 10;
            } else if (currentPage + 4 >= totalPages) {
                startPage = totalPages - 9;
                endPage = totalPages;
            } else {
                startPage = currentPage - 5;
                endPage = currentPage + 4;
            }
        }

        // calculate start and end item indexes
        let startIndex = (currentPage - 1) * pageSize;
        let endIndex = Math.min(startIndex + pageSize - 1, totalItems - 1);

        // create an array of pages to ng-repeat in the pager control
        let pages = [...Array((endPage + 1) - startPage).keys()].map(i => startPage + i);

        // return object with all pager properties required by the view
        return {
            totalItems,
            currentPage,
            pageSize,
            totalPages,
            startPage,
            endPage,
            startIndex,
            endIndex,
            pages
        };
    }
    render() {
        let pager = this.state.pager;

        if (!pager.pages || pager.pages.length <= 1) {
            // don't display pager if there is only 1 page
            return null;
        }
        return (
            <nav aria-label="Page navigation">
                <ul className="pagination justify-content-center pagination-separate pagination-curved pagination-flat mb-1">
                    <li className={pager.currentPage === 1 ? 'page-item' : 'page-item'}>
                        <a className="page-link" onClick={() => this.setPage(1)}>Trang đầu</a>
                    </li>
                    <li className={pager.currentPage === 1 ? 'page-item' : 'page-item'}>
                        <a className="page-link" onClick={() => this.setPage(pager.currentPage - 1)}>Lùi</a>
                    </li>
                    {pager.pages.map((page, index) =>
                        <li key={index} className={pager.currentPage === page ? 'page-item active' : 'page-item'}>
                            <a className="page-link" onClick={() => this.setPage(page)}>{page}</a>
                        </li>
                    )}
                    <li className={pager.currentPage === pager.totalPages ? 'page-item' : 'page-item'}>
                        <a className="page-link" onClick={() => this.setPage(pager.currentPage + 1)}>Tiến</a>
                    </li>
                    <li className={pager.currentPage === pager.totalPages ? 'page-item' : 'page-item'}>
                        <a className="page-link" onClick={() => this.setPage(pager.totalPages)}>Trang cuối</a>
                    </li>
                </ul>
            </nav>
        )
    }
}

export default Pagination
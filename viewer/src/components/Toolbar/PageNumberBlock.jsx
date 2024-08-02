import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import {
    TbCircleArrowLeft,
    TbCircleArrowRight,
} from "react-icons/tb";
import Actions from "../../actions/actions";
import PageNumberElement from "./PageNumber";
import { get } from "../../reducers";
import { TranslationContext } from "../Translation";

class PageNumberBlock extends React.Component {
    static propTypes = {
        pageNumber: PropTypes.number,
        pagesQuantity: PropTypes.number,
    };

    static contextType = TranslationContext;

    setNewPageNumber(number, isNext = true) {
        if (number >= 1 && number <= this.props.pagesQuantity) {
            this.props.setNewPageNumber(number, true);
        } else {
            this.props.setNewPageNumber(
                isNext ? 1 : this.props.pagesQuantity,
                true
            );
        }
    }

    onInputChange = (e) => {
        this.setNewPageNumber(+e.target.value);
    };

    goToNextPage = () => {
        this.setNewPageNumber(this.props.pageNumber + 1, true);
    };

    goToPrevPage = () => {
        this.setNewPageNumber(this.props.pageNumber - 1, false);
    };

    render() {
        const t = this.context;

        return (
            <div
                className='page-number-block'
                title={t("Click on the number to enter it manually")}
                data-djvujs-id='page_number_block'
            >
                <TbCircleArrowLeft
                    onClick={this.goToPrevPage}
                    className='nav-button'
                />

                <PageNumberElement {...this.props} />

                <TbCircleArrowRight
                    onClick={this.goToNextPage}
                    className='nav-button'
                />
            </div>
        );
    }
}

export default connect(
    (state) => {
        return {
            pageNumber: get.currentPageNumber(state),
            pagesQuantity: get.pagesQuantity(state),
        };
    },
    {
        setNewPageNumber: Actions.setNewPageNumberAction,
    }
)(PageNumberBlock);

import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import Actions from "../../actions/actions";
import TreeItem from "./TreeItem";
import { TranslationContext } from "../Translation";
// import styled from 'styled-components';
import CloseButton from "../misc/CloseButton";
import { ActionTypes } from "../../constants";
// import { withAppContext } from "../AppContext";

// const Root = styled.div`
//     padding: 0.5em;
//     box-sizing: border-box;
//     height: 100%;
//     overflow: auto;
// `;

// const Header = styled.div`
//     font-size: 1.5em;
//     border-bottom: 1px solid var(--border-color);
//     margin-bottom: 0.5em;
//     padding-bottom: 0.2em;
//     display: flex;
//     justify-content: space-between;

//     span:first-child {
//         margin-right: 0.5em;
//         overflow: hidden;
//         text-overflow: ellipsis;
//     }
// `;

class ContentsPanel extends React.Component {
    static propTypes = {
        contents: PropTypes.array,
    };

    static contextType = TranslationContext;

    onTreeItemClick = (url) => {
        this.props.dispatch(
            // Actions.setPageByUrlAction(url, this.props.appContext.isMobile)
            Actions.setPageByUrlAction(url, this.context.isMobile)
        );
    };

    convertBookmarkArrayToTreeItemDataArray(bookmarkArray) {
        return (
            bookmarkArray &&
            bookmarkArray.map((bookmark) =>
                this.makeTreeItemDataByBookmark(bookmark)
            )
        );
    }

    makeTreeItemDataByBookmark(bookmark) {
        return {
            name: bookmark.description,
            children: this.convertBookmarkArrayToTreeItemDataArray(
                bookmark.children
            ),
            callback: this.onTreeItemClick,
            callbackData: bookmark.url,
        };
    }

    render() {
        const { contents, dispatch } = this.props;
        const t = this.context;

        const ContentsTree = () => {
            const Tree = contents.map((bookmark, i) => {
                return (
                    <TreeItem
                        key={i}
                        {...this.makeTreeItemDataByBookmark(
                            bookmark
                        )}
                    />
                );
            });

            return (
                <>
                    <div className='header'>
                        <span>{t("Contents")}</span>
                        <CloseButton
                            onClick={() =>
                                dispatch({
                                    type: ActionTypes.CLOSE_CONTENTS,
                                })
                            }
                        />
                    </div>
                    {Tree}
                </>
            );
        };

        return (
            <div className='panel-contents'>
                {contents ? ContentsTree() : null}

                {contents ? null : (
                    <div
                        className='no-content'
                        // css={`
                        //     font-style: italic;
                        // `}
                    >
                        {t("No contents provided")}
                    </div>
                )}
            </div>
        );
    }
}

export default connect()(ContentsPanel);
// export default connect()(withAppContext(ContentsPanel));

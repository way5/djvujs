import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { FaExpand, FaCompress } from "react-icons/fa";
import Actions from '../../actions/actions';
import { get } from '../../reducers';
// import { useTranslation } from '../Translation';

const FullPageViewButton = () => {
    const isFullPageView = useSelector(get.isFullPageView);
    const dispatch = useDispatch();
    // const t = useTranslation();

    const ButtonTag = isFullPageView ? FaCompress: FaExpand;

    return (
        <ButtonTag
            className='icon-button'
            onClick={() => dispatch(Actions.toggleFullPageViewAction(!isFullPageView))}
        />
    );
};

export default FullPageViewButton;
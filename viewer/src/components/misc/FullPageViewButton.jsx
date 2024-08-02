import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { TbPictureInPictureOff, TbPictureInPictureOn } from "react-icons/tb";
import Actions from '../../actions/actions';
import { get } from '../../reducers';
// import { useTranslation } from '../Translation';

const FullPageViewButton = () => {
    const isFullPageView = useSelector(get.isFullPageView);
    const dispatch = useDispatch();
    // const t = useTranslation();

    const ButtonTag = isFullPageView ? TbPictureInPictureOn: TbPictureInPictureOff;

    return (
        <ButtonTag
            className='icon-button'
            onClick={() => dispatch(Actions.toggleFullPageViewAction(!isFullPageView))}
        />
    );
};

export default FullPageViewButton;
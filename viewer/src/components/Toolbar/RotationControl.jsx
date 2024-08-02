import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { TbRotate2, TbRotateClockwise2 } from "react-icons/tb";
import Actions from "../../actions/actions";
import { get } from "../../reducers";
import { useTranslation } from "../Translation";

const RotationControl = () => {
    const dispatch = useDispatch();
    const rotation = useSelector(get.pageRotation);
    const t = useTranslation();

    const rotateLeft = () => {
        dispatch(Actions.setPageRotationAction(rotation ? rotation - 90 : 270));
    };

    const rotateRight = () => {
        dispatch(
            Actions.setPageRotationAction(rotation === 270 ? 0 : rotation + 90)
        );
    };

    return (
        <div
            className='rotation-control'
            data-djvujs-id='rotation_control'
            title={t("Rotate the page")}
        >
            <TbRotate2 onClick={rotateLeft} />
            <div>{rotation}&deg;</div>
            <TbRotateClockwise2 onClick={rotateRight} />
        </div>
    );
};

export default RotationControl;

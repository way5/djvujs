import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { FaUndo, FaRedo } from "react-icons/fa";
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
            <FaUndo onClick={rotateLeft} />
            <div>{rotation}&deg;</div>
            <FaRedo onClick={rotateRight} />
        </div>
    );
};

export default RotationControl;

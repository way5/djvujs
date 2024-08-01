import { FaAngleDoubleDown } from "react-icons/fa";

export default ({ isToolbarHidden, onClick }) => {
    return (
        <FaAngleDoubleDown
            className={
                'hide-button' + (isToolbarHidden ? ' toolbar-hidden' : '')
            }
            onClick={onClick}
            data-djvujs-id='hide_button'
        />
    );
};

import { BsFillPinFill, BsPinAngle } from 'react-icons/bs';
import { useTranslation } from "../Translation";

export default ({ isPinned, onClick }) => {
    const t = useTranslation();

    const PinElement = (isPinned ? BsFillPinFill : BsPinAngle);

    return (
        <PinElement
            className='pin-button'
            onClick={onClick}
            data-djvujs-id="pin_button"
            title={t(isPinned ? 'Toolbar is always shown' : 'Toolbar automatically hides')}
        />
    );
};
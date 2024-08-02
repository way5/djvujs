import { TbPinnedFilled, TbPin } from 'react-icons/tb';
import { useTranslation } from "../Translation";

export default ({ isPinned, onClick }) => {
    const t = useTranslation();

    const PinElement = (isPinned ? TbPinnedFilled : TbPin);

    return (
        <PinElement
            className='pin-button'
            onClick={onClick}
            data-djvujs-id="pin_button"
            title={t(isPinned ? 'Toolbar is always shown' : 'Toolbar automatically hides')}
        />
    );
};
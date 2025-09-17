import Icon from '../Icon/Icon';
import { IconName } from '../Icon/Icon-data';

interface Props {
  icon: IconName;
  onClick?: () => void;
  iconSize?: number;
  disabled?: boolean;
}

function IconButton({ icon, onClick, iconSize, disabled }: Props) {
  return (
    <button
      disabled={disabled}
      onClick={onClick}
      className={`p-2 border border-black rounded-full ${disabled ? 'bg-gray-200' : 'bg-white hover:bg-gray-100'}`}
    >
      <Icon name={icon} size={iconSize} />
    </button>
  );
}

export default IconButton;

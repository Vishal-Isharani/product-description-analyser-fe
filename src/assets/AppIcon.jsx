import PropTypes from 'prop-types';

const AppIcon = ({ size = 512, color = '#0ea5e9' }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 512 512"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <rect width="512" height="512" rx="128" fill={color} />
    <path
      d="M144 144C144 135.163 151.163 128 160 128H352C360.837 128 368 135.163 368 144V368C368 376.837 360.837 384 352 384H160C151.163 384 144 376.837 144 368V144Z"
      fill="white"
    />
    <path
      d="M208 176H304M208 240H304M208 304H272"
      stroke={color}
      strokeWidth="24"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M160 96C160 87.1634 167.163 80 176 80H336C344.837 80 352 87.1634 352 96V96C352 104.837 344.837 112 336 112H176C167.163 112 160 104.837 160 96V96Z"
      fill="white"
    />
  </svg>
);

AppIcon.propTypes = {
  size: PropTypes.number,
  color: PropTypes.string,
};

AppIcon.defaultProps = {
  size: 512,
  color: '#0ea5e9',
};

export default AppIcon; 
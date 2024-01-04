import CloseButton from 'react-bootstrap/CloseButton';
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import Tooltip from 'react-bootstrap/Tooltip';
import { useNavigate } from "react-router-dom";

// eslint-disable-next-line react/prop-types
function ButtonClose({textOverlay="",redirectTo="/"}) {
  const navigate = useNavigate();
  const text = textOverlay;

  
  const closeForm =()=>{
    navigate(redirectTo)
  }

  return (
    <>
      <OverlayTrigger
    placement="bottom"
    overlay={<Tooltip id="button-tooltip-2">{text}</Tooltip>}
  >
    {({ ...triggerHandler }) => (
      <CloseButton onClick={closeForm} variant="white"
      {...triggerHandler}
      />
    )}
  </OverlayTrigger>
  </>
  )
}

export default ButtonClose
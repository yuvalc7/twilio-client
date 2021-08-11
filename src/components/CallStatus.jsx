import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";


const CallStatus = ({
    callStatus
}) => {
    return(
          <div>
              <h1>{callStatus}</h1>
              <i class="fas fa-phone-volume"></i>
          </div>
    )
}

export default CallStatus;
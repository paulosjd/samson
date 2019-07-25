import React, { useRef, useEffect } from "react";
import PropTypes from "prop-types";

function useOutsideAction(ref, action) {
    /** Run the action if clicked on outside of element */
    function handleClickOutside(event) {
        if (ref.current && !ref.current.contains(event.target)) {
            action()
        }
    }

    useEffect(() => {
        // Bind the event listener
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            // Unbind the event listener on clean up
            document.removeEventListener("mousedown", handleClickOutside)
        }
    })
}

function OutsideAction(props) {
    /** Component that runs the action prop (a callback function) if you click outside of it (and its children) */
    const wrapperRef = useRef(null);
    useOutsideAction(wrapperRef, props.action);
    return <div ref={wrapperRef}>{props.children}</div>;
}

OutsideAction.propTypes = {
    children: PropTypes.element.isRequired
};

export default OutsideAction
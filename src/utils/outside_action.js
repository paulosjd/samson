import React, { useRef, useEffect } from "react";
import PropTypes from "prop-types";

const useOutsideAction = (ref, action, targetId, onTargetIdMatch, ignoreId) => {

    const handleClickOutside = (event) => {
        /** Run the action if clicked on outside of element */
        if (targetId && onTargetIdMatch && event.target.id === targetId) {
            onTargetIdMatch()
        }
        if (ref.current && ref.current === ignoreId) {
            return
        }
        if (ref.current && !ref.current.contains(event.target)) {
            action()
        }
    };

    const handleKeyPress = (event) => {
        if (event.key === 'Escape'){
            action()
        }
    };

    useEffect(() => {
        // Bind the event listener
        document.addEventListener("mousedown", handleClickOutside);
        document.addEventListener("keydown", handleKeyPress);
        return () => {
            // Unbind the event listener on clean up
            document.removeEventListener("mousedown", handleClickOutside)
            document.removeEventListener("keydown", handleKeyPress);
        }
    })
}

function OutsideAction(props) {
    /** Component that runs the action prop (a callback function) if you click outside of it (and its children) */
    const wrapperRef = useRef(null);
    useOutsideAction(wrapperRef, props.action, props.targetId, props.onTargetIdMatch, props.ignoreId);
    return <div ref={wrapperRef}>{props.children}</div>;
}

OutsideAction.propTypes = {
    children: PropTypes.element.isRequired
};

export default OutsideAction
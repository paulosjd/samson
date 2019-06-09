import React from "react";

export default (props) => {
    let logo = '/logos/python_logo.png';
    return (
        <div onClick={() => props.handleClick(props.label + 'clicked!')}>
            <img className='category_logo' src={logo} alt={'foobar'}/>
            <h5 className='category_label'>{props.label + ': ' + props.value}</h5>
        </div>
    )
}
import React from "react";
import "./styles/multi_select.css"

const MultiSelect = (props) => {

    let selected = [];
    props.options.forEach(obj => {
        if (obj.value) {
            selected.push({ label: obj.label, id: obj.id });
        }
    });

    let selectedList = (
        <label className="selected-options-badges-list"
               onClick={(e) => {
                   if (e.target.className === 'selected-badge-cross') {
                       // Remove item from selected when cross is clicked
                       optionsOnchange(e.target.parentElement.dataset.id, false)
                   }
        }}>
            {selected.map((obj) => {
                return (
                    <span style={props.selectedOptionsStyles || selectedOptionsStyles}
                          key={obj.id} data-id={obj.id}
                          className="selected-options-badges" >{obj.label}
                          <span className='selected-badge-cross'>×</span>
                    </span>
                );
            })}
        </label>);

    const optionsOnchange = (index, value) => {
        /** Call the parents useState setter function with the updated selected options array.
         * This causes the component the be re-rendered with this updated array, whose objects are included
         * in the selected options array if they have a 'value' key which is truthy */
        let dd = props.options.slice();
        dd[index].value = value;
        props.selectedBadgeClicked(dd);
    };

    const options = props.options.map((el, i) => {
        return (
            <li key={el.id} value={el.value} className="multi-select-item">
                <div className="option-list"
                     style={el.value ? (props.optionsListStyles || optionsListStyles) : {}}
                     onClick={() => optionsOnchange(i, !el.value)}>{el.label}
                </div>
            </li>
        );
    });

    return (
        <div className="multi-select" tabIndex="0"
             onBlur={ () => props.setDropDownClicked(false) }>
            <div className="selected-options"
                 onClick={(e) => {
                     if ('selected-options-badges-list' !== e.target.className || !props.dropDownClicked){
                         props.setDropDownClicked(true)
                     } else props.setDropDownClicked(false)
                 }}
            >
                {selectedList}
                <div className="arrow"
                     onClick={ () => props.setDropDownClicked(!props.dropDownClicked) }
                >&#9660;</div>
            </div>
            <ul style={props.dropDownClicked ? {height: props.optionsHeight} : {}}
                className={"options " + (props.dropDownClicked ? "show" : "")}
            >
                { props.dropDownClicked ? options : null }
            </ul>
        </div>
    )
};

export default MultiSelect;

const selectedOptionsStyles = {color: "#000", backgroundColor: "#fff"};
const optionsListStyles = {backgroundColor: "cornflowerblue", color: "#fff"};
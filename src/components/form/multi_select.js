import React, {useState} from "react";
import "./styles/multi_select.css"

const MultiSelect = (props) => {
    const selectedOptionsStyles = {color: "#000", backgroundColor: "#fff"};
    const optionsListStyles = {backgroundColor: "cornflowerblue", color: "#fff"};
    let selected = [];
    props.options.map((obj) => {
        if (obj.value) {
            selected.push({ label: obj.label, id: obj.id });
        }
    });
    let selectedList = (
        <label className="selected-options-badges-list" onClick={() => {
            console.log('selectedList label on click!!')
            props.setDropDownClicked(false);
        }}>
            {selected.map((obj) => {
                return (
                    <span style={props.selectedOptionsStyles || selectedOptionsStyles} key={obj.id}
                          onClick={selectedOptionsClick}
                          className="selected-options-badges" >{obj.label}
                    </span>
                );
            })}
        </label>);
    const selectedOptionsClick = (id) => {
        console.log('rain?')
        console.log('props.options:' )
        console.log(props.options)
        let filteredList = props.options.slice();
        console.log('filteredList:' )
        console.log(filteredList)
        // Todo  -- use filter isntead?
        filteredList.map((obj) => {
            if (obj.id === id) {
                obj.value = false;
            }
        });
        props.setDropDownClicked(false)
        console.log('selectedOptionsClick ran!')
        props.optionClicked(filteredList);
    };
    const optionsOnchange = (index, value) => {
        let dd = props.options.slice();
        dd[index].value = value;
        props.selectedBadgeClicked(dd);
    };
    const options = props.options.map((el, i) => {
        return (
            <li key={el.id} value={el.value}  >
                <div className="option-list"
                     style={el.value ? (props.optionsListStyles || optionsListStyles) : {}}
                     onClick={optionsOnchange.bind(this, i, !el.value)}>{el.label}
                </div>
            </li>
        );
    })

    return (
        <div className="multi-select" tabIndex="0"
             onBlur={() => {
                 props.setDropDownClicked(false);
             }}>
            <div className="selected-options"
                 onClick={(e) => {
                     if ('selected-options-badges-list' !== e.target.className || !props.dropDownClicked){
                         props.setDropDownClicked(true)
                     }
                 }}
            >{selectedList}
                <div className="arrow"
                     onClick={() => {props.setDropDownClicked(!props.dropDownClicked)}}
                >&#9660;</div>
            </div>
            <ul className={"options " + (props.dropDownClicked ? "show" : "")}>
                {props.dropDownClicked ? options : null}
            </ul>
        </div>
    )
}

export default MultiSelect;
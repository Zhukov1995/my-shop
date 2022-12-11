import React from "react"
import './section.scss';

const Section = (props) => {
    const styleSection = {
        backgroundColor: props.backgroundColor
    }

    return (
        <div className="section" style={styleSection}>
            <h2>{props.title}</h2>
            <hr/>
            <div className="wrapper-children">{props.children}</div>
        </div>
    )
}

export default Section;
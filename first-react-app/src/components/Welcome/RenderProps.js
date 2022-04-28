// Is same as <Slot></Slot>

import React, { Component } from 'react'

class ChildComponent extends Component {
    constructor(props) {
        super(props);
    }
    render() {
        return (
            <>
                {
                    this.props.render({
                        value: "Hello NTD"
                    })
                }
            </>
        )
    }
}


export default class RenderProps extends Component {
    
    render() {
        return (
            <ChildComponent
                render={(data) => {
                    return <h4>{data.value}</h4>
                }}>
            </ChildComponent>
        )
    }
}

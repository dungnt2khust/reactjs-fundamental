/**

I. Use State
II. Use Effect: useEffect(effectFunction, arrayDependencies)

1. componentDidMount : useEffect(effectFunction, []) - arrayDependencies là một mảng rỗng
2. componentDidUpdate : useEffect(effectFunction) - arrayDependencies bằng null
3. componentWillUnmount : useEffect(return componentWillUnmount)


*/

import React, { useState, useEffect } from 'react'
import { Button } from "react-bootstrap"
// import PropTypes from 'prop-types'

function Hooks(props) {
    var [number, setNumber] = useState(0);
    var [numberShow, setNumberShow] = useState(false)

    // Did mount
    useEffect(() => {
        console.log('component did mount');
    }, [])

    // Did update
    useEffect(() => {
        console.log('component did update:', 'render');
        // will unmount
        return () => console.log('unmounting...')
    })

    return (
        <>
            {numberShow ? 
            <h4>{number}</h4>
            : ""}
            <Button onClick={() => {
                setNumber(number + 1);
            }} variant="primary">Increase</Button> 
            <Button onClick={() => {
                setNumberShow(!numberShow);
            }} variant="success">Toggle number</Button>
        </>
    )
}

// Hooks.propTypes = {}

export default Hooks


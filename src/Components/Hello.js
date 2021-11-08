import React, { useState } from 'react'
import { animated } from 'react-spring'
// import { useSpring } from '@react-spring/core'
import { useSpring } from 'react-spring'

import '../index.css';

import ArrowWhite from '../Assets/proj_arrows_white.svg';

const Hello = () => {
    const [rotate, setRotate] = useState()

    
    const rotationAnimation = useSpring({
		transform: !rotate ? `rotate(0deg)` : `rotate(180deg)`,
	});

    // const styles = useSpring({
    //     loop: true,
    //     to: [
    //       { opacity: 1, color: '#ffaaee' },
    //       { opacity: 0.5, color: 'rgb(14,26,19)' },
    //     ],
    //     from: { opacity: 0.5, color: 'red' },
    //   })

    console.log(rotationAnimation)

    return (
        <div style={{ marginTop: '90px'}}>
        <animated.img src={ArrowWhite} alt="drop down arrow" style={rotationAnimation} className="dropDownArrow"/>
        <button onClick={() => setRotate(!rotate)}> 
                    <h1>Click</h1>
        </button>
    </div>
    )
}

export default Hello

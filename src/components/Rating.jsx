import React from 'react'

import { BsStarFill , BsStarHalf , BsStar } from 'react-icons/bs';

const Rating = ({value , text }) => {

  return (
    <div>
        {value>= 1 ? <BsStarFill style={{color:'#ffe234'}}/> : value >= 0.5 ? <BsStarHalf style={{color:'#ffe234'}}/> : <BsStar style={{color:'#ffe234'}}/>}
        {value>= 2 ? <BsStarFill style={{color:'#ffe234'}}/> : value >= 1.5 ? <BsStarHalf style={{color:'#ffe234'}}/> : <BsStar style={{color:'#ffe234'}}/>}
        {value>= 3 ? <BsStarFill style={{color:'#ffe234'}}/> : value >= 2.5 ? <BsStarHalf style={{color:'#ffe234'}}/> : <BsStar style={{color:'#ffe234'}}/>}
        {value>= 4 ? <BsStarFill style={{color:'#ffe234'}}/> : value >= 3.5 ? <BsStarHalf style={{color:'#ffe234'}}/> : <BsStar style={{color:'#ffe234'}}/>}
        {value>= 5 ? <BsStarFill style={{color:'#ffe234'}}/> : value >= 4.5 ? <BsStarHalf style={{color:'#ffe234'}}/> : <BsStar style={{color:'#ffe234'}}/>}
    </div>
  )
}

export default Rating;
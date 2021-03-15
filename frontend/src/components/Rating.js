import React from 'react'

const Rating = ({ value, text, color }) => {
    const rated = () => {
        let r = [];
        for (let i = 1; i <= 5; i++) {
            r.push(<i key={i} style={{color}}className={value >= i ? 'fas fa-star': value >= i - 0.5 ? 'fas fa-star-half-alt' : 'far fa-star'} />);
        }
        return r;
    }
    return (
        <div className="rating">
           { rated() } <span>{text && text}</span>
        </div>
    )
}
Rating.defaultProps = {
    color: '#f8e825'
}
export default Rating

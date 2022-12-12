import React from 'react';

const Recommendation = ({recommendationObj}) => {
    return(
        <div>
            <h3>Recommendation</h3>

            {recommendationObj !== null && 
                <h4>{recommendationObj.name}</h4>
            }
        </div>
    )
}

export default Recommendation;
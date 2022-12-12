import React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';



const Recommendation = ({recommendationObj}) => {
    return(
        <div className='recommendation-wrapper'>
            {recommendationObj !== null && 
                <div class='recommendation-container'>
                    {/* <Card sx={{ minWidth: 275 }}>
                        <CardContent> */}
                            <h3>Recommendation</h3>
                            <h4>{recommendationObj.name}</h4>
                        {/* </CardContent>
                    </Card> */}
                </div>
            }
        </div>
    )
}

export default Recommendation;
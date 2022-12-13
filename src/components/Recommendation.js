import React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';



const Recommendation = ({recommendationObj}) => {
    return(
        <div className='recommendation-wrapper'>
            {recommendationObj !== null && 
                <div class='recommendation-container'>
                    <Card sx={{ 
                        minWidth: 275,
                        maxWidth: 700,
                         }}>
                        <CardContent>
                            {/* <h5 id="recommendation-header">Recommendation</h5> */}
                            <h3 id="recommendation-text">{recommendationObj.name}</h3>
                        </CardContent>
                    </Card>
                </div>
            }
        </div>
    )
}

export default Recommendation;
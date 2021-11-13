import React from 'react';

const Display = (props: any) => {
    return(
        <div>
            {props.result.length > 0 && props.result.map((article: any, index: number) => {
                let image 
                {if(article.multimedia.length > 0)
                    {image=`http://www.nytimes.com/${article.multimedia[0].url}`}
                }

                return(
                    <div style={{border: '1px solid #ccc', padding:'10px', marginBottom: '20px', backgroundColor: '#ddd'}} key={index}>
                        <h2><a href={article.web_url}>{article.headline.main}</a></h2>
                        <img style={{maxWidth: '200px', float: 'right', marginLeft: '20px'}} src={image} alt={article.headline.main} />
                        {article.snippet}
                        <div className='keywords'>
                            <p>Keywords:</p>
                            {article.keywords.length > 0 && article.keywords.map((keyword: any, index: number) => {
                            return(
                                <div key={index}>
                                    <p style={{margin: '5px', backgroundColor: '#ccc'}}>{keyword.value}</p>
                                </div>
                            )
                            })}
                        </div>
                 </div>
                )
            })}
        </div>
    )
}

export default Display
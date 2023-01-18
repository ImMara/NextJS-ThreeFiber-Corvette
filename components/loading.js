import React from 'react';

function Loading(props) {
    return (
        <div style={{display:"flex",justifyContent:"center",width:"100%", height:"100%",alignItems:"center"}}>
            <img src="/loading.gif" alt="loading" />
        </div>
    );
}

export default Loading;
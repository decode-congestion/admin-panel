import React, { useState } from 'react'
import { Map, TileLayer, Marker, Popup } from 'react-leaflet'
import { Link } from 'react-router-dom'
import { Button } from 'antd'

const Screen = () => {
    
    const tasks = [1, 2, 3, 4, 5]

    return (
        <div style={{
            padding: '50px'
        }}>
            <h1><Link to={`/stops`}>Manage Stops and Tasks</Link></h1>
            <h1>Tasks</h1>
            {
                tasks.map(t => (
                    <li key={t}>ID, TASK, DATETIME, WHO, RESULT, LAT, LNG</li>
                ))
            }
        </div>
    )
}

export default Screen
import React, { useState } from 'react'
import { Map, TileLayer, Marker, Popup } from 'react-leaflet'
import { Checkbox } from 'antd'
import { useParams } from 'react-router-dom'


const Screen = () => {
    let { id } = useParams();

    function onChange(checkedValues) {
        console.log('checked = ', checkedValues);
      }
      
    const plainOptions = ['1', '2', '3'];
    
    return (
        <div>
            <h1>Bus: #{id}</h1>
            <div>
                <h2>Passengers</h2>
                <Checkbox.Group options={plainOptions} defaultValue={['Apple']} onChange={onChange} />
            </div>
        </div>
    )
}

export default Screen
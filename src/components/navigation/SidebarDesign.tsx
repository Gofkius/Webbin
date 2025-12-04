import React, { useState } from 'react'
import { HexColorPicker } from 'react-colorful';

type Props = {}

const SidebarDesign = (props: Props) => {

    const [color, setColor] = useState("#FF0000");

  return (
    <div className="sidebar-design">
        <div className='color-picker-container'>
            <HexColorPicker color={color.toUpperCase()} onChange={(newColor) => setColor(newColor.toUpperCase())} />
            <div className='color-input-container'>
                <div className='circular-color' style={{ backgroundColor: color }}></div>
                <input type="text" value={color} onChange={(e) => setColor(e.target.value.toUpperCase())} />
            </div>
        </div>
    </div>
  )
}

export default SidebarDesign
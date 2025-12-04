import React from 'react'
import Navbar from '../navigation/Navbar'
import { Stage, Layer, Rect, Circle } from 'react-konva';
import { exportedUser } from '../auth/Login';
import TopBarDesign from '../navigation/TopBarDesign';
import SidebarDesign from '../navigation/SidebarDesign';

type Props = {}

const Design = (props: Props) => {
  return (
    <div className="design-page">
        <TopBarDesign />
        <div className='design-workspace'>
          <Stage width={window.innerWidth} height={window.innerHeight}>
            <Layer>
              <Rect
                x={20}
                y={20}
                width={100}
                height={100}
                fill="red"
                draggable
              />
              <Circle
                x={200}
                y={200}
                radius={50}
                fill="green"
                draggable
              />
            </Layer>
          </Stage>
        </div>
        <SidebarDesign />
    </div>
  )
}

export default Design
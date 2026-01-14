import React, { useState, useRef, useEffect, useCallback } from 'react';
import Navbar from '../navigation/Navbar';
import { Stage, Layer, Rect, Circle, Text, Group, Transformer, Star, RegularPolygon } from 'react-konva';
import { exportedUser } from '../auth/Login';
import TopBarDesign, { ToolType } from '../navigation/TopBarDesign';
import SidebarDesign from '../navigation/SidebarDesign';
import { KonvaEventObject } from 'konva/lib/Node';

export type Shape = {
  id: string;
  name: string; // Added name
  type: 'rect' | 'circle' | 'text' | 'group' | 'star' | 'triangle';
  x: number;
  y: number;
  width?: number;
  height?: number;
  radius?: number;
  cornerRadius?: number; // For Rect
  innerRadius?: number; // For Star
  numPoints?: number; // For Star
  sides?: number; // For Polygon/Triangle
  fill: string;
  text?: string;
  fontSize?: number;
  rotation?: number;
  scaleX?: number;
  scaleY?: number;
  visible?: boolean;
  children?: Shape[];
};

type Props = {};

const Design = (props: Props) => {
  const [shapes, setShapes] = useState<Shape[]>([]);
  // Multi-select support
  const [selectedIds, setSelectedIds] = useState<string[]>([]);
  const [tool, setTool] = useState<ToolType>('select');

  // Stage control
  const [stageScale, setStageScale] = useState(1);
  const [stagePos, setStagePos] = useState({ x: 0, y: 0 });

  // Artboard Config
  const ARTBOARD_WIDTH = 800;
  const ARTBOARD_HEIGHT = 600;

  const stageRef = useRef<any>(null);
  const artboardRef = useRef<any>(null);
  const trRef = useRef<any>(null);

  // Window Resize handling
  const [size, setSize] = useState({
    width: window.innerWidth,
    height: window.innerHeight
  });

  useEffect(() => {
    const checkSize = () => {
      setSize({
        width: window.innerWidth,
        height: window.innerHeight
      });
    };
    window.addEventListener('resize', checkSize);
    return () => window.removeEventListener('resize', checkSize);
  }, []);

  // Initial centering (only once)
  useEffect(() => {
    const stageWidth = window.innerWidth - 300;
    const stageHeight = window.innerHeight - 60;

    const startX = (stageWidth - ARTBOARD_WIDTH) / 2;
    const startY = (stageHeight - ARTBOARD_HEIGHT) / 2;

    setStagePos({ x: startX, y: startY });
    // Note: We don't recalculate stagePos on subsequent resizes to avoid jumping
  }, []);

  // Update selection transformer
  useEffect(() => {
    if (trRef.current && stageRef.current) {
      const nodes: any[] = [];
      selectedIds.forEach(id => {
        // We need to find nodes. They could be inside groups.
        // Konva's findOne searches recursively.
        const node = stageRef.current.findOne('.' + id);
        if (node) nodes.push(node);
      });

      trRef.current.nodes(nodes);
      trRef.current.getLayer()?.batchDraw();
    }
  }, [selectedIds, shapes]); // Dep on shapes to re-find nodes if structure changes

  const checkDeselect = (e: KonvaEventObject<MouseEvent | TouchEvent>) => {
    const clickedOnStage = e.target === e.target.getStage();
    const isArtboardBg = e.target.name() === 'artboard-bg';

    if (clickedOnStage || isArtboardBg) {
      setSelectedIds([]);
    }
  };

  const addShape = (type: 'rect' | 'circle' | 'text' | 'star' | 'triangle') => {
    const x = ARTBOARD_WIDTH / 2;
    const y = ARTBOARD_HEIGHT / 2;
    const id = `${type}-${Date.now()}`;

    // Generate default name
    const count = shapes.length + 1; // Simplified count
    let name = '';
    if (type === 'rect') name = `Rectangle ${count}`;
    else if (type === 'circle') name = `Circle ${count}`;
    else if (type === 'text') name = `Text ${count}`;
    else if (type === 'star') name = `Star ${count}`;
    else if (type === 'triangle') name = `Triangle ${count}`;

    const baseShape = {
      id: id,
      name: name,
      x: x,
      y: y,
      fill: '#000000',
      type: type,
      visible: true
    };

    if (type === 'rect') {
      setShapes([...shapes, { ...baseShape, x: x - 50, y: y - 50, width: 100, height: 100 } as Shape]);
    } else if (type === 'circle') {
      setShapes([...shapes, { ...baseShape, radius: 50 } as Shape]);
    } else if (type === 'text') {
      setShapes([...shapes, { ...baseShape, x: x - 50, y: y - 12, text: 'Hello World', fontSize: 24 } as Shape]);
    } else if (type === 'star') {
      setShapes([...shapes, { ...baseShape, numPoints: 5, innerRadius: 20, radius: 40, fill: '#FFD700' } as Shape]);
    } else if (type === 'triangle') {
      setShapes([...shapes, { ...baseShape, sides: 3, radius: 50, fill: '#00ff00' } as Shape]);
    }

    setTool('select');
    setSelectedIds([id]);
  };

  const handleExport = () => {
    if (artboardRef.current && stageRef.current) {
      // Hide transformer
      trRef.current.visible(false);

      const group = artboardRef.current;
      const stage = stageRef.current;

      // 1. Store current Stage transform (Zoom/Pan state)
      const stageScaleX = stage.scaleX();
      const stageScaleY = stage.scaleY();
      const stageX = stage.x();
      const stageY = stage.y();

      // 2. Reset Stage to identity to ensure export is 1:1 and independent of view
      stage.scale({ x: 1, y: 1 });
      stage.position({ x: 0, y: 0 });

      // Store original clip values
      const originalClip = {
        width: group.clipWidth(),
        height: group.clipHeight(),
        x: group.clipX(),
        y: group.clipY()
      };

      // Disable clipping temporarily
      group.clipWidth(null);
      group.clipHeight(null);
      group.clipX(null);
      group.clipY(null);

      const padding = 20;

      // Calculate bounds by iterating children
      // We start with the Artboard BG bounds (0,0 - 800x600) to ensure we always export at least the canvas
      let minX = 0;
      let minY = 0;
      let maxX = ARTBOARD_WIDTH;
      let maxY = ARTBOARD_HEIGHT;

      // Iterate all children to expand bounds if necessary
      group.getChildren().forEach((node: any) => {
        // Skip if not visible
        if (!node.visible()) return;

        // Calculate rect relative to group. 
        // Since Stage is now 1:1 and at 0,0, relative calc is very robust.
        const nodeRect = node.getClientRect({ relativeTo: group });

        minX = Math.min(minX, nodeRect.x);
        minY = Math.min(minY, nodeRect.y);
        maxX = Math.max(maxX, nodeRect.x + nodeRect.width);
        maxY = Math.max(maxY, nodeRect.y + nodeRect.height);
      });

      const width = maxX - minX;
      const height = maxY - minY;

      const uri = group.toDataURL({
        pixelRatio: 2,
        x: minX - padding,
        y: minY - padding,
        width: width + (padding * 2),
        height: height + (padding * 2),
        mimeType: 'image/png'
      });

      // Restore clipping
      group.clipWidth(originalClip.width);
      group.clipHeight(originalClip.height);
      group.clipX(originalClip.x);
      group.clipY(originalClip.y);

      // Restore Stage transform
      stage.scale({ x: stageScaleX, y: stageScaleY });
      stage.position({ x: stageX, y: stageY });
      stage.batchDraw(); // Refresh stage to align with restored state

      trRef.current.visible(true); // Show again

      const link = document.createElement('a');
      link.download = 'design.png';
      link.href = uri;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }
  };

  // Recursively update shapes (flattened update for simple props, but we need deep update)
  // Actually, easier to use a recursive map.
  const updateShapeRecursive = (currentShapes: Shape[], updatedAttrs: Partial<Shape>): Shape[] => {
    return currentShapes.map(shape => {
      if (shape.id === updatedAttrs.id) {
        return { ...shape, ...updatedAttrs } as Shape;
      }
      if (shape.children) {
        return { ...shape, children: updateShapeRecursive(shape.children, updatedAttrs) };
      }
      return shape;
    });
  };

  const handleShapeChange = (newAttrs: Shape) => {
    setShapes(prev => updateShapeRecursive(prev, newAttrs));
  };

  // Delete
  const deleteSelected = () => {
    const filterRecursive = (items: Shape[]): Shape[] => {
      return items.filter(item => !selectedIds.includes(item.id)).map(item => {
        if (item.children) {
          return { ...item, children: filterRecursive(item.children) };
        }
        return item;
      });
    };
    setShapes(prev => filterRecursive(prev));
    setSelectedIds([]);
  };

  // Group
  const groupSelected = () => {
    if (selectedIds.length < 2) return;

    // Find selected shapes and their parent (assuming flat list for now or simple selection)
    // Complex grouping logic:
    // 1. Identify all selected items.
    // 2. Remove them from their current locations.
    // 3. Create a New Group.
    // 4. Add them to New Group.
    // 5. Add New Group to the parent of the first selected item (or root).

    // Simplified: Only support grouping top-level items for this iteration to avoid extreme complexity.
    const selectedItems = shapes.filter(s => selectedIds.includes(s.id));
    if (selectedItems.length !== selectedIds.length) {
      // Some Items might be nested. handling nested grouping is hard.
      // Strategy: Flatten selection? Or just support top level.
      // Let's implement Top Level grouping only for MVP.
      console.warn("Can only group top-level items for now");
      return;
    }

    const unselectedItems = shapes.filter(s => !selectedIds.includes(s.id));

    // Calculate bounding box for the group position
    // ... logic omitted for brevity, putting at 0,0 relative to group
    // Ideally we find minX, minY.

    let minX = Infinity, minY = Infinity;
    selectedItems.forEach(s => {
      if (s.x < minX) minX = s.x;
      if (s.y < minY) minY = s.y;
    });

    // Adjust children positions relative to group
    const children = selectedItems.map(s => ({
      ...s,
      x: s.x - minX,
      y: s.y - minY
    }));

    const newGroup: Shape = {
      id: `group-${Date.now()}`,
      name: `Group ${shapes.length + 1}`,
      type: 'group',
      x: minX,
      y: minY,
      fill: 'transparent',
      children: children,
      visible: true
    };

    setShapes([...unselectedItems, newGroup]);
    setSelectedIds([newGroup.id]);
  };

  const ungroupSelected = () => {
    if (selectedIds.length !== 1) return;
    const groupId = selectedIds[0];

    const groupToUngroup = shapes.find(s => s.id === groupId && s.type === 'group');
    if (!groupToUngroup || !groupToUngroup.children) return;

    // Remove group, add children back to top level with adjusted coordinates
    const children = groupToUngroup.children.map(child => ({
      ...child,
      x: groupToUngroup.x + child.x,
      y: groupToUngroup.y + child.y,
      rotation: (groupToUngroup.rotation || 0) + (child.rotation || 0),
      scaleX: (groupToUngroup.scaleX || 1) * (child.scaleX || 1),
      scaleY: (groupToUngroup.scaleY || 1) * (child.scaleY || 1),
    }));

    const remainingShapes = shapes.filter(s => s.id !== groupId);
    setShapes([...remainingShapes, ...children]);
    setSelectedIds(children.map(c => c.id));
  };

  const toggleVisibility = (id: string) => {
    const toggleRecursive = (items: Shape[]): Shape[] => {
      return items.map(item => {
        if (item.id === id) {
          return { ...item, visible: !item.visible };
        }
        if (item.children) {
          return { ...item, children: toggleRecursive(item.children) };
        }
        return item;
      });
    };
    setShapes(prev => toggleRecursive(prev));
  };

  const handleWheel = (e: KonvaEventObject<WheelEvent>) => {
    e.evt.preventDefault();
    const scaleBy = 1.05;
    const stage = e.target.getStage();
    if (!stage) return;

    const oldScale = stage.scaleX();
    const pointer = stage.getPointerPosition();
    if (!pointer) return;

    const mousePointTo = {
      x: (pointer.x - stage.x()) / oldScale,
      y: (pointer.y - stage.y()) / oldScale,
    };

    const newScale = e.evt.deltaY < 0 ? oldScale * scaleBy : oldScale / scaleBy;

    setStageScale(newScale);
    setStagePos({
      x: pointer.x - mousePointTo.x * newScale,
      y: pointer.y - mousePointTo.y * newScale,
    });
  };

  // Find Path to Shape
  const findPathToShape = (items: Shape[], targetId: string, path: Shape[] = []): Shape[] | null => {
    for (const item of items) {
      if (item.id === targetId) {
        return [...path, item];
      }
      if (item.children) {
        const result = findPathToShape(item.children, targetId, [...path, item]);
        if (result) return result;
      }
    }
    return null;
  };

  // Smart Selection handling
  const handleSmartClick = (id: string, multi: boolean) => {
    if (multi) {
      // Standard toggle for multi select - no fancy group logic for simplicity in multi-mode
      setSelectedIds(prev => prev.includes(id) ? prev.filter(i => i !== id) : [...prev, id]);
      return;
    }

    // Single select: Check parents
    const path = findPathToShape(shapes, id);
    if (!path) return; // Should not happen

    // Logic:
    // 1. If part of a group?
    // 2. Iterate from top (root group) down.
    // 3. Find the highest level Group that is NOT already selected.
    // 4. If the Group itself is already selected, drill down to next level.

    // Let's simplified version:
    // If parent is a Group and parent is NOT selected -> Select Parent.
    // If parent IS selected -> Select Self (Child).

    // But we have nested groups.
    // "Select Top-Most Unselected Group in Chain"

    let targetToSelect = id;

    // Reverse path to go from Root -> Child
    // path[0] is root.

    // If clicking a child deep inside: [GroupA, GroupB, Child]
    // Case 1: Nothing selected. Click Child. -> Select GroupA.
    // Case 2: GroupA selected. Click Child. -> Select GroupB.
    // Case 3: GroupB selected. Click Child. -> Select Child.

    for (let i = 0; i < path.length; i++) {
      const item = path[i];
      // If this item is already selected, continue to next (drill down)
      if (selectedIds.includes(item.id)) {
        continue;
      } else {
        // This item is not selected.
        // If it has children (it's a group), or it is the leaf.
        // Select it.
        targetToSelect = item.id;
        break;
      }
    }

    setSelectedIds([targetToSelect]);
  };

  const renderShape = (shape: Shape) => {
    if (shape.visible === false) return null;

    const commonProps = {
      id: shape.id,
      name: shape.id, // Class name for transformer
      x: shape.x,
      y: shape.y,
      rotation: shape.rotation || 0,
      scaleX: shape.scaleX || 1,
      scaleY: shape.scaleY || 1,
      draggable: selectedIds.includes(shape.id), // Only draggable if EXPLICITLY selected
      onClick: (e: KonvaEventObject<MouseEvent>) => {
        if (tool === 'select') {
          e.cancelBubble = true;
          handleSmartClick(shape.id, e.evt.shiftKey);
        }
      },
      onTap: (e: KonvaEventObject<TouchEvent>) => { // Mobile doesn't have shift key usually, but for completeness
        if (tool === 'select') {
          e.cancelBubble = true;
          handleSmartClick(shape.id, false);
        }
      },
      onDragEnd: (e: any) => {
        e.cancelBubble = true;
        handleShapeChange({ ...shape, x: e.target.x(), y: e.target.y() });
      },
      onTransformEnd: (e: any) => {
        e.cancelBubble = true;
        const node = e.target;
        const scaleX = node.scaleX();
        const scaleY = node.scaleY();
        node.scaleX(1);
        node.scaleY(1);

        if (shape.type === 'group') {
          handleShapeChange({
            ...shape,
            x: node.x(),
            y: node.y(),
            rotation: node.rotation(),
            scaleX: scaleX,
            scaleY: scaleY
          });
        } else if (shape.type === 'text') {
          handleShapeChange({
            ...shape,
            x: node.x(),
            y: node.y(),
            rotation: node.rotation(),
            fontSize: (shape.fontSize || 24) * scaleX
          });
        } else if (shape.type === 'rect') {
          handleShapeChange({
            ...shape,
            x: node.x(),
            y: node.y(),
            rotation: node.rotation(),
            width: Math.max(5, (shape.width || 100) * scaleX),
            height: Math.max(5, (shape.height || 100) * scaleY),
          });
        } else if (shape.type === 'star') {
          handleShapeChange({
            ...shape,
            x: node.x(),
            y: node.y(),
            rotation: node.rotation(),
            radius: Math.max(5, (shape.radius || 40) * scaleX),
            innerRadius: Math.max(2, (shape.innerRadius || 20) * scaleX), // Approx scaling for inner
          });
        } else if (shape.type === 'triangle') {
          handleShapeChange({
            ...shape,
            x: node.x(),
            y: node.y(),
            rotation: node.rotation(),
            radius: Math.max(5, (shape.radius || 50) * scaleX),
          });
        } else { // Circle
          handleShapeChange({
            ...shape,
            x: node.x(),
            y: node.y(),
            rotation: node.rotation(),
            radius: Math.max(5, (shape.radius || 50) * scaleX),
          });
        }
      }
    };

    if (shape.type === 'group') {
      return (
        <Group key={shape.id} {...commonProps}>
          {shape.children?.map(renderShape)}
        </Group>
      );
    }
    if (shape.type === 'rect') {
      return <Rect key={shape.id} {...commonProps} width={shape.width} height={shape.height} fill={shape.fill} cornerRadius={Math.max(0, shape.cornerRadius || 0)} />;
    } else if (shape.type === 'circle') {
      return <Circle key={shape.id} {...commonProps} radius={shape.radius} fill={shape.fill} />;
    } else if (shape.type === 'text') {
      return <Text key={shape.id} {...commonProps} text={shape.text} fontSize={shape.fontSize} fill={shape.fill} />;
    } else if (shape.type === 'star') {
      return <Star key={shape.id} {...commonProps} numPoints={shape.numPoints || 5} innerRadius={shape.innerRadius || 20} outerRadius={shape.radius || 40} fill={shape.fill} cornerRadius={Math.max(0, shape.cornerRadius || 0)} />;
    } else if (shape.type === 'triangle') {
      return <RegularPolygon key={shape.id} {...commonProps} sides={shape.sides || 3} radius={shape.radius || 50} fill={shape.fill} cornerRadius={Math.max(0, shape.cornerRadius || 0)} />;
    }
    return null;
  };

  const cursorStyle = tool === 'hand' ? 'grab' : 'default';

  // Find properties of primary selected object
  // For properties panel, if multiple selected, showing nothing or common?
  // Let's show first selected.
  const findShapeById = (items: Shape[], id: string): Shape | undefined => {
    for (const item of items) {
      if (item.id === id) return item;
      if (item.children) {
        const found = findShapeById(item.children, id);
        if (found) return found;
      }
    }
    return undefined;
  };

  const primarySelected = selectedIds.length === 1 ? findShapeById(shapes, selectedIds[0]) : undefined;

  return (
    <div className="design-page">
      <TopBarDesign
        selectedTool={tool}
        onSelectTool={setTool}
        onAddShape={addShape}
        onExport={handleExport}
        onGroup={groupSelected}
        onUngroup={ungroupSelected}
        onDelete={deleteSelected}
        canGroup={selectedIds.length > 1}
        canUngroup={selectedIds.length === 1 && primarySelected?.type === 'group'}
        canDelete={selectedIds.length > 0}
      />
      <div className="design-workspace" style={{ cursor: cursorStyle }}>
        <Stage
          width={size.width - 300}
          height={size.height - 60}
          style={{ backgroundColor: '#e5e5e5' }}
          onMouseDown={checkDeselect}
          onTouchStart={checkDeselect}
          ref={stageRef}
          draggable={tool === 'hand'}
          scaleX={stageScale}
          scaleY={stageScale}
          x={stagePos.x}
          y={stagePos.y}
          onWheel={handleWheel}
          onDragEnd={(e) => {
            if (e.target === stageRef.current) {
              setStagePos({ x: e.target.x(), y: e.target.y() });
            }
          }}
        >
          <Layer>
            <Group
              ref={artboardRef}
              x={0} y={0}
              width={ARTBOARD_WIDTH}
              height={ARTBOARD_HEIGHT}
              clipX={0} clipY={0}
              clipWidth={ARTBOARD_WIDTH}
              clipHeight={ARTBOARD_HEIGHT}
            >
              <Rect
                name="artboard-bg"
                x={0} y={0}
                width={ARTBOARD_WIDTH} height={ARTBOARD_HEIGHT}
                fill="white"
                shadowColor="black" shadowBlur={20} shadowOpacity={0.1}
                onClick={checkDeselect}
              />
              {shapes.map(renderShape)}
            </Group>
            <Transformer
              ref={trRef}
              keepRatio={false}
              boundBoxFunc={(oldBox, newBox) => {
                // limit resize
                if (newBox.width < 5 || newBox.height < 5) {
                  return oldBox;
                }
                return newBox;
              }}
            />
          </Layer>
        </Stage>
      </div>
      <SidebarDesign
        shapes={shapes}
        selectedIds={selectedIds}
        onSelect={(id, multi) => handleSmartClick(id, multi)} // Reuse proper handler
        onLayerChange={handleShapeChange}
        onToggleVisibility={toggleVisibility}
        onReorder={(dragIndex, hoverIndex) => {
          const newShapes = [...shapes];
          const draggedItem = newShapes[dragIndex];
          newShapes.splice(dragIndex, 1);
          newShapes.splice(hoverIndex, 0, draggedItem);
          setShapes(newShapes);
        }}
      />
    </div>
  );
};

export default Design;
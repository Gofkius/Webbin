import React, { useState } from 'react'
import { HexColorPicker } from 'react-colorful';
import { Shape } from '../pages/Design';

type Props = {
  shapes: Shape[];
  selectedIds: string[];
  onSelect: (id: string, multi: boolean) => void;
  onLayerChange: (newAttrs: Shape) => void;
  onToggleVisibility: (id: string) => void;
  onReorder: (dragIndex: number, hoverIndex: number) => void;
}

const LayerNode = ({ shape, level, selectedIds, onSelect, onToggleVisibility, onRename, index, onMove }: {
  shape: Shape,
  level: number,
  selectedIds: string[],
  onSelect: (id: string, multi: boolean) => void,
  onToggleVisibility: (id: string) => void,
  onRename: (id: string, newName: string) => void;
  index: number;
  onMove: (dragIndex: number, hoverIndex: number) => void;
}) => {
  const isSelected = selectedIds.includes(shape.id);

  const [isEditing, setIsEditing] = useState(false);
  const [editName, setEditName] = useState(shape.name || shape.type);

  // Update editName when shape.name changes externally (e.g. undo/redo or prop updates)
  React.useEffect(() => {
    setEditName(shape.name || shape.type);
  }, [shape.name, shape.type]);

  const submitRename = () => {
    setIsEditing(false);
    if (editName.trim() && editName !== shape.name) {
      onRename(shape.id, editName);
    }
  };

  return (
    <div key={shape.id}>
      <div
        className={`layer-item ${isSelected ? 'active' : ''}`}
        style={{ paddingLeft: `${level * 1 + 1}rem` }}
        onClick={(e) => {
          e.stopPropagation();
          onSelect(shape.id, e.shiftKey || e.metaKey || e.ctrlKey); // Standard multi-select modifier
        }}
        draggable={level === 0}
        onDragStart={(e) => {
          if (level !== 0) {
            e.preventDefault();
            return;
          }
          e.dataTransfer.setData('text/plain', index.toString());
          e.dataTransfer.effectAllowed = 'move';
        }}
        onDragOver={(e) => {
          e.preventDefault(); // Necessary to allow dropping
          e.dataTransfer.dropEffect = 'move';
        }}
        onDrop={(e) => {
          e.preventDefault();
          const dragIndex = Number(e.dataTransfer.getData('text/plain'));
          const hoverIndex = index;
          if (dragIndex !== hoverIndex) {
            onMove(dragIndex, hoverIndex);
          }
        }}
        onDoubleClick={(e) => {
          e.stopPropagation();
          setIsEditing(true);
          setEditName(shape.name || shape.type); // Reset editName to current shape name on double click
        }}
      >
        <span
          className="visibility-toggle"
          onClick={(e) => {
            e.stopPropagation();
            onToggleVisibility(shape.id);
          }}
          style={{ opacity: shape.visible === false ? 0.3 : 1, marginRight: '0.5rem', cursor: 'pointer' }}
        >
          <img
            src={`/images/icons/${shape.visible === false ? 'hide-svgrepo-com.svg' : 'show-svgrepo-com.svg'}`}
            width={14}
            height={14}
            alt="Visibility"
          />
        </span>

        {shape.type === 'group' ? (
          <img src="/images/icons/layers-svgrepo-com.svg" width={14} height={14} alt="Group" style={{ marginRight: '0.3rem' }} />
        ) : shape.type === 'text' ? (
          <img src="/images/icons/text-svgrepo-com.svg" width={14} height={14} alt="Text" style={{ marginRight: '0.3rem' }} />
        ) : shape.type === 'rect' ? (
          <img src="/images/icons/square-svgrepo-com.svg" width={14} height={14} alt="Rect" style={{ marginRight: '0.3rem' }} />
        ) : shape.type === 'circle' ? (
          <img src="/images/icons/circle-svgrepo-com.svg" width={14} height={14} alt="Circle" style={{ marginRight: '0.3rem' }} />
        ) : shape.type === 'star' ? (
          <img src="/images/icons/star-svgrepo-com.svg" width={14} height={14} alt="Star" style={{ marginRight: '0.3rem' }} />
        ) : shape.type === 'triangle' ? (
          <img src="/images/icons/triangle-svgrepo-com.svg" width={14} height={14} alt="Triangle" style={{ marginRight: '0.3rem' }} />
        ) : (
          <img src="/images/icons/circle-svgrepo-com.svg" width={14} height={14} alt="icon" style={{ marginRight: '0.3rem' }} />
        )}

        {isEditing ? (
          <input
            value={editName}
            onChange={(e) => setEditName(e.target.value)}
            onBlur={submitRename}
            onKeyDown={(e) => {
              if (e.key === 'Enter') {
                submitRename();
              }
            }}
            style={{
              background: '#1a1a1a',
              border: '1px solid #555',
              color: 'white',
              padding: '2px 5px',
              fontSize: '0.9rem',
              width: '100px'
            }}
            autoFocus
            onClick={(e) => e.stopPropagation()}
          />
        ) : (
          <span>{shape.name || shape.type}</span>
        )}
      </div>
      {shape.children && shape.children.map((child, i) => (
        <LayerNode
          key={child.id}
          shape={child}
          level={level + 1}
          selectedIds={selectedIds}
          onSelect={onSelect}
          onToggleVisibility={onToggleVisibility}
          onRename={onRename}
          index={i}
          onMove={onMove}
        />
      ))}
    </div>
  );
}

const SidebarDesign = ({ shapes, selectedIds, onSelect, onLayerChange, onToggleVisibility, onReorder }: Props) => {

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

  // Show properties for the first selected item
  const selectedShape = selectedIds.length === 1 ? findShapeById(shapes, selectedIds[0]) : undefined;

  const handleColorChange = (newColor: string) => {
    if (selectedShape) {
      onLayerChange({
        ...selectedShape,
        fill: newColor
      });
    }
  };

  const handleRename = (id: string, newName: string) => {
    // Find shape and update name
    // Since we only have onLayerChange which takes a whole Shape object,
    // we need to find the shape first.
    const shape = findShapeById(shapes, id);
    if (shape) {
      onLayerChange({ ...shape, name: newName });
    }
  };

  return (
    <div className="sidebar-design">
      <h3>Layers</h3>
      <div className="layers-list">
        {[...shapes].reverse().map((shape, i) => {
          const index = shapes.length - 1 - i;
          return (
            <LayerNode
              key={shape.id}
              shape={shape}
              level={0}
              selectedIds={selectedIds}
              onSelect={onSelect}
              onToggleVisibility={onToggleVisibility}

              onRename={handleRename}
              index={index}
              onMove={onReorder}
            />
          );
        })}
      </div>

      {selectedShape && (
        <div className='properties-panel'>
          <h3>Properties</h3>

          {selectedShape.type === 'text' && (
            <div className="text-properties">
              <div className='input-group-sidebar'>
                <label>Content</label>
                <input
                  type="text"
                  value={selectedShape.text || ''}
                  onChange={(e) => onLayerChange({ ...selectedShape, text: e.target.value })}
                />
              </div>
              <div className='input-group-sidebar'>
                <label>Font Size</label>
                <input
                  type="number"
                  value={selectedShape.fontSize || 24}
                  onChange={(e) => onLayerChange({ ...selectedShape, fontSize: Number(e.target.value) })}
                />
              </div>
            </div>
          )}

          {(selectedShape.type === 'rect' || selectedShape.type === 'star' || selectedShape.type === 'triangle') && (
            <div className="input-group-sidebar">
              <label>Corner Radius</label>
              <input
                type="number"
                value={selectedShape.cornerRadius || 0}
                min={0}
                onChange={(e) => {
                  const val = Number(e.target.value);
                  if (val >= 0) {
                    onLayerChange({ ...selectedShape, cornerRadius: val });
                  }
                }}
              />
            </div>
          )}

          <div className='color-picker-container'>
            <label style={{ marginBottom: '0.5rem', display: 'block' }}>Fill Color</label>
            <HexColorPicker
              color={selectedShape.fill.toUpperCase()}
              onChange={(newColor) => handleColorChange(newColor)}
            />
            <div className='color-input-container'>
              <div className='circular-color' style={{ backgroundColor: selectedShape.fill }}></div>
              <input
                type="text"
                value={selectedShape.fill}
                onChange={(e) => handleColorChange(e.target.value)}
              />
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default SidebarDesign
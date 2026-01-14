import React from 'react'

export type ToolType = 'select' | 'hand' | 'rect' | 'circle' | 'text' | 'star' | 'triangle';

type Props = {
  selectedTool: ToolType;
  onSelectTool: (tool: ToolType) => void;
  onAddShape: (type: 'rect' | 'circle' | 'text' | 'star' | 'triangle') => void;
  onExport: () => void;
  onGroup?: () => void;
  onUngroup?: () => void;
  onDelete?: () => void;
  canGroup?: boolean;
  canUngroup?: boolean;
  canDelete?: boolean;
}

const TopBarDesign = ({ selectedTool, onSelectTool, onAddShape, onExport, onGroup, onUngroup, onDelete, canGroup, canUngroup, canDelete }: Props) => {
  return (
    <div className='top-bar-design'>
      <div className="toolbar-group">
        {/* Select Tool */}
        <button
          className={`tool-btn ${selectedTool === 'select' ? 'active' : ''}`}
          onClick={() => onSelectTool('select')}
          title="Select (V)"
        >
          <img src="/images/icons/mouse-svgrepo-com.svg" width={24} height={24} alt="Select" />
        </button>

        {/* Hand Tool */}
        <button
          className={`tool-btn ${selectedTool === 'hand' ? 'active' : ''}`}
          onClick={() => onSelectTool('hand')}
          title="Hand Tool (H)"
        >
          <img src="/images/icons/move-svgrepo-com.svg" width={24} height={24} alt="Hand" />
        </button>
      </div>

      <div className="toolbar-divider"></div>

      <div className="toolbar-group">
        {/* Rectangle */}
        <button
          className="tool-btn"
          onClick={() => onAddShape('rect')}
          title="Rectangle (R)"
        >
          <img src="/images/icons/square-svgrepo-com.svg" width={24} height={24} alt="Rectangle" />
        </button>

        {/* Circle */}
        <button
          className="tool-btn"
          onClick={() => onAddShape('circle')}
          title="Circle (C)"
        >
          <img src="/images/icons/circle-svgrepo-com.svg" width={24} height={24} alt="Circle" />
        </button>

        {/* Triangle */}
        <button
          className="tool-btn"
          onClick={() => onAddShape('triangle')}
          title="Triangle"
        >
          <img src="/images/icons/triangle-svgrepo-com.svg" width={24} height={24} alt="Triangle" />
        </button>

        {/* Star */}
        <button
          className="tool-btn"
          onClick={() => onAddShape('star')}
          title="Star"
        >
          <img src="/images/icons/star-svgrepo-com.svg" width={24} height={24} alt="Star" />
        </button>

        {/* Text */}
        <button
          className="tool-btn"
          onClick={() => onAddShape('text')}
          title="Text (T)"
        >
          <img src="/images/icons/text-svgrepo-com.svg" width={24} height={24} alt="Text" />
        </button>
      </div>

      <div className="toolbar-divider"></div>

      <div className="toolbar-group">
        {/* Group */}
        <button
          className="tool-btn"
          onClick={onGroup}
          disabled={!canGroup}
          style={{ opacity: canGroup ? 1 : 0.4 }}
          title="Group (Ctrl+G)"
        >
          <img src="/images/icons/layers-svgrepo-com.svg" width={24} height={24} alt="Group" />
        </button>

        {/* Ungroup */}
        <button
          className="tool-btn"
          onClick={onUngroup}
          disabled={!canUngroup}
          style={{ opacity: canUngroup ? 1 : 0.4 }}
          title="Ungroup (Ctrl+Shift+G)"
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <rect x="5" y="5" width="7" height="7" rx="1" stroke="currentColor" strokeWidth="2" />
            <rect x="12" y="12" width="7" height="7" rx="1" stroke="currentColor" strokeWidth="2" />
          </svg>
        </button>

        {/* Delete */}
        <button
          className="tool-btn"
          onClick={onDelete}
          disabled={!canDelete}
          style={{ opacity: canDelete ? 1 : 0.4, color: canDelete ? '#ff6b6b' : 'inherit' }}
          title="Delete"
        >
          <img src="/images/icons/trash-empty-svgrepo-com.svg" width={24} height={24} alt="Delete" />
        </button>
      </div>

      <div className="spacer" style={{ flex: 1 }}></div>

      <div className="toolbar-group">
        <button
          className="tool-btn primary"
          onClick={onExport}
          title="Export as PNG"
        >
          <img src="/images/icons/download-svgrepo-com.svg" width={20} height={20} alt="Export" style={{ marginRight: 8 }} />
          <span>Export</span>
        </button>
      </div>
    </div>
  )
}

export default TopBarDesign
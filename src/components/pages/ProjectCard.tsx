import React from 'react';

export type ProjectCardData = {
  id: string;
  name: string;
  previewImage: string;
  logoColor: string;
  lastEdited: string;
  createdAt: string;
};

type Props = {
  project: ProjectCardData;
  onClick?: (projectId: string) => void;
};

const ProjectCard = ({ project, onClick }: Props) => {
  return (
    <div 
      className="project-card" 
      onClick={() => onClick?.(project.id)}
    >
      <div className="project-card-preview">
        <img src={project.previewImage} alt={project.name} />
      </div>
      <div className="project-card-footer">
        <div 
          className="project-card-logo" 
          style={{ backgroundColor: project.logoColor }}
        />
        <div className="project-card-info">
          <h3>{project.name}</h3>
          <div className="project-card-dates">
            <span className="date-item">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <circle cx="12" cy="12" r="10"/>
                <polyline points="12 6 12 12 16 14"/>
              </svg>
              {project.lastEdited}
            </span>
            <span className="date-separator">•</span>
            <span className="date-item">{project.createdAt}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProjectCard;

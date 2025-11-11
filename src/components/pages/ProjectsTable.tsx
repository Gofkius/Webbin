import React from 'react';

export type Project = {
  id: string;
  name: string;
  lastEdited: string;
  createdAt: string;
};

type Props = {
  projects: Project[];
  onActionClick?: (projectId: string) => void;
};

const ProjectsTable = ({ projects, onActionClick }: Props) => {
  return (
    <div className="projects-table-container">
      <h2 className="projects-title">Projects</h2>
      <table className="projects-table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Last Edited</th>
            <th>Created at</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {projects.map((project) => (
            <tr key={project.id}>
              <td>{project.name}</td>
              <td>{project.lastEdited}</td>
              <td>{project.createdAt}</td>
              <td>
                <button
                  className="action-button"
                  onClick={() => onActionClick?.(project.id)}
                  aria-label={`Actions for ${project.name}`}
                >
                  •••
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ProjectsTable;

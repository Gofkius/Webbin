import React, { useState } from 'react'
import Navbar from '../navigation/Navbar'
import { exportedUser } from '../auth/Login';
import AdditionCard from './AdditionCard';
import ProjectCard, { ProjectCardData } from './ProjectCard';
import ProjectFilters from './ProjectFilters';
import { Navigate, useNavigate } from 'react-router-dom';

type Props = {}

// Mock data for project cards (will load in the future with a useEffect hook and API call)
const mockProjects: ProjectCardData[] = [
  {
    id: '1',
    name: 'Dashboard Design',
    previewImage: 'https://amadine.com/assets/img/articles/ui-design/contemporary-ui-design@2x.jpg',
    logoColor: '#8902ffff',
    lastEdited: '07/10/2025',
    createdAt: '05/10/2025',
  },
  {
    id: '2',
    name: 'Social Media App',
    previewImage: 'https://miro.medium.com/v2/resize:fit:1200/1*5FF-WiNYehgcBgtgAka1Og.png',
    logoColor: '#9c2c8bff',
    lastEdited: '06/10/2025',
    createdAt: '05/10/2025',
  },
  {
    id: '3',
    name: 'AirBnb Clone',
    previewImage: 'https://lh7-rt.googleusercontent.com/docsz/AD_4nXe_xvG6Ioze1-uVTGFZpaogliF8ZGTO520MxauDcxGbUGQ-E-Uqyuauzac_EmQd3Jd5mYFBIuN4SD6_D1PyMB4e633Cqau5n3b8O3zp6Ai9ZN2XDx2Ctx4a5G7JysgzHEaB9Tb9esG6qeV0PWeSk3wzLxM?key=mwKczS-4sJ-qiWOjVrph5A',
    logoColor: '#ff4d39ff',
    lastEdited: '06/10/2025',
    createdAt: '05/10/2025',
  },
  {
    id: '4',
    name: 'How to become a web developer',
    previewImage: 'https://cdn.prod.website-files.com/60bf472d552095558f2bb639/66a8ba589f664521bd859aa6_AdobeStock_651658306.webp',
    logoColor: '#e7d651ff',
    lastEdited: '04/10/2025',
    createdAt: '04/10/2025',
  },
];

const Home = (props: Props) => {

  const navigate = useNavigate();

  const [view, setView] = useState<'grid' | 'list'>('grid');

  const handleProjectClick = (projectId: string) => {
    console.log('Project clicked:', projectId);
  };

  const handleNewProject = () => {
    navigate('/design');
    console.log('Nuevo proyecto creado');
  };

  const handleSortChange = (sort: string) => {
    console.log('Sort by:', sort);
  };

  return (
    <div className="home-container">
      <Navbar />
      
      <div className="home-content">
        {/* Projects Section */}
        <section className="projects-section">
          <div className="projects-header">
            <button className="new-project-btn" onClick={handleNewProject}>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <line x1="12" y1="5" x2="12" y2="19"/>
                <line x1="5" y1="12" x2="19" y2="12"/>
              </svg>
              Nuevo Proyecto
            </button>
            <ProjectFilters 
              onSortChange={handleSortChange}
              onViewChange={setView}
            />
          </div>

          <div className={`projects-grid ${view === 'list' ? 'list-view' : ''}`}>
            {mockProjects.map((project) => (
              <ProjectCard
                key={project.id}
                project={project}
                onClick={handleProjectClick}
              />
            ))}
          </div>
        </section>
      </div>
    </div>
  )
}

export default Home
import React, { useState, useEffect } from 'react';
import { PDFDownloadLink, PDFViewer } from '@react-pdf/renderer';
import { generateReportData } from '../../services/reportsService';
import { ReportData } from '../../types/reports.types';
import ReportCharts from './ReportCharts';
import ReportDocument from './ReportDocument';

interface ReportsModalProps {
  onClose: () => void;
}

export const ReportsModal: React.FC<ReportsModalProps> = ({ onClose }) => {
  const [reportData, setReportData] = useState<ReportData | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [view, setView] = useState<'preview' | 'pdf'>('preview');

  const handleGenerateReport = async () => {
    setLoading(true);
    setError(null);
    
    try {
      const data = await generateReportData();
      setReportData(data);
    } catch (err) {
      console.error('Error generating report:', err);
      setError('Failed to generate report. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    // Auto-generate report on mount
    handleGenerateReport();
  }, []);

  return (
    <div className="reports-modal-overlay">
      <div className="reports-modal">
        {/* Header */}
        <div className="reports-modal-header">
          <h2>Analytics Report</h2>
          <button className="close-button" onClick={onClose}>x</button>
        </div>

        {/* View Toggle */}
        <div className="reports-view-toggle">
          <button
            className={view === 'preview' ? 'active' : ''}
            onClick={() => setView('preview')}
            disabled={loading || !reportData}
          >
            Chart Preview
          </button>
          <button
            className={view === 'pdf' ? 'active' : ''}
            onClick={() => setView('pdf')}
            disabled={loading || !reportData}
          >
            PDF Preview
          </button>
        </div>

        {/* Content */}
        <div className="reports-modal-content">
          {loading && (
            <div className="reports-loading">
              <div className="spinner"></div>
              <p>Generating report...</p>
            </div>
          )}

          {error && (
            <div className="reports-error">
              <p>{error}</p>
              <button onClick={handleGenerateReport}>Retry</button>
            </div>
          )}

          {reportData && !loading && (
            <>
              {view === 'preview' && (
                <div className="reports-preview">
                  <ReportCharts data={reportData} />
                </div>
              )}

              {view === 'pdf' && (
                <div className="reports-pdf-viewer">
                  <PDFViewer width="100%" height="600px">
                    <ReportDocument data={reportData} />
                  </PDFViewer>
                </div>
              )}
            </>
          )}
        </div>

        {/* Footer Actions */}
        {reportData && !loading && (
          <div className="reports-modal-footer">
            <button onClick={handleGenerateReport} className="secondary-button">
              Refresh Data
            </button>
            <PDFDownloadLink
              document={<ReportDocument data={reportData} />}
              fileName={`webbin-analytics-report-${new Date().toISOString().split('T')[0]}.pdf`}
            >
              {({ loading: pdfLoading }) => (
                <button className="primary-button" disabled={pdfLoading}>
                  {pdfLoading ? 'Preparing PDF...' : 'Download PDF'}
                </button>
              )}
            </PDFDownloadLink>
          </div>
        )}
      </div>

      <style>{`
        .reports-modal-overlay {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: rgba(0, 0, 0, 0.5);
          display: flex;
          align-items: center;
          justify-content: center;
          z-index: 1000;
          padding: 20px;
        }

        .reports-modal {
          background: white;
          border-radius: 16px;
          width: 100%;
          max-width: 1200px;
          max-height: 90vh;
          display: flex;
          flex-direction: column;
          box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04);
        }

        .reports-modal-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 24px;
          border-bottom: 1px solid #e5e7eb;
        }

        .reports-modal-header h2 {
          margin: 0;
          font-size: 1.5rem;
          font-weight: 700;
          color: #1f2937;
        }

        .close-button {
          background: none;
          border: none;
          font-size: 2rem;
          color: #6b7280;
          cursor: pointer;
          width: 40px;
          height: 40px;
          display: flex;
          align-items: center;
          justify-content: center;
          border-radius: 8px;
          transition: all 0.2s;
        }

        .close-button:hover {
          background: #f3f4f6;
          color: #1f2937;
        }

        .reports-view-toggle {
          display: flex;
          gap: 10px;
          padding: 0 24px;
          padding-top: 16px;
          border-bottom: 1px solid #e5e7eb;
        }

        .reports-view-toggle button {
          padding: 10px 20px;
          border: none;
          background: transparent;
          color: #6b7280;
          font-size: 0.875rem;
          font-weight: 500;
          cursor: pointer;
          border-bottom: 2px solid transparent;
          transition: all 0.2s;
        }

        .reports-view-toggle button:hover:not(:disabled) {
          color: #6366f1;
        }

        .reports-view-toggle button.active {
          color: #6366f1;
          border-bottom-color: #6366f1;
        }

        .reports-view-toggle button:disabled {
          opacity: 0.5;
          cursor: not-allowed;
        }

        .reports-modal-content {
          flex: 1;
          overflow: auto;
          padding: 0;
          min-height: 400px;
        }

        .reports-loading,
        .reports-error {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          height: 400px;
          gap: 16px;
        }

        .spinner {
          width: 40px;
          height: 40px;
          border: 4px solid #e5e7eb;
          border-top-color: #6366f1;
          border-radius: 50%;
          animation: spin 1s linear infinite;
        }

        @keyframes spin {
          to { transform: rotate(360deg); }
        }

        .reports-error {
          color: #dc2626;
        }

        .reports-error button {
          padding: 8px 16px;
          background: #6366f1;
          color: white;
          border: none;
          border-radius: 8px;
          cursor: pointer;
          font-weight: 500;
        }

        .reports-preview {
          background: #f9fafb;
          min-height: 100%;
        }

        .reports-pdf-viewer {
          padding: 20px;
          background: #f3f4f6;
        }

        .reports-modal-footer {
          display: flex;
          justify-content: flex-end;
          gap: 12px;
          padding: 20px 24px;
          border-top: 1px solid #e5e7eb;
          background: #f9fafb;
        }

        .primary-button,
        .secondary-button {
          padding: 10px 20px;
          border-radius: 8px;
          font-weight: 500;
          font-size: 0.875rem;
          cursor: pointer;
          transition: all 0.2s;
          border: none;
        }

        .primary-button {
          background: #6366f1;
          color: white;
        }

        .primary-button:hover:not(:disabled) {
          background: #4f46e5;
          transform: translateY(-1px);
          box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
        }

        .secondary-button {
          background: white;
          color: #374151;
          border: 1px solid #d1d5db;
        }

        .secondary-button:hover:not(:disabled) {
          background: #f9fafb;
          border-color: #9ca3af;
        }

        .primary-button:disabled,
        .secondary-button:disabled {
          opacity: 0.6;
          cursor: not-allowed;
        }
      `}</style>
    </div>
  );
};

export default ReportsModal;

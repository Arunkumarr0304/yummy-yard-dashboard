import { Table as BootstrapTable, Badge } from 'react-bootstrap';
import './Table.css';

export interface Column {
  key: string;
  label: string;
  className?: string;
  align?: 'left' | 'center' | 'right';
}

export interface TableProps {
  columns: Column[];
  children: React.ReactNode;
  emptyMessage?: string;
  loading?: boolean;
  className?: string;
}

export function Table({ 
  columns, 
  children, 
  emptyMessage = 'No data found',
  loading = false,
  className = ''
}: TableProps) {
  if (loading) {
    return (
      <div className="table-container">
        <div className="table-loading">Loading...</div>
      </div>
    );
  }

  return (
    <div className={`table-container ${className}`}>
      <div className="table-scroll-wrapper">
        <table className="custom-table">
          <thead>
            <tr>
              {columns.map((col) => (
                <th 
                  key={col.key} 
                  className={`${col.className || ''} ${col.align ? `text-${col.align}` : ''}`}
                  style={{ minWidth: col.key === 'action' ? '100px' : 'auto' }}
                >
                  {col.label}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {children}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Table;

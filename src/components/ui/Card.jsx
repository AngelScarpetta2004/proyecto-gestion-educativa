// src/components/ui/Card.jsx
export function Card({ children, title }) {
    return (
      <div className="bg-white shadow-md rounded-lg overflow-hidden">
        {title && (
          <div className="px-4 py-3 bg-gray-50 border-b">
            <h3 className="text-lg font-medium text-gray-900">{title}</h3>
          </div>
        )}
        <div className="p-4">{children}</div>
      </div>
    );
  }
  
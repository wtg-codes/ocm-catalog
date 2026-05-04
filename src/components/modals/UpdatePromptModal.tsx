import React, { useEffect, useState } from 'react';
import { AlertCircle, RotateCw, X } from 'lucide-react';

export const UpdatePromptModal: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [handlers, setHandlers] = useState<{
    onReload: () => void;
    onKeep: () => void;
  } | null>(null);

  useEffect(() => {
    const handleUpdateAvailable = (event: Event) => {
      const customEvent = event as CustomEvent;
      setHandlers(customEvent.detail);
      setIsOpen(true);
    };

    window.addEventListener('app-update-available', handleUpdateAvailable);
    return () =>
      window.removeEventListener('app-update-available', handleUpdateAvailable);
  }, []);

  if (!isOpen || !handlers) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-panel rounded-lg shadow-lg max-w-md w-full mx-4 border border-main">
        <div className="p-6">
          <div className="flex items-start gap-4">
            <div className="flex-shrink-0">
              <AlertCircle className="h-6 w-6 text-accent" />
            </div>
            <div className="flex-1">
              <h2 className="text-lg font-bold text-main mb-2">
                App Update Available
              </h2>
              <p className="text-muted text-sm mb-4">
                A new version of the application is available. Would you like to
                reload and use the latest version, or continue with your current
                session?
              </p>
              <div className="bg-muted rounded p-3 mb-4 text-xs text-muted">
                💡 <strong>Tip:</strong> Reload for the latest features and bug fixes. Your
                saved progress will be preserved.
              </div>
            </div>
          </div>

          <div className="flex gap-3 justify-end">
            <button
              onClick={() => {
                setIsOpen(false);
                handlers.onKeep();
              }}
              className="px-4 py-2 rounded-lg text-muted hover:text-main hover:bg-muted transition-colors font-medium"
            >
              <X className="inline mr-2" size={16} />
              Keep Current
            </button>
            <button
              onClick={() => {
                setIsOpen(false);
                handlers.onReload();
              }}
              className="accent-btn px-4 py-2 rounded-lg font-medium inline-flex items-center gap-2"
            >
              <RotateCw size={16} />
              Reload Now
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

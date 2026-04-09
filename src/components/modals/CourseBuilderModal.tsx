import React, { useState } from 'react';
import { Edit3, X, Plus, Trash2, Save, ChevronRight } from 'lucide-react';
import { Course, Lab } from '../../types';
import { useAppStore } from '../../store/useAppStore';
import { initialCoursesData, generateModuleSteps, generateLabSteps } from '../../data/mockData';

export const CourseBuilderModal: React.FC = () => {
  const { activeCourseId, setActiveCourseId } = useAppStore();

  // Local state for the builder since it's a "drafting" interface
  const initialEditingCourse = initialCoursesData.find(c => c.id === activeCourseId) || initialCoursesData[0];
  const [editingCourse, setEditingCourse] = useState<Course>(JSON.parse(JSON.stringify(initialEditingCourse)));
  const [isOpen, setIsOpen] = useState(false); // In a real app, this would be controlled by an 'edit' button

  if (!isOpen) {
    // Hidden by default in this refactor, but accessible for later phases
    return null;
  }

  const addModule = () => {
    const id = `mod-${Date.now()}`;
    setEditingCourse({
      ...editingCourse,
      labs: [...editingCourse.labs, {
        id,
        title: 'Module: New Presentation',
        description: 'A new video and slide deck review module.',
        icon: 'Presentation',
        stepsData: generateModuleSteps(id, 'New Presentation', 'Review the architectural concepts.')
      }]
    });
  };

  const addLab = () => {
    const id = `lab-${Date.now()}`;
    setEditingCourse({
      ...editingCourse,
      labs: [...editingCourse.labs, {
        id,
        title: 'Lab: New Hands-on Exercise',
        description: 'A new terminal-based execution lab.',
        icon: 'Terminal',
        stepsData: generateLabSteps(id, 'New Hands-on Exercise', 'Execute the assigned configuration tasks.')
      }]
    });
  };

  const removeLab = (idx: number) => {
    const newLabs = [...editingCourse.labs];
    newLabs.splice(idx, 1);
    setEditingCourse({ ...editingCourse, labs: newLabs });
  };

  const updateLab = (idx: number, field: keyof Lab, value: string) => {
    const newLabs = [...editingCourse.labs] as any;
    newLabs[idx][field] = value;
    setEditingCourse({ ...editingCourse, labs: newLabs });
  };

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4 sm:p-8 animate-in fade-in duration-200">
      <div className="bg-panel border border-main shadow-2xl rounded-2xl w-full max-w-4xl max-h-[90vh] overflow-hidden flex flex-col">

        <div className="flex items-center justify-between p-5 border-b border-main bg-muted">
          <h3 className="font-bold text-main flex items-center gap-2 text-lg">
            <Edit3 size={20} className="text-accent" /> Course Authoring Builder
          </h3>
          <button onClick={() => setIsOpen(false)} className="text-muted hover:text-accent transition-colors bg-base p-1.5 rounded-full border border-main">
            <X size={18} />
          </button>
        </div>

        <div className="p-6 overflow-y-auto flex-1 space-y-8 custom-scrollbar">
          <div className="space-y-4">
            <h4 className="font-bold text-main text-lg border-b border-main pb-2">Course Metadata</h4>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-bold text-muted mb-1 uppercase tracking-wide">Course Title</label>
                <input
                  type="text"
                  value={editingCourse.title}
                  onChange={(e) => setEditingCourse({...editingCourse, title: e.target.value})}
                  className="w-full bg-base border border-main rounded-lg p-3 text-main focus:outline-none focus:border-accent"
                />
              </div>
              <div>
                <label className="block text-sm font-bold text-muted mb-1 uppercase tracking-wide">Track Category</label>
                <input
                  type="text"
                  value={editingCourse.category}
                  onChange={(e) => setEditingCourse({...editingCourse, category: e.target.value})}
                  className="w-full bg-base border border-main rounded-lg p-3 text-main focus:outline-none focus:border-accent"
                />
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <div className="flex items-center justify-between border-b border-main pb-2">
              <h4 className="font-bold text-main text-lg">Curriculum Modules</h4>
              <div className="flex gap-2">
                <button onClick={addModule} className="text-xs font-bold uppercase tracking-widest bg-muted hover:bg-main hover:text-white px-3 py-1.5 rounded-lg border border-main transition-colors flex items-center gap-1.5">
                  <Plus size={14} /> Add Module
                </button>
                <button onClick={addLab} className="text-xs font-bold uppercase tracking-widest bg-muted hover:bg-main hover:text-white px-3 py-1.5 rounded-lg border border-main transition-colors flex items-center gap-1.5">
                  <Plus size={14} /> Add Lab
                </button>
              </div>
            </div>

            <div className="space-y-4">
              {editingCourse.labs.map((lab, idx) => (
                <div key={lab.id} className="bg-base border border-main rounded-xl p-5 group relative">
                  <button onClick={() => removeLab(idx)} className="absolute top-4 right-4 text-muted hover:text-red-500 opacity-0 group-hover:opacity-100 transition-opacity">
                    <Trash2 size={18} />
                  </button>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className="md:col-span-2 space-y-4">
                      <input
                        type="text"
                        value={lab.title}
                        onChange={(e) => updateLab(idx, 'title', e.target.value)}
                        className="w-full bg-panel border border-main rounded-lg p-2.5 font-bold text-main"
                        placeholder="Lab Title"
                      />
                      <textarea
                        value={lab.description}
                        onChange={(e) => updateLab(idx, 'description', e.target.value)}
                        className="w-full bg-panel border border-main rounded-lg p-2.5 text-sm text-muted h-20"
                        placeholder="Lab Description"
                      />
                    </div>
                    <div className="space-y-4">
                       <label className="block text-xs font-bold text-muted uppercase tracking-widest">Icon Hook</label>
                       <select
                        value={lab.icon}
                        onChange={(e) => updateLab(idx, 'icon', e.target.value)}
                        className="w-full bg-panel border border-main rounded-lg p-2.5 text-sm text-main"
                       >
                         <option value="Presentation">Presentation (Module)</option>
                         <option value="Terminal">Terminal (Lab)</option>
                         <option value="Monitor">Monitor</option>
                         <option value="Cloud">Cloud</option>
                       </select>
                       <div className="pt-4">
                         <span className="text-xs font-bold text-accent uppercase tracking-widest">{lab.stepsData.length} Steps Generated</span>
                       </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="p-6 border-t border-main bg-muted flex items-center justify-between">
          <p className="text-xs text-muted font-medium">Changes are only saved to the local session in this prototype.</p>
          <div className="flex gap-3">
            <button onClick={() => setIsOpen(false)} className="px-6 py-2.5 rounded-lg font-bold text-muted hover:text-main transition-colors uppercase tracking-widest text-xs">Cancel</button>
            <button onClick={() => setIsOpen(false)} className="accent-btn px-8 py-2.5 rounded-lg font-bold flex items-center gap-2 uppercase tracking-widest text-xs">
              <Save size={16} /> Save Track
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

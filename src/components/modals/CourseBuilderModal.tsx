import React, { useState } from 'react';
import { Edit3, X, Plus, Trash2, Save } from 'lucide-react';
import { Course, Lab } from '../../types';
import { useAppStore } from '../../store/useAppStore';
import { initialCoursesData, generateModuleSteps, generateLabSteps } from '../../data/mockData';

export const CourseBuilderModal: React.FC = () => {
  const { activeCourseId, isCourseBuilderOpen, setCourseBuilderOpen } = useAppStore();

  // Local state for the builder since it's a "drafting" interface
  const initialEditingCourse = initialCoursesData.find(c => c.id === activeCourseId) || initialCoursesData[0];
  const [editingCourse, setEditingCourse] = useState<Course>(JSON.parse(JSON.stringify(initialEditingCourse)));

  if (!isCourseBuilderOpen) return null;

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

  const updateLabField = <K extends keyof Lab>(idx: number, field: K, value: Lab[K]) => {
    const newLabs = [...editingCourse.labs];
    newLabs[idx] = { ...newLabs[idx], [field]: value };
    setEditingCourse({ ...editingCourse, labs: newLabs });
  };

  return (
    <div className="fixed inset-0 bg-black/40 backdrop-blur-md z-50 flex items-center justify-center p-4 sm:p-8 animate-in fade-in duration-300">
      <div className="bg-panel border border-main shadow-elevated rounded-lg w-full max-w-4xl max-h-[90vh] overflow-hidden flex flex-col animate-in zoom-in-95 duration-200">

        <div className="flex items-center justify-between px-6 py-4 border-b border-subtle bg-muted/30">
          <h3 className="font-black text-main flex items-center gap-3 text-sm uppercase tracking-widest">
            <Edit3 size={18} className="text-accent" /> Course Authoring
          </h3>
          <button
            onClick={() => setCourseBuilderOpen(false)}
            className="p-1.5 text-text-muted hover:text-main hover:bg-muted rounded-md transition-colors border border-subtle"
          >
            <X size={18} />
          </button>
        </div>

        <div className="p-8 overflow-y-auto flex-1 space-y-10 custom-scrollbar bg-panel">
          <div className="space-y-6">
            <div className="flex items-center gap-3">
               <div className="w-1 h-6 bg-accent rounded-full" />
               <h4 className="font-bold text-main text-base tracking-tight">Course Metadata</h4>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="block text-[10px] font-black text-text-muted uppercase tracking-widest">Course Title</label>
                <input
                  type="text"
                  value={editingCourse.title}
                  onChange={(e) => setEditingCourse({...editingCourse, title: e.target.value})}
                  className="w-full bg-muted/20 border border-subtle rounded-md p-3 text-sm text-main focus:outline-none focus:ring-1 focus:ring-accent/50 focus:border-accent/50 transition-all"
                />
              </div>
              <div className="space-y-2">
                <label className="block text-[10px] font-black text-text-muted uppercase tracking-widest">Track Category</label>
                <input
                  type="text"
                  value={editingCourse.category}
                  onChange={(e) => setEditingCourse({...editingCourse, category: e.target.value})}
                  className="w-full bg-muted/20 border border-subtle rounded-md p-3 text-sm text-main focus:outline-none focus:ring-1 focus:ring-accent/50 focus:border-accent/50 transition-all"
                />
              </div>
            </div>
          </div>

          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                 <div className="w-1 h-6 bg-accent rounded-full" />
                 <h4 className="font-bold text-main text-base tracking-tight">Curriculum Modules</h4>
              </div>
              <div className="flex gap-2">
                <button onClick={addModule} className="text-[10px] font-black uppercase tracking-widest bg-panel hover:bg-muted text-main px-3 py-2 rounded-md border border-subtle transition-all flex items-center gap-2 active:scale-95 shadow-sm">
                  <Plus size={14} /> Module
                </button>
                <button onClick={addLab} className="text-[10px] font-black uppercase tracking-widest bg-panel hover:bg-muted text-main px-3 py-2 rounded-md border border-subtle transition-all flex items-center gap-2 active:scale-95 shadow-sm">
                  <Plus size={14} /> Lab
                </button>
              </div>
            </div>

            <div className="space-y-3">
              {editingCourse.labs.map((lab, idx) => (
                <div key={lab.id} className="bg-muted/10 border border-subtle rounded-md p-5 group relative hover:border-accent/20 transition-colors">
                  <button onClick={() => removeLab(idx)} className="absolute top-4 right-4 p-2 text-text-muted hover:text-red-500 opacity-0 group-hover:opacity-100 transition-opacity rounded-md hover:bg-red-50 dark:hover:bg-red-950/20">
                    <Trash2 size={16} />
                  </button>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className="md:col-span-2 space-y-4">
                      <input
                        type="text"
                        value={lab.title}
                        onChange={(e) => updateLabField(idx, 'title', e.target.value)}
                        className="w-full bg-panel border border-subtle rounded-md p-2.5 text-sm font-bold text-main focus:outline-none focus:border-accent/40"
                        placeholder="Lab Title"
                      />
                      <textarea
                        value={lab.description}
                        onChange={(e) => updateLabField(idx, 'description', e.target.value)}
                        className="w-full bg-panel border border-subtle rounded-md p-2.5 text-xs text-text-muted h-20 focus:outline-none focus:border-accent/40 resize-none"
                        placeholder="Lab Description"
                      />
                    </div>
                    <div className="space-y-4">
                       <label className="block text-[10px] font-black text-text-muted uppercase tracking-widest">Icon</label>
                       <select
                        value={lab.icon}
                        onChange={(e) => updateLabField(idx, 'icon', e.target.value)}
                        className="w-full bg-panel border border-subtle rounded-md p-2.5 text-xs text-main focus:outline-none focus:border-accent/40 appearance-none"
                       >
                         <option value="Presentation">Presentation</option>
                         <option value="Terminal">Terminal</option>
                         <option value="Monitor">Monitor</option>
                         <option value="Cloud">Cloud</option>
                       </select>
                       <div className="flex items-center gap-2 px-1">
                         <div className="w-1.5 h-1.5 bg-accent rounded-full" />
                         <span className="text-[10px] font-black text-accent uppercase tracking-widest">{lab.stepsData.length} Steps</span>
                       </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="px-8 py-5 border-t border-subtle bg-muted/20 flex items-center justify-between">
          <p className="text-[10px] text-text-muted font-bold uppercase tracking-widest opacity-60">Internal Drafting Mode</p>
          <div className="flex gap-2">
            <button onClick={() => setCourseBuilderOpen(false)} className="px-4 py-2.5 rounded-md font-bold text-text-muted hover:text-main transition-colors uppercase tracking-widest text-[10px] active:scale-95">Cancel</button>
            <button onClick={() => setCourseBuilderOpen(false)} className="accent-btn px-6 py-2.5 rounded-md font-bold flex items-center gap-2 uppercase tracking-widest text-[10px] active:scale-95 shadow-sm">
              <Save size={14} /> Commit Changes
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

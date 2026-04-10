import React, { useState, useEffect } from 'react';
import { Edit3, X, Plus, Trash2, Save } from 'lucide-react';
import { Course, Lab } from '../../types';
import { useAppStore } from '../../store/useAppStore';
import { generateModuleSteps, generateLabSteps } from '../../data/mockData';
import { DynamicIcon } from '../../utils/iconRegistry';

export const CourseBuilderModal: React.FC = () => {
  const {
    activeCourseId,
    isCourseBuilderOpen,
    setCourseBuilderOpen,
    courses,
    addCourse,
    updateCourse,
    deleteCourse
  } = useAppStore();

  const [editingCourse, setEditingCourse] = useState<Course | null>(null);

  useEffect(() => {
    if (isCourseBuilderOpen) {
      const existing = courses.find(c => c.id === activeCourseId);
      if (existing) {
        setEditingCourse(JSON.parse(JSON.stringify(existing)));
      } else {
        setEditingCourse({
          id: `course-${Date.now()}`,
          category: 'New Category',
          courseNumber: 'NEW-100',
          status: 'draft',
          title: 'New Course',
          description: 'Describe the outcome and goal of this learning path.',
          icon: 'Cloud',
          labs: []
        });
      }
    } else {
      setEditingCourse(null);
    }
  }, [isCourseBuilderOpen, activeCourseId, courses]);

  if (!isCourseBuilderOpen || !editingCourse) return null;

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

  const handleSave = () => {
    const exists = courses.find(c => c.id === editingCourse.id);
    if (exists) {
      updateCourse(editingCourse);
    } else {
      addCourse(editingCourse);
    }
    setCourseBuilderOpen(false);
  };

  const handleDelete = () => {
    if (window.confirm("Are you sure you want to delete this course?")) {
      deleteCourse(editingCourse.id);
      setCourseBuilderOpen(false);
    }
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
              <div>
                <label className="block text-sm font-bold text-muted mb-1 uppercase tracking-wide">Category</label>
                <input
                  type="text"
                  value={editingCourse.category}
                  onChange={(e) => setEditingCourse({...editingCourse, category: e.target.value})}
                  className="w-full bg-base border border-main rounded-lg p-3 text-main focus:outline-none focus:border-accent"
                  placeholder="e.g. Developer & Engineering"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-bold text-muted mb-1 uppercase tracking-wide">Course Number</label>
                <input
                  type="text"
                  value={editingCourse.courseNumber}
                  onChange={(e) => setEditingCourse({...editingCourse, courseNumber: e.target.value})}
                  className="w-full bg-base border border-main rounded-lg p-3 text-main focus:outline-none focus:border-accent"
                  placeholder="e.g. DEV-400"
                />
              </div>
              <div>
                <label className="block text-sm font-bold text-muted mb-1 uppercase tracking-wide">Status</label>
                <select
                  value={editingCourse.status}
                  onChange={(e) => setEditingCourse({...editingCourse, status: e.target.value as any})}
                  className="w-full bg-base border border-main rounded-lg p-3 text-main focus:outline-none focus:border-accent appearance-none"
                >
                  <option value="published">Published</option>
                  <option value="draft">Draft</option>
                </select>
              </div>
            </div>

            <div>
              <label className="block text-sm font-bold text-muted mb-1 uppercase tracking-wide">Description</label>
              <textarea
                value={editingCourse.description}
                onChange={(e) => setEditingCourse({...editingCourse, description: e.target.value})}
                className="w-full bg-base border border-main rounded-lg p-3 text-main h-24 focus:outline-none focus:border-accent"
              />
            </div>

            <div>
              <label className="block text-sm font-bold text-muted mb-2 uppercase tracking-wide">Course Icon</label>
              <div className="flex flex-wrap gap-3">
                {['Cloud', 'Terminal', 'Monitor', 'Lightbulb', 'Key', 'Zap', 'Presentation', 'FileCode2'].map(i => (
                  <button
                    key={i}
                    onClick={() => setEditingCourse({...editingCourse, icon: i})}
                    className={`p-3 rounded-lg border transition-all ${editingCourse.icon === i ? 'border-accent bg-accent-muted text-accent shadow-sm' : 'border-main text-muted hover:border-accent hover:text-accent bg-base'}`}
                  >
                    <DynamicIcon name={i} size={24} />
                  </button>
                ))}
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <div className="flex items-center justify-between border-b border-main pb-2">
              <h4 className="font-bold text-main text-lg">Curriculum</h4>
              <div className="flex gap-2">
                <button onClick={addModule} className="text-xs font-bold bg-base border border-main hover:border-accent text-muted hover:text-accent px-3 py-1.5 rounded flex items-center gap-1 transition-colors">
                  <Plus size={14}/> Add Module
                </button>
                <button onClick={addLab} className="text-xs font-bold bg-base border border-main hover:border-accent text-muted hover:text-accent px-3 py-1.5 rounded flex items-center gap-1 transition-colors">
                  <Plus size={14}/> Add Lab
                </button>
              </div>
            </div>

            {editingCourse.labs.length === 0 ? (
              <div className="text-center py-10 border-2 border-dashed border-main rounded-xl">
                <p className="text-muted font-medium">No curriculum items yet. Add a Module or Lab to begin.</p>
              </div>
            ) : (
              <div className="space-y-4">
                {editingCourse.labs.map((lab, index) => (
                  <div key={lab.id} className="bg-base border border-main rounded-xl p-4 flex gap-4">
                    <div className="mt-1 bg-muted p-2 rounded border border-main text-muted shrink-0 h-fit">
                      <DynamicIcon name={lab.icon} size={20} />
                    </div>
                    <div className="flex-1 space-y-3">
                      <input
                        type="text"
                        value={lab.title}
                        onChange={(e) => updateLabField(index, 'title', e.target.value)}
                        className="w-full bg-panel border border-main rounded p-2 text-sm font-bold text-main focus:outline-none focus:border-accent"
                        placeholder="Module / Lab Title"
                      />
                      <textarea
                        value={lab.description}
                        onChange={(e) => updateLabField(index, 'description', e.target.value)}
                        className="w-full bg-panel border border-main rounded p-2 text-sm text-main h-20 focus:outline-none focus:border-accent"
                        placeholder="Short description..."
                      />
                    </div>
                    <button onClick={() => removeLab(index)} className="text-muted hover:text-red-500 shrink-0 self-start p-2"><Trash2 size={18}/></button>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        <div className="p-5 border-t border-main bg-muted flex justify-between items-center">
          <button
            onClick={handleDelete}
            className="text-red-500 hover:text-red-600 font-bold text-sm flex items-center gap-1 transition-colors"
          >
            <Trash2 size={16}/> Delete Course
          </button>
          <div className="flex gap-3">
            <button
              onClick={() => setCourseBuilderOpen(false)}
              className="px-6 py-2.5 rounded-lg text-sm font-bold uppercase tracking-wide border border-main text-muted hover:text-main bg-base transition-colors"
            >
              Cancel
            </button>
            <button
              onClick={handleSave}
              className="accent-btn px-6 py-2.5 rounded-lg text-sm font-bold uppercase tracking-wide flex items-center gap-2"
            >
              <Save size={16}/> Save Course
            </button>
          </div>
        </div>

      </div>
    </div>
  );
};

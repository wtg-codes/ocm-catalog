import React from 'react';
import { X, Award, CheckCircle2 } from 'lucide-react';
import { useAppStore } from '../../store/useAppStore';
import { getTrackProgress, getCourseProgress } from '../../utils/courseUtils';
import { Track, Course } from '../../types';

export const ProfileModal: React.FC = () => {
  const {
    isProfileOpen,
    setProfileOpen,
    enrolledTrackIds,
    completedStepIds,
    tracks
  } = useAppStore();

  if (!isProfileOpen) return null;

  // Gather completed items based on progress
  const completedTracks: Track[] = [];
  const completedCourses: Course[] = [];

  enrolledTrackIds.forEach(trackId => {
    const track = tracks.find((t: any) => t.id === trackId);
    if (track) {
      if (getTrackProgress(track, completedStepIds) === 100) {
        completedTracks.push(track);
      }
      track.courses.forEach((course: any) => {
        if (getCourseProgress(course, completedStepIds) === 100) {
          completedCourses.push(course);
        }
      });
    }
  });

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="bg-panel w-full max-w-2xl rounded-2xl border border-main shadow-2xl overflow-hidden flex flex-col max-h-[90vh]">
        <div className="px-6 py-4 border-b border-main flex items-center justify-between bg-muted/50">
          <h2 className="text-xl font-bold text-main flex items-center gap-2">
            <Award className="text-accent" />
            My Profile & Achievements
          </h2>
          <button
            onClick={() => setProfileOpen(false)}
            className="p-2 hover:bg-base rounded-md text-muted hover:text-main transition-colors"
          >
            <X size={20} />
          </button>
        </div>

        <div className="p-6 overflow-y-auto flex-1 space-y-8">
          <div>
            <h3 className="text-lg font-bold text-main mb-4 border-b border-subtle pb-2">Completed Tracks</h3>
            {completedTracks.length === 0 ? (
              <p className="text-sm text-muted italic">No completed tracks yet.</p>
            ) : (
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                {completedTracks.map((track: any) => (
                  <div key={track.id} className="bg-base border border-accent rounded-xl p-4 flex flex-col items-center text-center shadow-sm relative overflow-hidden group">
                    <div className="absolute inset-0 bg-gradient-to-b from-accent/10 to-transparent opacity-50 pointer-events-none" />
                    <Award size={36} className="text-accent mb-2 group-hover:scale-110 transition-transform" />
                    <span className="text-xs font-bold text-main uppercase tracking-tight">{track.title}</span>
                    <span className="text-[10px] text-muted mt-1">Track Badge</span>
                  </div>
                ))}
              </div>
            )}
          </div>

          <div>
            <h3 className="text-lg font-bold text-main mb-4 border-b border-subtle pb-2">Completed Courses</h3>
            {completedCourses.length === 0 ? (
              <p className="text-sm text-muted italic">No completed courses yet.</p>
            ) : (
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                {completedCourses.map((course: any) => (
                  <div key={course.id} className="bg-muted border border-main rounded-xl p-4 flex flex-col items-center text-center shadow-sm relative overflow-hidden group">
                    <CheckCircle2 size={32} className="text-green-500 mb-2 group-hover:scale-110 transition-transform" />
                    <span className="text-xs font-bold text-main uppercase tracking-tight">{course.title}</span>
                    <span className="text-[10px] text-muted mt-1">Course Badge</span>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        <div className="px-6 py-4 border-t border-main bg-base flex justify-end">
          <button
            onClick={() => setProfileOpen(false)}
            className="px-4 py-2 bg-muted hover:bg-panel text-main rounded-lg font-bold text-sm border border-main transition-colors"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

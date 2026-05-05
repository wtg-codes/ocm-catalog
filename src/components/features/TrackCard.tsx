import React from 'react';
import { ChevronRight, PlusCircle, CheckCircle2, Edit3, Trash2 } from 'lucide-react';
import { Track } from '../../types';
import { useAppStore } from '../../store/useAppStore';
import { DynamicIcon } from '../../utils/iconRegistry';
import { getTrackProgress } from '../../utils/courseUtils';

interface TrackCardProps {
  track: Track;
}

export const TrackCard: React.FC<TrackCardProps> = ({ track }) => {
  const {
    enrolledTrackIds,
    startTrack,
    enrollTrack,
    unenrollTrack,
    completedStepIds,
    viewMode,
    portalTab,
    setCourseBuilderOpen,
    setActiveTrackId
  } = useAppStore();

  const isEnrolled = enrolledTrackIds.includes(track.id);
  const progress = getTrackProgress(track, completedStepIds);
  const isComplete = progress === 100;
  const isDraft = track.status === 'draft';

  const handleEditTrack = (e: React.MouseEvent) => {
    e.stopPropagation();
    setActiveTrackId(track.id);
    setCourseBuilderOpen(true);
  };

  const handleUnenroll = (e: React.MouseEvent) => {
    e.stopPropagation();
    unenrollTrack(track.id);
  };

  if (viewMode === 'list') {
    return (
      <div className="bg-panel rounded-2xl border border-main shadow-sm hover:shadow-md hover:border-accent transition-all overflow-hidden flex flex-col md:flex-row group relative cursor-pointer"
           onClick={() => startTrack(track.id)}>
        {portalTab === 'catalog' && (
          <button
            onClick={handleEditTrack}
            className="absolute top-4 right-4 z-10 p-2 bg-base rounded-lg border border-main text-muted hover:text-accent hover:border-accent opacity-0 group-hover:opacity-100 transition-all shadow-sm"
            title="Edit Track Content"
          >
            <Edit3 size={16} />
          </button>
        )}
        {portalTab === 'my-courses' && isEnrolled && (
          <button
            onClick={handleUnenroll}
            className="absolute top-4 right-4 z-10 p-2 bg-base rounded-lg border border-main text-muted hover:text-red-500 hover:border-red-500 opacity-0 group-hover:opacity-100 transition-all shadow-sm"
            title="Unenroll from Track"
          >
            <Trash2 size={16} />
          </button>
        )}
        <div className="p-6 flex-1 flex flex-col md:flex-row gap-6 items-start md:items-center">
          <div className={`p-4 rounded-xl shrink-0 transition-colors ${isComplete ? 'bg-accent-muted text-accent' : 'bg-muted text-main group-hover:bg-accent group-hover:text-accent-fg'}`}>
            <DynamicIcon name={track.icon} size={32} />
          </div>
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-1">
              <span className="text-xs font-bold text-muted uppercase tracking-widest">{track.trackNumber || 'Track'}</span>
              {isDraft && <span className="bg-amber-500/10 text-amber-600 border border-amber-500/20 text-[10px] font-bold px-2 py-0.5 rounded uppercase tracking-widest">Draft</span>}
            </div>
            <h3 className="text-xl font-bold text-main mb-2 tracking-tight">{track.title}</h3>
            <p className="text-sm text-muted line-clamp-2 leading-relaxed max-w-2xl font-medium">{track.description}</p>
          </div>
        </div>
        <div className="p-6 border-t md:border-t-0 md:border-l border-main bg-base w-full md:w-64 flex flex-col justify-center shrink-0 gap-4">
          <div>
            <div className="flex justify-between text-xs text-muted font-bold uppercase tracking-wider mb-2">
              <span>{track.courses?.length || 0} Courses</span>
              {isEnrolled && <span className="text-accent">{Math.round(progress)}%</span>}
            </div>
            <div className="w-full bg-muted h-2 rounded-full overflow-hidden border border-main">
              <div
                className={`h-full transition-all duration-500 bg-accent`}
                style={{ width: `${isEnrolled ? progress : 0}%` }}
              />
            </div>
          </div>
          {isEnrolled ? (
            <button
              className="flex w-full items-center justify-between text-sm font-bold text-main group-hover:text-accent uppercase tracking-wide bg-panel border border-main rounded-lg px-4 py-2 hover:border-accent transition-colors"
            >
              <span>{isComplete ? 'Review' : progress > 0 ? 'Resume' : 'Start'}</span>
              <ChevronRight size={16} className="group-hover:translate-x-1 transition-transform" />
            </button>
          ) : (
            <button
              onClick={(e) => {
                e.stopPropagation();
                enrollTrack(track.id);
              }}
              className="flex w-full items-center justify-center gap-2 accent-btn py-2 rounded-lg text-sm font-bold uppercase tracking-wide transition-colors"
            >
              <PlusCircle size={16} /> Assign to Me
            </button>
          )}
        </div>
      </div>
    );
  }

  return (
    <div
      onClick={() => startTrack(track.id)}
      className="bg-panel rounded-2xl border border-main shadow-sm hover:shadow-xl transition-all group overflow-hidden flex flex-col relative h-full cursor-pointer"
    >
      {/* Editor Access */}
      {portalTab === 'catalog' && (
          <button
            onClick={handleEditTrack}
            className="absolute top-4 right-4 z-10 p-2 bg-base rounded-lg border border-main text-muted hover:text-accent hover:border-accent opacity-0 group-hover:opacity-100 transition-all shadow-sm"
            title="Edit Track Content"
          >
            <Edit3 size={16} />
          </button>
      )}

      {portalTab === 'my-courses' && isEnrolled && (
          <button
            onClick={handleUnenroll}
            className="absolute top-4 right-4 z-10 p-2 bg-base rounded-lg border border-main text-muted hover:text-red-500 hover:border-red-500 opacity-0 group-hover:opacity-100 transition-all shadow-sm"
            title="Unenroll from Track"
          >
            <Trash2 size={16} />
          </button>
      )}

      <div className="p-8 flex-1">
        <div className="flex items-start justify-between mb-6">
          <div className={`p-4 rounded-xl transition-colors ${isComplete ? 'bg-accent-muted text-accent' : 'bg-muted text-accent border border-main group-hover:bg-accent group-hover:text-accent-fg group-hover:scale-110 transition-all duration-300'}`}>
            <DynamicIcon name={track.icon} size={32} />
          </div>
          <div className="flex flex-col gap-2 items-end">
            {isDraft && <span className="bg-amber-500/10 text-amber-600 border border-amber-500/20 text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wide">Draft</span>}
            {isComplete && <span className="bg-accent text-accent-fg text-xs font-bold px-3 py-1 rounded-full flex items-center gap-1 uppercase tracking-wide shadow-accent"><CheckCircle2 size={12}/> Completed</span>}
            {!isEnrolled && !isComplete && <span className="bg-accent text-accent-fg text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wide shadow-accent">New</span>}
          </div>
        </div>
        <div className="text-[10px] font-black uppercase tracking-widest px-2.5 py-1 bg-muted text-muted rounded-full border border-main inline-block mb-3">
          {track.trackNumber}
        </div>
        <h3 className="text-xl font-bold text-main mb-2 leading-tight tracking-tight group-hover:text-accent transition-colors">
          {track.title}
        </h3>
        <p className="text-sm text-muted leading-relaxed line-clamp-3 font-medium opacity-80">
          {track.description}
        </p>
      </div>

      <div className="px-8 pb-6 shrink-0">
        <div className="flex justify-between text-xs text-muted font-bold uppercase tracking-wider mb-2">
          <span>{track.courses?.length || 0} Courses</span>
          {isEnrolled && <span className="text-accent">{Math.round(progress)}%</span>}
        </div>
        <div className="w-full bg-muted h-2 rounded-full overflow-hidden border border-main">
          <div
            className={`h-full transition-all duration-500 bg-accent`}
            style={{ width: `${isEnrolled ? progress : 0}%` }}
          />
        </div>
      </div>

      <div className="p-5 border-t border-main bg-base shrink-0">
        {isEnrolled ? (
          <button
            className="flex w-full items-center justify-between text-sm font-bold text-main group-hover:text-accent uppercase tracking-wide"
          >
            <span>{isComplete ? 'Review Track' : progress > 0 ? 'Resume Track' : 'Start Track'}</span>
            <ChevronRight size={18} className="group-hover:translate-x-1 transition-transform" />
          </button>
        ) : (
          <button
            onClick={(e) => {
              e.stopPropagation();
              enrollTrack(track.id);
            }}
            className="flex w-full items-center justify-center gap-2 accent-btn py-3 rounded-lg font-bold uppercase tracking-wide transition-colors"
          >
            <PlusCircle size={18} /> Assign to Me
          </button>
        )}
      </div>

      {/* Subtle indicator for enrolled tracks */}
      {isEnrolled && (
        <div className="absolute top-0 right-0 p-1">
          <div className="w-2 h-2 bg-accent rounded-full animate-pulse shadow-accent" />
        </div>
      )}
    </div>
  );
};

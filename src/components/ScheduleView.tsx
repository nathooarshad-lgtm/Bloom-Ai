import React, { useEffect, useState } from 'react';
import { ScheduleBlock } from '../types';
import { dateUtils } from '../utils';

interface ScheduleViewProps {
  blocks: ScheduleBlock[];
  onToggleBlock: (id: string) => void;
  onAddBlock: (block: Omit<ScheduleBlock, 'id'>) => void;
  onDeleteBlock: (id: string) => void;
}

export const ScheduleView: React.FC<ScheduleViewProps> = ({
  blocks,
  onToggleBlock,
  onAddBlock,
  onDeleteBlock,
}) => {
  const [currentTime, setCurrentTime] = useState(dateUtils.getCurrentTime());
  const [showAddForm, setShowAddForm] = useState(false);
  const [newBlock, setNewBlock] = useState<{
    title: string;
    startTime: string;
    endTime: string;
    category: ScheduleBlock['category'];
  }>({
    title: '',
    startTime: '10:00',
    endTime: '11:00',
    category: 'work',
  });

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(dateUtils.getCurrentTime());
    }, 60000);
    return () => clearInterval(timer);
  }, []);

  const sortedBlocks = [...blocks].sort((a, b) => a.startTime.localeCompare(b.startTime));
  const activeBlock = sortedBlocks.find((b) =>
    dateUtils.isTimeInRange(currentTime, b.startTime, b.endTime)
  );

  const handleAddBlock = () => {
    if (newBlock.title.trim()) {
      onAddBlock({
        ...newBlock,
        completed: false,
      });
      setNewBlock({
        title: '',
        startTime: '10:00',
        endTime: '11:00',
        category: 'work',
      });
      setShowAddForm(false);
    }
  };

  const categoryEmoji = {
    study: '📚',
    work: '💼',
    exercise: '💪',
    rest: '🛌',
    personal: '👤',
    meal: '🍽️',
  };

  const categoryColor = {
    study: 'from-blue-100 to-blue-50 border-blue-300',
    work: 'from-purple-100 to-purple-50 border-purple-300',
    exercise: 'from-orange-100 to-orange-50 border-orange-300',
    rest: 'from-pink-100 to-pink-50 border-pink-300',
    personal: 'from-green-100 to-green-50 border-green-300',
    meal: 'from-yellow-100 to-yellow-50 border-yellow-300',
  };

  return (
    <div className="h-full flex flex-col">
      <h2 className="text-xl sm:text-2xl font-bold text-gray-800 mb-3 sm:mb-4">📅 Today's Schedule</h2>

      <div className="flex-1 overflow-y-auto space-y-2 mb-4 pr-1 sm:pr-0">
        {sortedBlocks.map((block) => (
          <div
            key={block.id}
            className={`p-4 rounded-lg border-2 transition-all ${
              activeBlock?.id === block.id
                ? `bg-gradient-to-r from-teal-100 to-teal-50 border-teal-500 ring-2 ring-teal-300 shadow-lg`
                : `bg-gradient-to-r ${categoryColor[block.category]} ${
                    block.completed ? 'opacity-50' : ''
                  }`
            }`}
          >
            <div className="flex items-start justify-between gap-2">
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-lg sm:text-xl flex-shrink-0">{categoryEmoji[block.category]}</span>
                  <h3
                    className={`font-semibold text-sm sm:text-base text-gray-800 truncate ${block.completed ? 'line-through' : ''}`}
                  >
                    {block.title}
                  </h3>
                </div>
                <p className="text-xs sm:text-sm text-gray-600">
                  {dateUtils.formatTime(block.startTime)} - {dateUtils.formatTime(block.endTime)}
                </p>
              </div>
              <div className="flex gap-2 ml-2 flex-shrink-0">
                <button
                  onClick={() => onToggleBlock(block.id)}
                  className={`w-8 h-8 sm:w-10 sm:h-10 rounded-full border-2 flex items-center justify-center transition-all active:scale-95 ${
                    block.completed
                      ? 'bg-teal-500 border-teal-500 text-white'
                      : 'border-gray-400 hover:border-teal-500'
                  }`}
                >
                  {block.completed && '✓'}
                </button>
                <button
                  onClick={() => onDeleteBlock(block.id)}
                  className="text-red-500 hover:text-red-700 transition-colors active:scale-95 p-1"
                  title="Delete"
                >
                  🗑️
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Add Block Form */}
      {showAddForm && (
        <div className="border-t pt-3 sm:pt-4 space-y-2 sm:space-y-3 bg-gray-50 p-3 sm:p-4 rounded-lg slide-in">
          <input
            type="text"
            placeholder="Activity name"
            value={newBlock.title}
            onChange={(e) => setNewBlock({ ...newBlock, title: e.target.value })}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 text-sm focus:border-transparent"
            autoFocus
          />
          <div className="grid grid-cols-2 gap-2">
            <input
              type="time"
              value={newBlock.startTime}
              onChange={(e) => setNewBlock({ ...newBlock, startTime: e.target.value })}
              className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 text-sm focus:border-transparent"
            />
            <input
              type="time"
              value={newBlock.endTime}
              onChange={(e) => setNewBlock({ ...newBlock, endTime: e.target.value })}
              className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 text-sm focus:border-transparent"
            />
          </div>
          <select
            value={newBlock.category}
            onChange={(e) =>
              setNewBlock({
                ...newBlock,
                category: e.target.value as ScheduleBlock['category'],
              })
            }
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 text-sm focus:border-transparent"
          >
            <option value="study">Study</option>
            <option value="work">Work</option>
            <option value="exercise">Exercise</option>
            <option value="rest">Rest</option>
            <option value="personal">Personal</option>
            <option value="meal">Meal</option>
          </select>
          <div className="flex gap-2">
            <button
              onClick={handleAddBlock}
              className="flex-1 px-3 py-2 bg-teal-500 text-white rounded-lg hover:bg-teal-600 transition-colors text-sm font-semibold active:bg-teal-700 min-h-[44px] flex items-center justify-center"
            >
              Add
            </button>
            <button
              onClick={() => setShowAddForm(false)}
              className="flex-1 px-3 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-100 transition-colors text-sm active:bg-gray-200 min-h-[44px] flex items-center justify-center"
            >
              Cancel
            </button>
          </div>
        </div>
      )}

      {!showAddForm && (
        <button
          onClick={() => setShowAddForm(true)}
          className="w-full px-4 py-2 sm:py-3 border-2 border-dashed border-teal-300 text-teal-600 rounded-lg hover:bg-teal-50 transition-colors font-semibold active:bg-teal-100 min-h-[44px] flex items-center justify-center gap-2"
        >
          + Add Custom Block
        </button>
      )}
    </div>
  );
};

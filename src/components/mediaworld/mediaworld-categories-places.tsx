import { MEDIA_WORLD_CATEGORY_LABELS, MEDIAWORLD_DIVISIONS, DISTRICTS_BY_DIVISION, type MediaWorldDivision, type MediaWorldCategory } from '@/lib/mediaworld';

export function MediaWorldCategoryList({
  selectedCategory,
  onCategoryChange,
}: {
  selectedCategory: MediaWorldCategory;
  onCategoryChange: (category: MediaWorldCategory) => void;
}) {
  return (
    <div className="grid grid-cols-2 gap-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6">
      {MEDIA_WORLD_CATEGORY_LABELS[selectedCategory] ? (
        <div className='fb-card surface'>
          <div className='flex items-center justify-between'>
            <span className='text-xs font-semibold text-[#e4e6eb]'>Categories</span>
            <span className='text-xs text-[#b0b3b8]'>{MEDIA_WORLD_CATEGORY_LABELS[selectedCategory]}</span>
          </div>
          <div className='mt-1 grid grid-cols-2 gap-1'>
            {(Object.entries(MEDIA_WORLD_CATEGORY_LABELS) as [MediaWorldCategory, string][])
              .map(([key, value]) => (
                <button
                  key={key}
                  type='button'
                  className={`rounded px-2 py-1 text-xs transition ${selectedCategory === key ? 'bg-[#2d88ff]/20 text-[#2d88ff]' : 'bg-[#1e1f22] text-[#b0b3b8] hover:bg-[#2a2c30]'}`}
                  onClick={() => onCategoryChange(key as MediaWorldCategory)}
                >
                  {value}
                </button>
              ))}
          </div>
        </div>
      ) : null}
      {MEDIA_WORLD_CATEGORY_LABELS[selectedCategory] ? null : (
        <div className='fb-card surface'>
          <div className='flex items-center justify-between'>
            <span className='text-xs font-semibold text-[#e4e6eb]'>Categories</span>
            <span className='text-xs text-[#b0b3b8]'>None selected</span>
          </div>
          <div className='mt-1 grid grid-cols-2 gap-1'>
            {(Object.entries(MEDIA_WORLD_CATEGORY_LABELS) as [MediaWorldCategory, string][]).map(([key, value]) => (
              <button
                key={key}
                type='button'
                className={`rounded px-2 py-1 text-xs transition ${selectedCategory === key ? 'bg-[#2d88ff]/20 text-[#2d88ff]' : 'bg-[#1e1f22] text-[#b0b3b8] hover:bg-[#2a2c30]'}`}
                onClick={() => onCategoryChange(key as MediaWorldCategory)}
              >
                {value}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

export function MediaWorldDivisionList({
  selectedDivision,
  onDivisionChange,
}: {
  selectedDivision: string;
  onDivisionChange: (division: string) => void;
}) {
  return (
    <div className='fb-card surface'>
      <div className='flex items-center justify-between'>
        <span className='text-xs font-semibold text-[#e4e6eb]'>Divisions</span>
        <span className='text-xs text-[#b0b3b8]'>{selectedDivision || 'All divisions'}</span>
      </div>
      <div className='mt-1 flex flex-wrap gap-1'>
        {MEDIAWORLD_DIVISIONS.map((division) => (
          <button
            key={division}
            type='button'
            className={`rounded px-2 py-1 text-xs transition ${selectedDivision === division ? 'bg-[#2d88ff]/20 text-[#2d88ff]' : 'bg-[#1e1f22] text-[#b0b3b8] hover:bg-[#2a2c30]'}`}
            onClick={() => onDivisionChange(division)}
          >
            {division}
          </button>
        ))}
      </div>
      <div className='mt-2'>
        <span className='text-xs font-medium text-[#b0b3b8]'>Districts in {selectedDivision || 'All divisions'}</span>
        <div className='mt-1 flex flex-wrap gap-1'>
          {DISTRICTS_BY_DIVISION[selectedDivision as MediaWorldDivision]?.map((district) => (
            <button
              key={district}
              type='button'
              className='rounded px-2 py-1 text-xs text-[#b0b3b8] bg-[#1e1f22] hover:bg-[#2a2c30]'
              onClick={() => onDivisionChange(district)}
            >
              {district}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

'use client';

const stories = [
  { name: 'Create story', badge: 'RM', palette: 'create-story' },
  { name: 'Anisha', badge: 'A', palette: 'story-coral' },
  { name: 'Nusrat', badge: 'N', palette: 'story-lilac' },
  { name: 'Arafin', badge: 'A', palette: 'story-teal' },
  { name: 'Sana', badge: 'S', palette: 'story-rose' },
  { name: 'Vanya', badge: 'V', palette: 'story-amber' },
];

export default function StoryRail({ profileImage }: { profileImage?: string | null }) {
  return (
    <section className='stories' aria-label='Stories'>
      {stories.map((story, index) => {
        const isCreate = index === 0;
        return (
          <button
            key={story.name}
            type='button'
            className={`story-card ${story.palette}`}
            aria-label={isCreate ? 'Create story' : `Open ${story.name}'s story`}
            data-testid={isCreate ? 'button-create-story' : `story-${story.name.toLowerCase()}`}
          >
            {isCreate ? (
              <>
                <span className='story-create-art' aria-hidden='true' />
                <span className='avatar avatar-robin story-create-avatar' aria-hidden='true'>{profileImage ? <img className='avatar-photo' src={profileImage} alt='' /> : story.badge}</span>
                <span className='plus-story' aria-hidden='true'>+</span>
                <span className='create-label'>Create story</span>
              </>
            ) : (
              <>
                <span className='story-badge' aria-hidden='true'>{story.badge}</span>
                <span className='story-name'>{story.name}</span>
              </>
            )}
          </button>
        );
      })}
    </section>
  );
}

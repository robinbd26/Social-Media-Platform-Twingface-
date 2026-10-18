# Create auth-form.tsx - part D (hero + panel top)
with open('src/app/(auth)/auth-form.tsx', 'a', encoding='utf-8') as f:
    f.write(r""";

  return (
    <div className={L === 'bn' ? 'auth bn' : 'auth'}>
      <div className='shell'>
        <section className='hero'>
          <Link className='logo' href='/'>
            <i></i>twing<b>face</b>
          </Link>
          <div className='hrow'>
            <span>
              <span className='dot'></span>&nbsp; <span className='eyebrow'>{t('rt')}</span>
            </span>
            <span>01 / BD</span>
          </div>
          <p className='lead' style={{ marginTop: 22 }}>
            <span>{t('s1')}</span> <span>{t('s2')}</span>
          </p>
          <h2>
            <span>{t('rh1')}</span>
            <br />
            <em>{t('rh2')}</em>
          </h2>
          <div className='mapwrap'>
            <div className='bdmap'>
              <BdMap gid='lg-auth' />
            </div>
            <Chip
              img='/rima.jpg'
              init={t('c1i')}
              bg='#f7d6cf'
              fg='#c4503c'
              name={t('c1n')}
              sub={t('c1s')}
              style={{ left: 0, top: '8%' }}
            />
            <Chip
              img='/sajid.jpg'
              init={t('c2i')}
              bg='#d6ece1'
              fg='#2d6a58'
              name={t('c2n')}
              sub={t('c2s')}
              style={{ right: 0, bottom: '12%', animationDelay: '1.5s' }}
            />
          </div>
          <div className='hfoot'>
            <b>{t('rb1')}</b>
            <hr />
            <span>{t('rb2')}</span>
          </div>
        </section>
        <main className='panel'>
          <div className='top'>
            <Link className='logo' href='/'>
              <i></i>twing<b>face</b>
            </Link>
            <div className='made'>
              <span className='dot'></span>
              <span>{t('loc')}</span>
            </div>
            <div className='lang'>
              <button type='button' className={L === 'en' ? 'on' : ''} onClick={() => setL('en')}>
                English
              </button>
              <button type='button' className={L === 'bn' ? 'on' : ''} onClick={() => setL('bn')}>
                বাংলা
              </button>
            </div>
            <ThemeButton />
          </div>
""")
print('PART D written')
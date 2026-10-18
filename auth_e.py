# Create auth-form.tsx - part E (card + login branch)
with open('src/app/(auth)/auth-form.tsx', 'a', encoding='utf-8') as f:
    f.write(r"""          <div className='card'>
            <div key={isLogin ? 'login' : 'register'} className='swap'>
              {isLogin ? (
                <>
                  <div className='pill'>
                    <b>👋</b>
                    <span>{t('leb')}</span>
                  </div>
                  <h1 style={{ marginTop: 18 }}>{t('lh')}</h1>
                  <p className='sub'>{t('lede')}</p>
                  <form onSubmit={submitLog}>
                    <label className='l' htmlFor='log-id'>
                      {t('idl')}
                    </label>
                    <div className='f'>
                      <i>✉️</i>
                      <input
                        id='log-id'
                        type='text'
                        required
                        autoComplete='username'
                        placeholder={t('idph')}
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                      />
                    </div>
                    <label className='l' htmlFor='log-pw'>
                      {t('pwl')}
                    </label>
                    <div className='f'>
                      <i>🔒</i>
                      <input
                        id='log-pw'
                        type={showPw ? 'text' : 'password'}
                        required
                        autoComplete='current-password'
                        placeholder={t('pwph')}
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                      />
                      <button
                        type='button'
                        onClick={() => setShowPw((v) => !v)}
                        aria-label={showPw ? 'Hide password' : 'Show password'}
                      >
                        {showPw ? '🙈' : '👁'}
                      </button>
                    </div>
                    <div className='row2'>
                      <label>
                        <input
                          type='checkbox'
                          checked={remember}
                          onChange={(e) => setRemember(e.target.checked)}
                        />
                        <span>{t('rem')}</span>
                      </label>
                      <a href='#'>{t('forgot')}</a>
                    </div>
                    <button className='btn' disabled={loading}>
                      <span>{loading ? 'Signing in…' : t('sign')}</span>
                      <span>→</span>
                    </button>
                    <div className={msg ? 'msg err' : 'msg'}>{msg}</div>
                  </form>
                  <p className='foot'>
                    <span>{t('newto')}</span>{' '}
                    <button type='button' className='link' onClick={() => switchMode(false)}>
                      {t('open')}
                    </button>
                  </p>
                </>
""")
print('PART E written')
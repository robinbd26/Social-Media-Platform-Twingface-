# Create auth-form.tsx - part F (register branch + closing)
with open('src/app/(auth)/auth-form.tsx', 'a', encoding='utf-8') as f:
    f.write(r"""              ) : (
                <>
                  <div className='pill'>
                    <b>✨</b>
                    <span>{t('rpill')}</span>
                  </div>
                  <h1 style={{ marginTop: 18 }}>{t('rtitle')}</h1>
                  <p className='sub'>{t('rsub')}</p>
                  <form onSubmit={submitReg} noValidate>
                    <label className='l' htmlFor='ra-name'>
                      {t('rname')}
                    </label>
                    <div className='f'>
                      <i>👤</i>
                      <input
                        id='ra-name'
                        type='text'
                        required
                        autoComplete='name'
                        placeholder={t('rnameph')}
                        value={rName}
                        onChange={(e) => setRName(e.target.value)}
                        aria-invalid={Boolean(rErrors.name)}
                      />
                    </div>
                    {rErrors.name ? (
                      <p className='hint err' role='alert'>
                        {rErrors.name}
                      </p>
                    ) : null}

                    <label className='l' htmlFor='ra-contact'>
                      {t('rcont')}
                    </label>
                    <div className='f'>
                      <i>✉️</i>
                      <input
                        id='ra-contact'
                        type='text'
                        required
                        autoComplete='username'
                        placeholder={t('rcontph')}
                        value={rContact}
                        onChange={(e) => setRContact(e.target.value)}
                        aria-invalid={Boolean(rErrors.contact)}
                      />
                    </div>
                    {rErrors.contact ? (
                      <p className='hint err' role='alert'>
                        {rErrors.contact}
                      </p>
                    ) : null}

                    <label className='l' htmlFor='ra-pw'>
                      {t('rpw')}
                    </label>
                    <AuthPw
                      id='ra-pw'
                      placeholder={t('rpwph')}
                      autoComplete='new-password'
                      value={rPw}
                      onChange={setRPw}
                    />
                    {rErrors.pw ? (
                      <p className='hint err' role='alert'>
                        {rErrors.pw}
                      </p>
                    ) : null}

                    <label className='l' htmlFor='ra-cpw'>
                      {t('rcpw')}
                    </label>
                    <AuthPw
                      id='ra-cpw'
                      placeholder={t('rcpwph')}
                      autoComplete='new-password'
                      value={rCpw}
                      onChange={setRCpw}
                    />
                    {rErrors.cpw ? (
                      <p className='hint err' role='alert'>
                        {rErrors.cpw}
                      </p>
                    ) : null}
                    {passwordMatch === false && !rErrors.cpw ? (
                      <p className='hint err'>{t('mismatch')}</p>
                    ) : null}
                    {passwordMatch === true ? (
                      <p className='hint' style={{ color: 'var(--acc)' }}>
                        {t('match')}
                      </p>
                    ) : null}

                    <label className='chk'>
                      <input
                        type='checkbox'
                        checked={terms}
                        onChange={(e) => setTerms(e.target.checked)}
                      />
                      <span>{t('rterms')}</span>
                    </label>
                    {rErrors.terms ? (
                      <p className='hint err' role='alert'>
                        {rErrors.terms}
                      </p>
                    ) : null}

                    <button className='btn' disabled={rLoading}>
                      <span>{rLoading ? t('rcreating') : t('rsign')}</span>
                      <span>→</span>
                    </button>
                    <div className={rMsg.startsWith('✓') ? 'msg' : 'msg err'}>{rMsg}</div>
                  </form>
                  <p className='foot'>
                    <span>{t('rfoot1')}</span>{' '}
                    <button type='button' className='link' onClick={() => switchMode(true)}>
                      {t('rfoot2')}
                    </button>
                  </p>
                </>
              )}
            </div>
          </div>
          <div className='pfoot'>
            <span>{t('f1')}</span>
            <b>twingface.com</b>
          </div>
        </main>
      </div>
    </div>
  );
}
""")
print('PART F written')
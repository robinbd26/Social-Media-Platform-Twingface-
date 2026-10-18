# Create auth-form.tsx - part C (state + handlers)
with open('src/app/(auth)/auth-form.tsx', 'a', encoding='utf-8') as f:
    f.write(r"""
export default function AuthForm({ initialMode = 'login' }: { initialMode?: 'login' | 'register' }) {
  const [isLogin, setIsLogin] = useState(initialMode === 'login');
  const [L, setL] = useState<Lang>('en');
  // login
  const [showPw, setShowPw] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [remember, setRemember] = useState(false);
  const [loading, setLoading] = useState(false);
  const [msg, setMsg] = useState('');
  // register
  const [rName, setRName] = useState('');
  const [rContact, setRContact] = useState('');
  const [rPw, setRPw] = useState('');
  const [rCpw, setRCpw] = useState('');
  const [terms, setTerms] = useState(false);
  const [rErrors, setRErrors] = useState<Record<string, string>>({});
  const [rLoading, setRLoading] = useState(false);
  const [rMsg, setRMsg] = useState('');

  const t = (k: string) => (L === 'bn' ? BN[k] ?? EN[k] : EN[k]);

  useEffect(() => {
    try {
      if (localStorage.getItem('tf-lang') === 'bn') setL('bn');
    } catch {
      /* ignore */
    }
  }, []);

  useEffect(() => {
    document.documentElement.lang = L;
    try {
      localStorage.setItem('tf-lang', L);
    } catch {
      /* ignore */
    }
  }, [L]);

  const passwordMatch = rPw && rCpw ? rPw === rCpw : null;

  function switchMode(login: boolean) {
    setIsLogin(login);
    setMsg('');
    setRMsg('');
    setRErrors({});
  }

  async function submitLog(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    setMsg('');
    try {
      const response = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });
      if (!response.ok) {
        throw new Error((await response.json().catch(() => ({ error: 'Invalid email or password.' }))).error);
      }
      window.location.assign('/dashboard');
    } catch (error) {
      setMsg(error instanceof Error ? error.message : 'Invalid email or password.');
    } finally {
      setLoading(false);
    }
  }

  function validateReg() {
    const e: Record<string, string> = {};
    if (rName.trim().length < 2) e.name = t('eName');
    if (!validateContact(rContact)) e.contact = t('eContact');
    if (rPw.length < 8) e.pw = t('ePw');
    else if (!/[a-z]/.test(rPw) || !/[A-Z]/.test(rPw)) e.pw = t('ePwCase');
    else if (!/\d/.test(rPw)) e.pw = t('ePwNum');
    if (rPw !== rCpw) e.cpw = t('mismatch');
    if (!terms) e.terms = t('eTerms');
    return e;
  }

  async function submitReg(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const v = validateReg();
    setRErrors(v);
    if (Object.keys(v).length > 0) {
      setRMsg(t('fix'));
      return;
    }
    setRMsg('');
    setRLoading(true);
    try {
      const base = rName
        .trim()
        .toLowerCase()
        .replace(/[^a-z0-9 ]/g, '')
        .trim()
        .replace(/\s+/g, '.')
        .slice(0, 24)
        .replace(/[.\-_]+$/, '');
      const suffix = Math.random().toString(36).slice(2, 6);
      const res = await fetch('/api/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: rName.trim(),
          username: `${base || 'user'}.${suffix}`,
          contact: rContact.trim(),
          password: rPw,
          confirmPassword: rCpw,
        }),
      });
      const data = (await res.json().catch(() => ({}))) as {
        error?: string;
        fields?: Record<string, string[]>;
      };
      if (!res.ok) {
        const mapped: Record<string, string> = {};
        for (const [field, messages] of Object.entries(data.fields ?? {})) {
          const message = Array.isArray(messages) ? messages[0] : undefined;
          if (!message) continue;
          if (field === 'name') mapped.name = message;
          else if (field === 'contact') mapped.contact = message;
          else if (field === 'password') mapped.pw = message;
          else if (field === 'confirmPassword') mapped.cpw = message;
        }
        setRErrors(mapped);
        setRMsg(data.error || t('rfail'));
        return;
      }
      setRMsg(t('rok'));
      window.setTimeout(() => window.location.assign('/dashboard'), 1200);
    } catch {
      setRMsg(t('rfail'));
    } finally {
      setRLoading(false);
    }
  }
""")
print('PART C written')
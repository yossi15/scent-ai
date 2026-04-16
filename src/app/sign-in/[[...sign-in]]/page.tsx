import { SignIn } from '@clerk/nextjs';

export default function SignInPage() {
  return (
    <div className="min-h-screen bg-bg-primary flex items-center justify-center px-4" dir="rtl">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <p className="text-gold text-[11px] tracking-[0.2em] uppercase font-sans font-medium mb-2">
            SCENT AI
          </p>
          <h1 className="font-serif text-3xl text-ink font-bold">ברוך הבא חזרה</h1>
          <p className="text-ink-muted text-sm font-hebrew mt-1">
            כנס לחשבון כדי לגשת לאוסף וליומן שלך
          </p>
        </div>
        <SignIn
          appearance={{
            elements: {
              rootBox: 'w-full',
              card: 'shadow-none border border-black/[0.06] rounded-2xl',
            },
          }}
          routing="path"
          path="/sign-in"
          signUpUrl="/sign-up"
        />
      </div>
    </div>
  );
}

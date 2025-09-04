import { SignUp } from "@clerk/nextjs";
import { dark } from "@clerk/themes";
import Link from "next/link";

export default function SignUpPage() {
  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      {/* Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-accent-primary/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-accent-secondary/10 rounded-full blur-3xl"></div>
      </div>

      <div className="w-full max-w-md relative z-10">
        {/* Header Section */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 mb-6 iconBackground">
            <svg 
              width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
              className="text-accent-primary"
            >
              <path d="M12 2L2 7l10 5 10-5-10-5z"/><path d="M2 17l10 5 10-5"/><path d="M2 12l10 5 10-5"/>
            </svg>
          </div>
          <h1 className="text-3xl font-bold text-foreground mb-2">
            Create your account
          </h1>
          <p className="text-muted-foreground text-sm">
            Get started with AI-powered webinars and sales agents today
          </p>
        </div>

        {/* Sign Up Card */}
        <div className="bg-card/50 backdrop-blur-sm border border-border rounded-2xl p-6 shadow-2xl">
          <SignUp
            path="/sign-up"
            appearance={{
              baseTheme: dark,
              variables: {
                colorPrimary: '#8F31F3',
                colorBackground: 'transparent',
                colorInputBackground: 'rgba(255, 255, 255, 0.05)',
                colorInputText: '#FFFFFF',
                colorText: '#FFFFFF',
                colorTextSecondary: 'rgba(255, 255, 255, 0.6)',
                borderRadius: '12px',
                fontFamily: 'var(--font-manrope), system-ui, sans-serif'
              },
              elements: {
                header: 'hidden', // <-- THE IMPROVEMENT: This hides Clerk's default header
                card: 'bg-transparent shadow-none',
                socialButtonsBlockButton: 'bg-white/10 hover:bg-white/20 text-white border-white/20 transition-all duration-200',
                formButtonPrimary: 'bg-purple-600 hover:bg-purple-700 text-white transition-all duration-200 font-medium',
                formFieldLabel: 'text-white font-medium',
                formFieldInput: 'bg-white/5 border-white/20 text-white placeholder:text-gray-400 focus:border-purple-500',
                footerActionLink: 'text-purple-400 hover:text-purple-300 transition-colors',
                dividerLine: 'bg-white/20',
                dividerText: 'text-gray-400'
              }
            }}
            afterSignUpUrl="/dashboard"
            signInUrl="/sign-in"
          />
        </div>

        {/* Back to Home */}
        <div className="text-center mt-6">
          <Link href="/" className="inline-flex items-center text-muted-foreground hover:text-foreground text-sm font-medium transition-colors duration-200 group">
            <svg className="w-4 h-4 mr-2 transition-transform duration-200 group-hover:-translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            Back to home
          </Link>
        </div>
      </div>
    </div>
  );
}
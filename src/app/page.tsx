import Link from "next/link";

export default function Home() {
  return (
    <div className="min-h-screen bg-background flex flex-col">
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/3 left-1/4 w-96 h-96 bg-accent-primary/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-1/3 right-1/4 w-80 h-80 bg-accent-secondary/10 rounded-full blur-3xl animate-pulse animation-delay-500"></div>
      </div>

      <header className="relative z-10 flex justify-between items-center p-6 lg:px-12 animate-fade-in-up">
        <div className="flex items-center space-x-3">
          <div className="iconBackground p-3">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-accent-primary">
              <path d="M12 2L2 7l10 5 10-5-10-5z"/><path d="M2 17l10 5 10-5"/><path d="M2 12l10 5 10-5"/>
            </svg>
          </div>
          <span className="text-xl font-bold text-foreground font-heading">WebinarAI</span>
        </div>
        <div className="flex items-center space-x-4">
          <Link href="/sign-in" className="text-muted-foreground hover:text-foreground font-medium transition-colors duration-200">
            Sign In
          </Link>
          <Link href="/sign-up" className="bg-accent-primary hover:bg-accent-primary/90 text-accent-foreground px-4 py-2 rounded-lg font-medium transition-all duration-200 hover:scale-[1.02] shadow-lg hover:shadow-xl">
            Get Started
          </Link>
        </div>
      </header>

      <main className="flex-1 flex items-center justify-center px-6 lg:px-12 relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          <div className="mb-16">
            <h1 className="text-5xl lg:text-7xl font-bold text-foreground mb-6 leading-tight animate-fade-in-up animation-delay-300 font-heading">
              Get maximum{" "}
              <span className="animate-gradient-text bg-gradient-to-r from-accent-primary to-accent-secondary bg-clip-text text-transparent">
                Conversion
              </span>
              {" "}from your webinars
            </h1>
            <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto leading-relaxed animate-fade-in-up animation-delay-500">
              Transform your webinars with AI agents that qualify leads, understand customer needs, and connect them with solutions automatically.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12 animate-fade-in-up animation-delay-700">
              <Link href="/sign-up" className="bg-accent-primary hover:bg-accent-primary/90 text-accent-foreground px-8 py-4 rounded-xl font-semibold text-lg transition-all duration-200 hover:scale-[1.02] shadow-xl hover:shadow-2xl flex items-center space-x-2">
                <span>Start Free Trial</span>
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" /></svg>
              </Link>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
            <div className="bg-card/50 backdrop-blur-sm border border-border rounded-2xl p-6 transition-all duration-300 hover:border-accent-primary/50 hover:-translate-y-1 animate-fade-in-up animation-delay-300">
              <div className="iconBackground w-12 h-12 flex items-center justify-center mb-4 mx-auto"><svg className="w-6 h-6 text-accent-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg></div>
              <h3 className="text-lg font-semibold text-foreground mb-2 font-heading">Create Webinars</h3>
              <p className="text-muted-foreground text-sm">Set up professional webinars with ease and track every single interaction.</p>
            </div>
            <div className="bg-card/50 backdrop-blur-sm border border-border rounded-2xl p-6 transition-all duration-300 hover:border-accent-primary/50 hover:-translate-y-1 animate-fade-in-up animation-delay-500">
              <div className="iconBackground w-12 h-12 flex items-center justify-center mb-4 mx-auto"><svg className="w-6 h-6 text-accent-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283-.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" /></svg></div>
              <h3 className="text-lg font-semibold text-foreground mb-2 font-heading">AI Agents</h3>
              <p className="text-muted-foreground text-sm">Deploy intelligent agents that qualify and nurture leads automatically.</p>
            </div>
            <div className="bg-card/50 backdrop-blur-sm border border-border rounded-2xl p-6 transition-all duration-300 hover:border-accent-primary/50 hover:-translate-y-1 animate-fade-in-up animation-delay-700">
              <div className="iconBackground w-12 h-12 flex items-center justify-center mb-4 mx-auto"><svg className="w-6 h-6 text-accent-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" /></svg></div>
              <h3 className="text-lg font-semibold text-foreground mb-2 font-heading">Track Conversions</h3>
              <p className="text-muted-foreground text-sm">Monitor performance and optimize your conversion rates in real-time.</p>
            </div>
          </div>
        </div>
      </main>

      <footer className="relative z-10 text-center py-8 px-6 border-t border-border/50 backdrop-blur-sm">
        <p className="text-muted-foreground text-sm">
          Ready to transform your webinars?{" "}
          <Link href="/sign-up" className="text-accent-primary hover:text-accent-primary/80 font-medium transition-colors duration-200">
            Get started today
          </Link>
        </p>
      </footer>
    </div>
  );
}
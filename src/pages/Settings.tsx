import React from 'react';

export default function Settings() {
  return (
    <div className="min-h-screen bg-background dark:bg-slate-900 bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-slate-800 dark:to-slate-900">
      <main className="container mx-auto px-4 sm:px-6 lg:px-8 pt-20">
        <div className="flex flex-col items-center justify-center py-12">
          <h1 className="text-4xl font-bold tracking-tight text-foreground sm:text-5xl md:text-6xl">
            Settings
          </h1>
          <p className="mt-6 text-lg leading-8 text-muted-foreground">
            This is where your settings will go.
          </p>
        </div>
      </main>
    </div>
  );
} 
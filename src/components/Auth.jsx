import { SignIn } from '@clerk/clerk-react';

export default function Auth() {

  return (
       <div className="flex items-center justify-center min-h-screen bg-gray-900 px-4">
      <div className="w-full max-w-sm md:max-w-md lg:max-w-lg">
        <SignIn
          appearance={{
            elements: {
              card: 'shadow-xl rounded-xl border border-gray-200',
            },
          }}
        />
      </div>
    </div>
  );
}

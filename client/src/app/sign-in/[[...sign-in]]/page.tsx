import { SignIn } from '@clerk/nextjs'

export default function Page() {
  return <div className='flex justify-center items-center bg-[#bebfc0] h-screen'>
    <SignIn 
      appearance={{
        elements: {
          headerTitle: {
            display: 'none', // Hides the Clerk name in the header
          },
          logo: {
            display: 'none', // Removes the logo
          },
          footer: {
            display: 'none', // Removes the Clerk footer
          },
          dividerLine: {
            display: 'none', // Removes the divider line
          },
          formButtonPrimary: {
            backgroundColor: '#4B5563', // Customizes the primary button color
            color: 'white',
          },
          card: {
            boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)', // Adds a subtle shadow to the card
            border: '1px solid #E5E7EB', // Adds a border to the card
          },
          socialButtonsIconButton: {
            Inlinesize: '48px', // Increase the size of the Google sign-in button
        Blocksize: '48px',
          },
          socialButtonsBlockButton: {
            fontSize: '16px', // Increase text size for better visibility
          },
          footerActionLink: {
            fontSize: '14px',
            color: '#4B5563',
            '&:hover': {
              color: '#1F2937',
            },
          },
        },
        layout: {
          socialButtonsPlacement: 'bottom', // Moves social buttons to the bottom
          termsPageUrl: undefined, // Removes terms of service link
          privacyPageUrl: undefined, // Removes privacy policy link
        },
      }}
    />
  </div>
}